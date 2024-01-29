import React from 'react';
import {
  ActionContextProvider,
  type ActionContextProviderProps,
} from './ActionContextProvider';
import {
  FormPrimaryButton,
  type FormPrimaryButtonProps,
} from './FormPrimaryButton';
import { FormLayout, type FormLayoutProps } from './FormLayout';
import { FormButton, type FormButtonProps } from './FormButton';

export interface FormProps extends ActionContextProviderProps {
  primary?: FormPrimaryButtonProps;
  actions?: FormButtonProps[];
  formLayoutProps?: FormLayoutProps;
  blurWhenProcessing?: boolean;
}

export function Form(props: FormProps) {
  const {
    children,
    primary,
    actions,
    formLayoutProps,
    blurWhenProcessing = true,
    ...restOfProps
  } = props;
  return (
    <ActionContextProvider {...restOfProps}>
      <FormLayout
        blurWhenProcessing={blurWhenProcessing}
        actions={
          !!primary || !!actions ? (
            <>
              {!!primary && <FormPrimaryButton {...primary} />}
              {!!actions &&
                actions.map((action, actionIndex) => (
                  <FormButton {...action} key={actionIndex} />
                ))}
            </>
          ) : undefined
        }
        {...formLayoutProps}
      >
        {children}
      </FormLayout>
    </ActionContextProvider>
  );
}
