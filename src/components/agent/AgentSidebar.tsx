import { useState, useRef, useEffect } from 'react';
import { useAgent } from '@/hooks/useAgent';
import type { Message } from '@/types/api';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

const SUGGESTED_PROMPTS = [
  'Which state has the most orders?',
  'Show me monthly revenue trends',
  'What are the top 5 categories by revenue?',
  'Which states have the worst delivery delays?',
];

export function AgentSidebar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { mutate, isPending } = useAgent();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  function handleSubmit(query: string) {
    setMessages(prev => [...prev, { role: 'user', content: query }]);

    mutate(query, {
      onSuccess(res) {
        setMessages(prev => [
          ...prev,
          {
            role: 'agent',
            content: res.summary,
            sql: res.sql,
            data: res.data,
            chart_type: res.chart_type,
            x_key: res.x_key,
            y_key: res.y_key,
            title: res.title,
            orientation: res.orientation,
          },
        ]);
      },
      onError() {
        setMessages(prev => [
          ...prev,
          { role: 'agent', content: 'Something went wrong. Please try again.' },
        ]);
      },
    });
  }

  return (
    <aside className="flex h-full w-[400px] shrink-0 flex-col border-l bg-background">
      <div className="border-b px-4 py-3">
        <h2 className="font-heading text-base font-medium">Agent</h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Ask anything about the data
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSubmit(prompt)}
                  disabled={isPending}
                  className="rounded-xl border bg-muted/50 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isPending && (
          <div className="flex justify-start">
            <div className="animate-pulse rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSubmit={handleSubmit} disabled={isPending} />
    </aside>
  );
}
