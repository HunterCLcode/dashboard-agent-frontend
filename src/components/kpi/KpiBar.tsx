import { useKpis } from '@/hooks/useKpis';
import { KpiCard } from './KpiCard';

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function KpiBar() {
  const { data, isLoading } = useKpis();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard
        label="Total Orders"
        value={data ? data.total_orders.toLocaleString() : '—'}
        loading={isLoading}
      />
      <KpiCard
        label="Total Revenue"
        value={data ? formatCurrency(data.total_revenue) : '—'}
        loading={isLoading}
      />
      <KpiCard
        label="Avg Review Score"
        value={data ? data.avg_review_score.toFixed(1) + ' ★' : '—'}
        loading={isLoading}
      />
      <KpiCard
        label="Top Category"
        value={data ? data.top_category : '—'}
        loading={isLoading}
      />
    </div>
  );
}
