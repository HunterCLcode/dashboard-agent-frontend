import axios from 'axios';
import type { KpiResponse, ChartResponse, QueryResponse } from '@/types/api';

const api = axios.create({ baseURL: '/' });

export const fetchKpis = async (): Promise<KpiResponse> => {
  const { data } = await api.get<KpiResponse>('/kpis');
  return data;
};

export const fetchChart = async (endpoint: string): Promise<ChartResponse> => {
  const { data } = await api.get<ChartResponse>(`/charts/${endpoint}`);
  return data;
};

export const submitQuery = async (query: string): Promise<QueryResponse> => {
  const { data } = await api.post<QueryResponse>('/query', { query });
  return data;
};
