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
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Agent</h1>
        <p className="text-sm text-muted-foreground">Olist Brazilian E-Commerce</p>
      </div>
      <Button variant="outline" size="sm" onClick={() => setDark(d => !d)}>
        {dark ? '☀ Light' : '☾ Dark'}
      </Button>
    </header>
  );
}
