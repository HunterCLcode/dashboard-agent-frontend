import { useQuery } from '@tanstack/react-query';
import { fetchKpis } from '@/api/client';

export function useKpis() {
  return useQuery({
    queryKey: ['kpis'],
    queryFn: fetchKpis,
    staleTime: 5 * 60 * 1000,
  });
}
