export type ChartType = 'bar' | 'line' | 'pie' | 'table' | 'map';
export type Orientation = 'horizontal' | 'vertical';

// Returned by all GET /charts/* endpoints
export interface ChartResponse {
  data: Record<string, unknown>[];
  chart_type: ChartType;
  x_key: string;
  y_key: string;
  title: string;
  orientation?: Orientation;
}

// Returned by POST /query
export interface QueryResponse {
  summary: string;
  sql?: string;
  data?: Record<string, unknown>[];
  chart_type?: ChartType;
  x_key?: string;
  y_key?: string;
  title?: string;
  orientation?: Orientation;
}

// Returned by GET /kpis
export interface KpiResponse {
  total_orders: number;
  total_revenue: number;
  avg_review_score: number;
  top_category: string;
}

// Local chat message shape
export interface Message {
  role: 'user' | 'agent';
  content: string;
  sql?: string;
  data?: Record<string, unknown>[];
  chart_type?: ChartType;
  x_key?: string;
  y_key?: string;
  title?: string;
  orientation?: Orientation;
}
