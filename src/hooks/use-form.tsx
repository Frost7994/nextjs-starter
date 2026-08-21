"use client";

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

export { useAppForm, useFieldContext, useFormContext, withFieldGroup, withForm };
