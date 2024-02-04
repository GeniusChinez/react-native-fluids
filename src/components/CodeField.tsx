/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useField, useIsSubmitting } from './ActionContextProvider';
import { Text } from './Text';
import { View } from './View';
import { useTheme } from 'theme-native';
import { CodeInput } from './CodeInput';

export interface CodeFieldProps {
  name: string;
  label?: string | undefined;
  notify?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  helper?: string;
  grows?: boolean;
  length?: number;
  hiddenInput?: boolean;
}

export function CodeField(props: CodeFieldProps) {
  const {
    name,
    label,
    disabled,
    notify,
    helper,
    grows,
    required,
    length,
    hiddenInput,
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const { error: errors } = useField(name);
  const isSubmitting = useIsSubmitting();

  return (
    <View
      style={{
        flexDirection: 'column',
        alignContent: 'stretch',
        rowGap: 4,
      }}
      grows={grows}
      w="Full"
    >
      {label && (
        <Text
          size="sm"
          style={{
            fontWeight: theme.fontWeight.Medium,
            color: isDarkMode ? theme.color.Slate[300] : theme.color.Slate[700],
            textAlign: 'center',
          }}
        >
          {label}
          {required && (
            <Text
              style={{
                color: isDarkMode ? theme.color.Red[400] : theme.color.Red[700],
              }}
            >
              {' '}
              *
            </Text>
          )}
        </Text>
      )}
      <CodeInput
        isInvalid={!!errors}
        length={length || 4}
        hiddenInput={hiddenInput}
        disabled={disabled || isSubmitting}
        notify={(newText) => {
          if (notify) {
            notify(newText);
          }
        }}
      />
      {errors?.length && (
        <Text
          size="sm"
          style={{
            color: isDarkMode ? theme.color.Red[400] : theme.color.Red[500],
            textAlign: 'center',
          }}
        >
          {errors.join(', ')}
        </Text>
      )}
      {!errors?.length && !!helper && (
        <Text
          size="sm"
          style={{
            color: isDarkMode ? theme.color.Gray[700] : theme.color.Gray[500],
            textAlign: 'center',
          }}
        >
          {helper}
        </Text>
      )}
    </View>
  );
}
