import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: Record<string, unknown>[];
  x_key: string;
  y_key: string;
}

export function LineChart({ data, x_key, y_key }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ReLineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
        <XAxis dataKey={x_key} tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={y_key}
          stroke="#6366f1"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
