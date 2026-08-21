"use client";

import { Button } from "@/components/ui/button";

import { toast } from "@/utils/toast";

function ConsistentToastDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: "Profile saved", type: "success" })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: "Something went wrong", type: "error" })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: "Heads up", type: "info" })}
      >
        Info
      </Button>
    </div>
  );
}

export { ConsistentToastDemo };
