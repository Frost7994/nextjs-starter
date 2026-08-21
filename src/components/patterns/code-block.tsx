"use client";

import * as React from "react";

import { Check, Copy } from "lucide";
import { MorphIcon } from "morphicons/react";

import { Button } from "@/components/ui/button";

import { toast } from "@/utils/toast";

type CodeBlockProps = {
  code: string;
  language: string;
};

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);

    toast({ title: "Copied to clipboard!" });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/40">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">{language}</span>
        <Button variant="ghost" size="icon-xs" onClick={() => handleCopy()}>
          <MorphIcon icon={copied ? Check : Copy} />
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export { CodeBlock };
