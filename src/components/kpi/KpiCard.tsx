import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface KpiCardProps {
  label: string;
  value: string;
  loading?: boolean;
}

export function KpiCard({ label, value, loading }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {loading ? (
          <>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-20" />
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
