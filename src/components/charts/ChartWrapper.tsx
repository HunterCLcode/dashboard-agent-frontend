import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ReactNode } from 'react';

interface ChartWrapperProps {
  title: string;
  loading: boolean;
  error?: Error | null;
  children?: ReactNode;
}

export function ChartWrapper({ title, loading, error, children }: ChartWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-60 w-full" />
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>Failed to load chart data</AlertDescription>
          </Alert>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
