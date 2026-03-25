import { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useAgent } from '@/hooks/useAgent';
import type { Message } from '@/types/api';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

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
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
          aria-label="Open agent"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[420px] flex-col p-0 sm:w-[480px]"
      >
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>Agent</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {messages.length === 0 && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Ask a question about the data…
            </p>
          )}
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          {isPending && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-muted-foreground animate-pulse">
                Thinking…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <ChatInput onSubmit={handleSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
}
