import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface SqlPreviewProps {
  sql: string;
}

export function SqlPreview({ sql }: SqlPreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground px-2">
          View SQL
          <ChevronDown
            className="h-3 w-3 transition-transform duration-150"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <pre className="mt-1 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground overflow-x-auto leading-relaxed">
          {sql}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
}
