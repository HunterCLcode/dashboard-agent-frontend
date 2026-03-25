import type { ChartType, Orientation } from '@/types/api';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { MapChart } from './MapChart';
import { DataTable } from '@/components/table/DataTable';

interface ChartRouterProps {
  data: Record<string, unknown>[];
  chart_type: ChartType;
  x_key: string;
  y_key: string;
  orientation?: Orientation;
}

export function ChartRouter({ data, chart_type, x_key, y_key, orientation }: ChartRouterProps) {
  switch (chart_type) {
    case 'bar':
      return <BarChart data={data} x_key={x_key} y_key={y_key} orientation={orientation} />;
    case 'line':
      return <LineChart data={data} x_key={x_key} y_key={y_key} />;
    case 'pie':
      return <PieChart data={data} x_key={x_key} y_key={y_key} />;
    case 'map':
      return <MapChart data={data} x_key={x_key} y_key={y_key} />;
    case 'table':
      return <DataTable data={data} />;
    default:
      return null;
  }
}
