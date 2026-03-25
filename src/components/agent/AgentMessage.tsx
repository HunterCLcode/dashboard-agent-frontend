import type { Message } from '@/types/api';
import { ChartRouter } from '@/components/charts/ChartRouter';
import { SqlPreview } from './SqlPreview';

interface AgentMessageProps {
  message: Message;
}

export function AgentMessage({ message }: AgentMessageProps) {
  const hasChart =
    message.data &&
    message.data.length > 0 &&
    message.chart_type &&
    message.x_key &&
    message.y_key;

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] space-y-2">
        <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm">
          {message.content}
        </div>

        {hasChart && (
          <div className="rounded-xl border bg-card p-3">
            {message.title && (
              <p className="mb-2 text-xs font-medium text-muted-foreground">{message.title}</p>
            )}
            <ChartRouter
              data={message.data!}
              chart_type={message.chart_type!}
              x_key={message.x_key!}
              y_key={message.y_key!}
              orientation={message.orientation}
            />
          </div>
        )}

        {message.sql && <SqlPreview sql={message.sql} />}
      </div>
    </div>
  );
}
