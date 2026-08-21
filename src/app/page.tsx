import { Metadata } from "next";

import { ConsistentToastDemo } from "@/components/patterns/consistent-toast-demo";
import { MorphIconDemo } from "@/components/patterns/morph-icon-demo";
import { PatternSection } from "@/components/patterns/pattern-section";
import { TypedEnvDemo } from "@/components/patterns/typed-env-demo";
import { UseFormDemo } from "@/components/patterns/use-form-demo";
import { ZustandPersistedStoreDemo } from "@/components/patterns/zustand-persisted-store-demo";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Starter Template | Pattern library",
  description:
    "A living reference for the conventions I reuse across projects. Each section pairs a working example with the exact steps to set it up again.",
};

const patterns = [
  {
    id: "persisted-store",
    label: "Store",
    content: (
      <PatternSection
        title="Persisted store (Zustand + Immer)"
        description="A global store with Immer-powered updates that automatically persists to localStorage and survives page reloads."
        tags={["Zustand", "Immer", "localStorage"]}
        example={<ZustandPersistedStoreDemo />}
        steps={[
          {
            title: "Install the dependencies",
            language: "bash",
            code: "pnpm add zustand immer",
          },
          {
            title: "Create the store",
            description:
              "Wrap updates in Immer's produce() so they can be written as direct mutations, then wrap that in persist() to sync state to localStorage.",
            language: "src/stores/use-example-store.ts",
            code: `import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const initialState: State = {
  count: 0,
};

const useExampleStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        increment: () =>
          set(
            produce((state) => {
              state.count += 1;
            })
          ),
        decrement: () =>
          set(
            produce((state) => {
              state.count -= 1;
            })
          ),
        reset: () => set(initialState),
      }),
      {
        name: "example-store",
      }
    )
  )
);

export { useExampleStore };`,
          },
          {
            title: "Use it in a component",
            description:
              "Select only the state and actions a component needs so it re-renders as little as possible.",
            language: "component.tsx",
            code: `"use client";

import { useExampleStore } from "@/stores/use-example-store";

function Counter() {
  const count = useExampleStore((state) => state.count);
  const increment = useExampleStore((state) => state.increment);

  return <button onClick={increment}>Count: {count}</button>;
}`,
          },
        ]}
      />
    ),
  },
  {
    id: "use-app-form",
    label: "Form",
    content: (
      <PatternSection
        title="Form (useAppForm)"
        description="A TanStack Form hook wired once with shared field and submit components, so every form gets validation, error states, and disabled fields for free."
        tags={["TanStack Form", "Zod", "Base UI"]}
        example={<UseFormDemo />}
        steps={[
          {
            title: "Install the dependencies",
            description:
              "TanStack Form and Zod for the form itself, plus the shadcn primitives the shared field/submit components are built on — Field pulls in Label and Separator, InputGroup pulls in Button, Input and Textarea.",
            language: "bash",
            code: `pnpm add @tanstack/react-form-nextjs zod
npx shadcn@latest add field input-group spinner toast`,
          },
          {
            title: "Create the form hook",
            description:
              "Wire TanStack Form up once with the shared field and form components (Input, SubmitButton) so every form in the app reuses the same building blocks.",
            language: "src/hooks/use-form.tsx",
            code: `"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";

import { BasicFormInput } from "@/components/forms/basic-form-input";
import { FormSubmitButton } from "@/components/forms/form-submit-button";

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    Input: BasicFormInput,
  },
  formComponents: {
    SubmitButton: FormSubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext, withFieldGroup, withForm };`,
          },
          {
            title: "Create the field component",
            description:
              "Reads state off useFieldContext and renders it through the shared Field/InputGroup primitives. Anything passed to field.Input — like disabled — flows straight through to the underlying input.",
            language: "src/components/forms/basic-form-input.tsx",
            code: `"use client";

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

export { BasicFormInput };`,
          },
          {
            title: "Create the submit button",
            description:
              "Subscribes to form state so it disables itself while the form is pristine, invalid, or already submitting — and swaps in a spinner via LoadingButton while it's in flight.",
            language: "src/components/forms/form-submit-button.tsx",
            code: `"use client";

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

export { FormSubmitButton };`,
          },
          {
            title: "Build the form",
            description:
              "Add fields with form.AppField and pass disabled straight through to the input — the shared Input component handles the styling and Field wraps validation state automatically.",
            language: "component.tsx",
            code: `const form = useAppForm({
  defaultValues: {
    name: "",
    email: "jamie@company.com",
  },
  validators: {
    onChange: profileFormSchema,
  },
  onSubmit: async ({ value }) => {
    await saveProfile(value);
  },
});

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      event.stopPropagation();
      void form.handleSubmit();
    }}
  >
    <FieldGroup>
      <form.AppField name="name">
        {(field) => <field.Input label="Name" placeholder="Jamie Rivera" />}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.Input
            label="Email"
            description="Managed by your organization — contact an admin to change it."
            disabled
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Save profile</form.SubmitButton>
      </form.AppForm>
    </FieldGroup>
  </form>
);`,
          },
        ]}
      />
    ),
  },
  {
    id: "typed-env",
    label: "Env",
    content: (
      <PatternSection
        title="Typed environment variables (T3 Env)"
        description="Environment variables validated with Zod at startup and split into server-only vs client-safe buckets, so a missing or malformed var fails fast instead of causing a silent bug in production."
        tags={["@t3-oss/env-nextjs", "Zod", "Type-safe"]}
        example={<TypedEnvDemo />}
        steps={[
          {
            title: "Install the dependencies",
            language: "bash",
            code: "pnpm add @t3-oss/env-nextjs zod dotenv",
          },
          {
            title: "Define the schema",
            description:
              "Server and client vars are declared separately — anything not prefixed NEXT_PUBLIC_ and listed under client is inaccessible from the browser bundle.",
            language: "src/env/index.ts",
            code: `import { createEnv } from "@t3-oss/env-nextjs";
import "dotenv/config";

const env = createEnv({
  client: {},
  server: {},
  emptyStringAsUndefined: true,
  runtimeEnv: {},
});

export { env };`,
          },
          {
            title: "Add a variable",
            description:
              "List each var under server or client with a Zod schema, then map it through runtimeEnv — Next.js inlines NEXT_PUBLIC_ vars at build time, so they have to be referenced explicitly rather than spread from process.env.",
            language: "src/env/index.ts",
            code: `import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import "dotenv/config";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});

export { env };`,
          },
          {
            title: "Use it anywhere",
            description:
              "Every access is autocompleted and type-checked — a typo or the wrong bucket is a compile error, not a runtime undefined.",
            language: "component.tsx",
            code: `import { env } from "@/env";

// Server component, route handler, or server action — full access.
const client = new Database(env.DATABASE_URL);

// Client component — only NEXT_PUBLIC_ vars are visible here.
function Link() {
  return <a href={env.NEXT_PUBLIC_APP_URL}>Open app</a>;
}`,
          },
        ]}
      />
    ),
  },
  {
    id: "morph-icons",
    label: "Icons",
    content: (
      <PatternSection
        title="Morphing icons (morphicons)"
        description="Icons animate between two lucide shapes on a single SVG instead of hard-swapping one component for another, using morphicons' spring-based morph engine."
        tags={["morphicons", "lucide"]}
        example={<MorphIconDemo />}
        steps={[
          {
            title: "Install the dependencies",
            description:
              "lucide-react renders the app's regular icons; the plain lucide package ships the same shapes as raw path data, which is what morphicons animates between.",
            language: "bash",
            code: "pnpm add lucide lucide-react morphicons",
          },
          {
            title: "Swap the icon prop to trigger a morph",
            description:
              "Changing MorphIcon's icon prop animates the transition automatically — no separate enter/exit icons or CSS crossfade to wire up. This is the exact pattern the copy button on every code block in this page uses.",
            language: "component.tsx",
            code: `"use client";

import { Check, Copy } from "lucide";
import { MorphIcon } from "morphicons/react";

import { Button } from "@/components/ui/button";

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon-xs" onClick={onClick}>
      <MorphIcon icon={copied ? Check : Copy} />
      <span className="sr-only">Copy code</span>
    </Button>
  );
}`,
          },
          {
            title: "Handle motion and accessibility",
            description:
              "Set reducedMotion to user to collapse the animation into an instant swap when the OS prefers reduced motion, and pass label for an accessible name instead of a separate sr-only span.",
            language: "component.tsx",
            code: `<MorphIcon
  icon={open ? XIcon : MenuIcon}
  reducedMotion="user"
  label={open ? "Close menu" : "Open menu"}
/>`,
          },
        ]}
      />
    ),
  },
  {
    id: "consistent-toasting",
    label: "Toasts",
    content: (
      <PatternSection
        title="Consistent toasting"
        description="A thin wrapper around the toast primitive that stamps every toast with the same timestamped description, so callers only ever specify what actually varies."
        tags={["Base UI", "date-fns"]}
        example={<ConsistentToastDemo />}
        steps={[
          {
            title: "Wrap the toast primitive",
            description:
              "Every call gets the same timestamped description — description is omitted from the wrapper's props entirely, so a caller can't override it and toasts stay visually consistent across the app.",
            language: "src/utils/toast.ts",
            code: `import type { ToastManagerAddOptions } from "@base-ui/react/toast";

import { toast as defaultToast } from "@/components/ui/toast";
import { format } from "date-fns";

type Props = Omit<ToastManagerAddOptions<object>, "description">;

function toast(props: Props) {
  return defaultToast.add({
    ...props,
    description: format(new Date(), "PPP 'at' p"),
  });
}

export { toast };`,
          },
          {
            title: "Fire it from anywhere",
            description:
              "Every field the base toast primitive accepts — type, timeout, priority, actionProps, onClose, and more — still comes through untouched. Only description is fixed.",
            language: "component.tsx",
            code: `"use client";

import { toast } from "@/utils/toast";

function SaveButton() {
  return <button onClick={() => toast({ title: "Profile saved", type: "success" })}>Save</button>;
}`,
          },
        ]}
      />
    ),
  },
];

export default function Page() {
  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <Badge variant="outline" className="w-fit">
          Pattern library
        </Badge>
        <h1 className="font-heading text-2xl font-semibold text-balance">Project patterns</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          A living reference for the conventions I reuse across projects. Each section pairs a
          working example with the exact steps to set it up again.
        </p>
      </header>

      <Tabs defaultValue={patterns[0].id}>
        <TabsList>
          {patterns.map((pattern) => (
            <TabsTrigger key={pattern.id} value={pattern.id}>
              {pattern.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {patterns.map((pattern) => (
          <TabsContent key={pattern.id} value={pattern.id} className="pt-6">
            {pattern.content}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground">
        Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">d</kbd> to toggle
        dark mode
      </div>
    </div>
  );
}
