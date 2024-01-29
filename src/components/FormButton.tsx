import React from 'react';
import { useIsSubmitting } from './ActionContextProvider';
import { Button, type ButtonProps } from './Button';

interface Props extends ButtonProps {}

export function FormButton(props: Props) {
  const { ...restOfProps } = props;
  const isSubmitting = useIsSubmitting();

  return <Button {...restOfProps} isDisabled={isSubmitting} />;
}
