"use client";

import { z } from "zod";

import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";

import { useAppForm } from "@/hooks/use-form";

const profileFormSchema = z.object({
  name: z.string().min(2, "Enter at least 2 characters"),
  email: z.string(),
});

function UseFormDemo() {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "jamie@company.com",
    },
    validators: {
      onChange: profileFormSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.add({
        title: "Profile saved",
        description: `Name set to "${value.name}".`,
        type: "success",
      });
    },
  });

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField name="name">
          {(field) => <field.Input label="Name" placeholder="Jamie Rivera" autoComplete="name" />}
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
  );
}

export { UseFormDemo };
