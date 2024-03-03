/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Rows, type RowsProps } from './Rows';
import { FieldList, type FieldListProps } from './FieldList';
import { FormError } from './FormError';
import { useIsSubmitting } from './ActionContextProvider';
import { type BoxProps } from './Box';
import { ButtonContainer } from './ButtonContainer';

export interface FormLayoutProps extends RowsProps {
  actions?: React.ReactNode;
  actionsContainerProps?: BoxProps;
  fieldListProps?: FieldListProps;
  showFormError?: boolean;
  blurWhenProcessing?: boolean;
}

export function FormLayout(props: FormLayoutProps) {
  const {
    actions,
    children,
    fieldListProps,
    actionsContainerProps = { rows: true },
    showFormError = true,
    blurWhenProcessing,
    style,
    ...restOfProps
  } = props;
  const isSubmitting = useIsSubmitting();

  return (
    <Rows
      w="Full"
      gap={9}
      {...restOfProps}
      style={{
        ...(style as any),
        opacity: blurWhenProcessing ? (isSubmitting ? 0.7 : 1) : 1,
      }}
    >
      <FieldList {...fieldListProps}>{children}</FieldList>
      {showFormError && <FormError />}
      {!!actions && (
        <ButtonContainer {...actionsContainerProps}>{actions}</ButtonContainer>
      )}
    </Rows>
  );
}
