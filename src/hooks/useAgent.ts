import { useMutation } from '@tanstack/react-query';
import { submitQuery } from '@/api/client';

export function useAgent() {
  return useMutation({
    mutationFn: submitQuery,
  });
}
