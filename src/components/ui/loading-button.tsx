"use client";

import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";

function LoadingButton({
  isLoading,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  isLoading: boolean;
}) {
  return (
    <Button {...props} aria-busy={isLoading} disabled={disabled || isLoading}>
      <LoadingSwap isLoading={isLoading}>{children}</LoadingSwap>
    </Button>
  );
}

export { LoadingButton };
