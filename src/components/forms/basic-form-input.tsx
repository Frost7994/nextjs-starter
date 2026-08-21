"use client";

import type { ReactNode } from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

import { useFieldContext } from "@/hooks/use-form";

type Props = Omit<React.ComponentProps<typeof Input>, "name" | "value"> & {
  label: string;
  description?: string;
  showError?: boolean;

  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

function BasicFormInput({
  label,
  description,
  showError = true,
  startIcon,
  endIcon,
  ...props
}: Props) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      </FieldContent>
      <InputGroup>
        {startIcon && <InputGroupAddon align="inline-start">{startIcon}</InputGroupAddon>}
        <InputGroupInput
          {...props}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          aria-invalid={isInvalid}
        />
        {endIcon && <InputGroupAddon align="inline-end">{endIcon}</InputGroupAddon>}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && showError && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export { BasicFormInput };
