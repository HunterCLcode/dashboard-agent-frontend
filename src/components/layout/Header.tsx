import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <header className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="mb-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            AI-Powered Analytics
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Dashboard Agent</h1>
          <p className="mt-1.5 max-w-lg text-muted-foreground">
            Ask questions about 100k+ Brazilian e-commerce orders in plain English —
            the agent queries the database and visualizes results for you.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setDark(d => !d)} className="shrink-0 mt-1">
          {dark ? '☀ Light' : '☾ Dark'}
        </Button>
      </div>
    </header>
  );
}
