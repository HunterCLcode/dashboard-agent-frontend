import { useQuery } from '@tanstack/react-query';
import { fetchChart } from '@/api/client';

export const CHART_ENDPOINTS = [
  'revenue-over-time',
  'orders-by-state',
  'top-categories',
  'review-distribution',
  'delivery-delay-by-state',
  'payment-methods',
] as const;

export type ChartEndpoint = (typeof CHART_ENDPOINTS)[number];

export function useChart(endpoint: ChartEndpoint) {
  return useQuery({
    queryKey: ['chart', endpoint],
    queryFn: () => fetchChart(endpoint),
    staleTime: 5 * 60 * 1000,
  });
}
