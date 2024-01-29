/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Rows, type RowsProps } from './Rows';
import { FieldList, type FieldListProps } from './FieldList';
import { FormError } from './FormError';
import { useIsSubmitting } from './ActionContextProvider';

export interface FormLayoutProps extends RowsProps {
  actions?: React.ReactNode;
  actionsContainerProps?: RowsProps;
  fieldListProps?: FieldListProps;
  showFormError?: boolean;
  blurWhenProcessing?: boolean;
}

export function FormLayout(props: FormLayoutProps) {
  const {
    actions,
    children,
    fieldListProps,
    actionsContainerProps,
    showFormError = true,
    blurWhenProcessing,
    style,
    ...restOfProps
  } = props;
  const isSubmitting = useIsSubmitting();

  return (
    <Rows
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
        <Rows gap={3} {...actionsContainerProps}>
          {actions}
        </Rows>
      )}
    </Rows>
  );
}
