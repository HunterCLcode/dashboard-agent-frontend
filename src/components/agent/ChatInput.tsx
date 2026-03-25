import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (query: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSubmit, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t px-4 py-3">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Ask about the data…"
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={disabled || !value.trim()}>
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </form>
  );
}
