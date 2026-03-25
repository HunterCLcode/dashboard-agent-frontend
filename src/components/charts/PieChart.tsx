import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface PieChartProps {
  data: Record<string, unknown>[];
  x_key: string;
  y_key: string;
}

export function PieChart({ data, x_key, y_key }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RePieChart>
        <Pie
          data={data}
          dataKey={y_key}
          nameKey={x_key}
          cx="50%"
          cy="45%"
          outerRadius={80}
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </RePieChart>
    </ResponsiveContainer>
  );
}
