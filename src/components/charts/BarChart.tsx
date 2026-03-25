import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Orientation } from '@/types/api';

interface BarChartProps {
  data: Record<string, unknown>[];
  x_key: string;
  y_key: string;
  orientation?: Orientation;
}

export function BarChart({ data, x_key, y_key, orientation = 'vertical' }: BarChartProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ReBarChart
        data={data}
        layout={isHorizontal ? 'vertical' : 'horizontal'}
        margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
        {isHorizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey={x_key}
              tick={{ fontSize: 11 }}
              width={90}
            />
          </>
        ) : (
          <>
            <XAxis dataKey={x_key} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
          </>
        )}
        <Tooltip />
        <Bar
          dataKey={y_key}
          fill="#6366f1"
          radius={isHorizontal ? [0, 2, 2, 0] : [2, 2, 0, 0]}
        />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
