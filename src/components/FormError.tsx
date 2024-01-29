import React, { useMemo } from 'react';
import { hasFormError } from '../logic/forms';
import { InlineMessage } from './InlineMessage';
import { useFieldErrors, useFormError } from './ActionContextProvider';

export interface FormErrorProps {
  data?: unknown;
}

export function FormError(props: FormErrorProps) {
  const formError = useFormError();
  const fieldErrors = useFieldErrors();

  const error = useMemo(
    () =>
      formError ||
      (hasFormError(props.data) ? props.data.formError : undefined),
    [formError, props.data]
  );

  return (
    <>
      {!!error && (
        <InlineMessage icon="AlertTriangle" color="Danger">
          {error}
        </InlineMessage>
      )}
      {!!fieldErrors && (
        <InlineMessage icon="AlertTriangle" color="Danger">
          Make sure all fields are valid
        </InlineMessage>
      )}
    </>
  );
}
