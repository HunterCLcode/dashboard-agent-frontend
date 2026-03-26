import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { KpiBar } from '@/components/kpi/KpiBar';
import { ChartWrapper } from '@/components/charts/ChartWrapper';
import { ChartRouter } from '@/components/charts/ChartRouter';
import { AgentSidebar } from '@/components/agent/AgentSidebar';
import { useChart, CHART_ENDPOINTS } from '@/hooks/useCharts';
import type { ChartEndpoint } from '@/hooks/useCharts';

const CHART_TITLES: Record<ChartEndpoint, string> = {
  'revenue-over-time': 'Revenue Over Time',
  'orders-by-state': 'Orders by State',
  'top-categories': 'Top Product Categories',
  'review-distribution': 'Review Score Distribution',
  'delivery-delay-by-state': 'Delivery Delay by State',
  'payment-methods': 'Payment Methods',
};

function ChartPanel({ endpoint }: { endpoint: ChartEndpoint }) {
  const { data, isLoading, error } = useChart(endpoint);

  return (
    <ChartWrapper
      title={data?.title ?? CHART_TITLES[endpoint]}
      loading={isLoading}
      error={error}
    >
      {data && (
        <ChartRouter
          data={data.data}
          chart_type={data.chart_type}
          x_key={data.x_key}
          y_key={data.y_key}
          orientation={data.orientation}
        />
      )}
    </ChartWrapper>
  );
}

export function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 min-w-0">
        <Header />
        <KpiBar />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CHART_ENDPOINTS.map(ep => (
            <ChartPanel key={ep} endpoint={ep} />
          ))}
        </div>
      </div>

      <AgentSidebar />
    </div>
  );
}
