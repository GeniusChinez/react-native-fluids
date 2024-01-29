import React from 'react';
import { useIsSubmitting } from './ActionContextProvider';
import { Button, type ButtonProps } from './Button';

export interface FormButtonProps extends ButtonProps {}

export function FormButton(props: FormButtonProps) {
  const { ...restOfProps } = props;
  const isSubmitting = useIsSubmitting();

  return <Button {...restOfProps} isDisabled={isSubmitting} />;
}
