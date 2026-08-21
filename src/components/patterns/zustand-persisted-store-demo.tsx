"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useExampleStore } from "@/stores/use-example-store";

function ZustandPersistedStoreDemo() {
  const count = useExampleStore((state) => state.count);
  const increment = useExampleStore((state) => state.increment);
  const decrement = useExampleStore((state) => state.decrement);
  const reset = useExampleStore((state) => state.reset);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-4xl font-semibold tabular-nums">{count}</span>
        <span className="text-xs text-muted-foreground">
          Reload the page — the count is restored from localStorage.
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon-sm" onClick={decrement}>
          <Minus />
          <span className="sr-only">Decrement</span>
        </Button>
        <Button variant="outline" size="icon-sm" onClick={increment}>
          <Plus />
          <span className="sr-only">Increment</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw data-icon="inline-start" />
          Reset
        </Button>
      </div>
    </div>
  );
}

export { ZustandPersistedStoreDemo };
