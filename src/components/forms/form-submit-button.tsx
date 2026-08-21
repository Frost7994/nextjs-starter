"use client";

import { LoadingButton } from "@/components/ui/loading-button";

import { useFormContext } from "@/hooks/use-form";

function FormSubmitButton({
  disabled,
  ...props
}: Omit<React.ComponentProps<typeof LoadingButton>, "isLoading">) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine, state.isSubmitting]}>
      {([canSubmit, isPristine, isSubmitting]) => (
        <LoadingButton
          {...props}
          type="submit"
          isLoading={isSubmitting}
          disabled={disabled || !canSubmit || isPristine}
        />
      )}
    </form.Subscribe>
  );
}

export { FormSubmitButton };
