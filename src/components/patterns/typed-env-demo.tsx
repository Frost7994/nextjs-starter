import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function TypedEnvDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-start gap-3">
        <Badge variant="outline">server</Badge>
        <div className="flex flex-col gap-0.5">
          <code className="font-mono text-sm">DATABASE_URL</code>
          <span className="text-xs text-muted-foreground">
            z.string().url() — never reaches the client bundle.
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex items-start gap-3">
        <Badge variant="outline">client</Badge>
        <div className="flex flex-col gap-0.5">
          <code className="font-mono text-sm">NEXT_PUBLIC_APP_URL</code>
          <span className="text-xs text-muted-foreground">
            z.string().url() — inlined at build time, safe in the browser.
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
        <span className="text-xs font-medium text-destructive">
          Missing or invalid values fail fast
        </span>
        <code className="font-mono text-xs text-destructive/80">
          {"❌ Invalid environment variables: { DATABASE_URL: ['Required'] }"}
        </code>
      </div>
    </div>
  );
}

export { TypedEnvDemo };
