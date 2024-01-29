/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import React from 'react';

import { useField, useIsSubmitting } from './ActionContextProvider';
import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';
import { useTheme } from 'theme-native';
import { View } from './View';
import { Text } from './Text';

export interface TextFieldProps extends TextInputProps {
  name: string;
  id?: string;
  customRef?: React.RefObject<TextInput>;
  label?: string | undefined;
  className?: string;
  large?: boolean;
  notify?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  helper?: string;
  grows?: boolean;
}

export function TextField(props: TextFieldProps) {
  const {
    name,
    id: providedId,
    customRef,
    label,
    placeholder,
    // type,
    editable = true,
    disabled,
    // className,
    // large,
    notify,
    onChangeText: onChange,
    helper,
    grows,
    ...restOfProps
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const { value, error: errors } = useField(name);
  const isSubmitting = useIsSubmitting();
  const id = providedId || name;

  const [text, setText] = useState(value);

  // useEffect(() => {
  //   if (notify) {
  //     notify(text);
  //   }
  // }, [notify, text]);

  // const handleChange = useCallback(
  //   (newText: string) => {
  //     setText(newText);
  //     if (onChange) {
  //       onChange(newText);
  //     }
  //   },
  //   [onChange],
  // );

  return (
    <View
      style={{
        flexDirection: 'column',
        alignContent: 'stretch',
        rowGap: 4,
      }}
      grows={grows}
    >
      {label && (
        <Text
          size="sm"
          style={{
            fontWeight: theme.fontWeight.Medium,
            color: isDarkMode ? theme.color.Slate[300] : theme.color.Slate[700],
          }}
        >
          {label}
          {restOfProps.required && (
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
      <TextInput
        id={id}
        ref={customRef}
        placeholder={placeholder || label}
        editable={editable && !disabled && !isSubmitting}
        value={text}
        onChangeText={(newText) => {
          setText(newText);

          if (notify) {
            notify(newText);
          }

          if (onChange) {
            onChange(newText);
          }
        }}
        placeholderTextColor={
          isDarkMode
            ? errors?.length
              ? theme.color.Danger[400]
              : theme.color.Slate[500]
            : errors?.length
            ? theme.color.Danger[500]
            : undefined
        }
        style={{
          width: '100%',
          borderTopRightRadius: theme.borderRadius.Md,
          borderTopLeftRadius: theme.borderRadius.Md,
          borderColor: errors?.length
            ? theme.color.Red[400]
            : isDarkMode
            ? theme.color.Slate[700]
            : theme.color.Slate[300],
          borderBottomWidth: 2,
          paddingVertical:
            !!restOfProps.numberOfLines && !!restOfProps.multiline
              ? 17
              : undefined,
          paddingLeft: 17,
          paddingRight: 17,
          fontSize: theme.fontSize.base,
          height: grows
            ? undefined
            : !!restOfProps.numberOfLines && !!restOfProps.multiline
            ? undefined
            : 55,
          color: isDarkMode ? theme.color.White : theme.color.Black,
          backgroundColor: isDarkMode
            ? theme.color.Gray[900]
            : theme.color.Gray[100],
          // backgroundColor: isDarkMode ? theme.color.Black : theme.color.White,
          textAlignVertical:
            !!restOfProps.numberOfLines && !!restOfProps.multiline
              ? 'top'
              : 'center',
          flex: grows ? 1 : undefined,
        }}
        {...restOfProps}
      />
      {errors?.length && (
        <Text
          size="sm"
          style={{
            color: isDarkMode ? theme.color.Red[400] : theme.color.Red[500],
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
          }}
        >
          {helper}
        </Text>
      )}
    </View>
  );
}
