import type { CustomFieldErrors, CustomFormFields } from '../logic/forms';
import React, { type PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface Indexable {
  [key: string]: any;
}

interface ContextProps {
  formError?: string;
  fields?: CustomFormFields<Indexable>;
  fieldErrors?: CustomFieldErrors<Indexable>;
  isSubmitting?: boolean;
}

export const ActionContext = createContext<ContextProps>({
  formError: undefined,
  fields: {},
  fieldErrors: {},
  isSubmitting: false,
});

export type ActionContextProviderProps = PropsWithChildren<ContextProps>;

export function ActionContextProvider(props: ActionContextProviderProps) {
  const { children, ...restOfProps } = props;
  return (
    <ActionContext.Provider value={restOfProps}>
      {children}
    </ActionContext.Provider>
  );
}

function useActionContext() {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error(
      'useActionContext must be used within a ActionContextProvider'
    );
  }
  return context;
}

export function useField(name: string) {
  const { fields, fieldErrors } = useActionContext();
  return {
    value: fields?.[name],
    error: fieldErrors?.[name],
  };
}

export function useFormError() {
  const { formError } = useActionContext();
  return formError;
}
export function useFieldErrors() {
  const { fieldErrors } = useActionContext();
  return fieldErrors;
}

export function useIsSubmitting() {
  const { isSubmitting } = useActionContext();
  return isSubmitting;
}
