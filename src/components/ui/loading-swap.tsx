import type { ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/utils/cn";

function LoadingSwap({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className="grid grid-cols-1 items-center justify-items-center">
      <span
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 flex w-full items-center justify-center gap-2",
          isLoading ? "invisible" : "visible",
          className
        )}
      >
        {children}
      </span>
      <span
        aria-hidden={!isLoading}
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "visible" : "invisible",
          className
        )}
      >
        <Spinner />
      </span>
    </span>
  );
}

export { LoadingSwap };
