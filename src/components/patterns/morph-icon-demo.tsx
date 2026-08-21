"use client";

import * as React from "react";

import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";

import { Button } from "@/components/ui/button";

function MorphIconDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" size="icon" onClick={() => setOpen((value) => !value)}>
        <MorphIcon icon={open ? X : Menu} />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <span className="text-xs text-muted-foreground">
        Click to morph between Menu and X — one SVG, no hard swap.
      </span>
    </div>
  );
}

export { MorphIconDemo };
