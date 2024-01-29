import React from 'react';
import { useIsSubmitting } from './ActionContextProvider';
import { type ButtonProps } from './Button';
import { FormButton } from './FormButton';

interface Props extends ButtonProps {}

export function FormPrimaryButton(props: Props) {
  const { text, loadingText, ...restOfProps } = props;
  const isSubmitting = useIsSubmitting();

  return (
    <FormButton
      color="Primary"
      {...restOfProps}
      isLoading={isSubmitting}
      text={isSubmitting ? loadingText || 'Submitting...' : text}
    />
  );
}
