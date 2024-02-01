/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useField, useIsSubmitting } from './ActionContextProvider';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'theme-native';
import { View } from './View';
import { Text } from './Text';
import { Icon } from './Icon';

export interface CheckboxFieldProps {
  name: string;
  id?: string;
  label?: React.ReactNode;
  large?: boolean;
  errors?: string[];
  handleToggle?: (isChecked: boolean) => void;
  helper?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
}

export function CheckboxField(props: CheckboxFieldProps) {
  const {
    name,
    id: customId,
    label,
    disabled,
    large,
    defaultChecked,
    errors: customErrors,
    handleToggle: onToggle,
    helper,
    ...restOfProps
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const { value, error: formErrors } = useField(name);
  const isSubmitting = useIsSubmitting();
  const id = customId || name;

  const errors = useMemo(
    () => [...(formErrors ?? []), ...(customErrors ?? [])],
    [customErrors, formErrors]
  );

  const [isChecked, setIsChecked] = useState(defaultChecked || value === 'on');

  useEffect(() => {
    setIsChecked(value === 'on');
  }, [value]);

  useEffect(() => {
    setIsChecked(!!defaultChecked);
  }, [defaultChecked]);

  const handleToggle = useCallback(() => {
    if (isSubmitting || disabled) {
      return;
    }

    if (onToggle) {
      onToggle(!isChecked);
    }

    setIsChecked((x) => !x);
  }, [disabled, isChecked, isSubmitting, onToggle]);

  return (
    <View
      style={{
        flexDirection: 'column',
        rowGap: theme.spacing[1],
      }}
      id={customId || ''}
      w={'Full'}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: theme.spacing[1],
        }}
        onPress={handleToggle}
      >
        <View
          style={{
            backgroundColor: isChecked
              ? theme.color.Primary[600]
              : isDarkMode
              ? theme.color.Gray[700]
              : theme.color.White,
            height: large ? theme.height[8] : theme.height[6],
            width: large ? theme.width[8] : theme.width[6],
            borderWidth: theme.borderWidth.Default,
            borderColor: isChecked
              ? theme.color.Primary[600]
              : errors?.length
              ? theme.color.Red[400]
              : theme.color.Primary[600],
            borderRadius: theme.borderRadius.Default,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>
            {isChecked && (
              <Icon name="Check" color={isChecked ? 'white' : 'black'} />
            )}
          </Text>
        </View>
        {(restOfProps.required && (
          <Text
            style={{
              color: theme.color.Red[700],
            }}
          >
            {' '}
            *
          </Text>
        )) ||
          undefined}
        <Text
          style={{
            marginLeft: theme.spacing[1],
            color: isDarkMode ? theme.color.Slate[300] : theme.color.Slate[700],
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
      {(errors?.length && (
        <Text
          style={{
            color: isDarkMode ? theme.color.Red[400] : theme.color.Red[500],
          }}
          size="sm"
          id={`${id}-error`}
        >
          {errors.join(', ')}
        </Text>
      )) ||
        undefined}
      {(!errors?.length && !!helper && (
        <Text
          size="sm"
          style={{
            color: isDarkMode ? theme.color.Gray[700] : theme.color.Gray[500],
          }}
        >
          {helper}
        </Text>
      )) ||
        undefined}
    </View>
  );
}
