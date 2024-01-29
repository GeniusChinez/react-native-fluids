/* eslint-disable react-native/no-inline-styles */

import type { ComponentProps } from 'react';

import React, { useCallback, useEffect, useState } from 'react';
import { useField, useIsSubmitting } from './ActionContextProvider';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { View } from './View';
import { Text } from './Text';
import { useTheme } from 'theme-native';

type SelectItem = { label: string; value: string };

interface Props extends ComponentProps<typeof Picker> {
  name: string;
  id?: string;
  label: string | undefined;
  options: (SelectItem & { key: number | string })[];
  required?: boolean;
  notify?: (value: string | undefined) => void;
  helper?: string;
  grows?: boolean;
}

export function SelectField(props: Props) {
  const {
    name,
    id: providedId,
    label,
    placeholder = label,
    options,
    notify,
    helper,
    grows,
    ...restOfProps
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const { value, error: errors } = useField(name);
  const isSubmitting = useIsSubmitting();

  const [selectedValue, setSelectedValue] = useState(value?.toString() ?? '');

  const id = providedId || name;

  const handleChange = useCallback(
    (newSelected: string) => {
      setSelectedValue(newSelected);
      if (notify) {
        notify(newSelected);
      }
    },
    [notify]
  );

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  return (
    <View
      style={{
        flexDirection: 'column',
        rowGap: theme.spacing[1],
      }}
    >
      {label && (
        <Text
          size="sm"
          style={{
            color: isDarkMode ? theme.color.Slate[300] : theme.color.Slate[700],
            fontWeight: theme.fontWeight.Medium,
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
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        textInputProps={{
          placeholder,
          placeholderTextColor: isDarkMode
            ? errors?.length
              ? theme.color.Danger[400]
              : theme.color.Gray[500]
            : errors?.length
            ? theme.color.Danger[500]
            : theme.color.Gray[500],
        }}
        placeholder={{
          key: name,
          color: isDarkMode
            ? errors?.length
              ? theme.color.Danger[400]
              : theme.color.Gray[500]
            : errors?.length
            ? theme.color.Danger[500]
            : theme.color.Gray[500],
          value: '',
          label: placeholder,
        }}
        style={{
          placeholder: {
            color: isDarkMode
              ? errors?.length
                ? theme.color.Danger[400]
                : theme.color.Gray[500]
              : errors?.length
              ? theme.color.Danger[500]
              : theme.color.Gray[500],
            fontSize: theme.fontSize.base,
          },
          inputAndroidContainer: {
            width: '100%',
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
          },
          inputIOSContainer: {
            width: '100%',
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
          },
          inputAndroid: {
            color: isDarkMode ? theme.color.White : theme.color.Black,
            width: '100%',
            fontSize: theme.fontSize.base,
          },
          inputIOS: {
            color: isDarkMode ? theme.color.White : theme.color.Black,
            width: '100%',
            fontSize: theme.fontSize.base,
          },
        }}
        touchableWrapperProps={{
          style: {
            // width: '100%',
            // borderRadius: 4,
            // // borderColor: theme.color.Slate[300],
            // borderColor: errors?.length
            //   ? theme.color.Red[400]
            //   : isDarkMode
            //   ? theme.color.Slate[700]
            //   : theme.color.Slate[300],
            // borderWidth: 1,
            // paddingHorizontal: 14,
            // height: 55,
            // justifyContent: 'center',
            // backgroundColor: isDarkMode ? theme.color.Black : theme.color.White,

            width: '100%',
            borderTopRightRadius: theme.borderRadius.Md,
            borderTopLeftRadius: theme.borderRadius.Md,
            borderColor: errors?.length
              ? theme.color.Red[400]
              : isDarkMode
              ? theme.color.Slate[700]
              : theme.color.Slate[300],
            borderBottomWidth: 2,
            paddingLeft: 17,
            paddingRight: 17,
            height: 55,
            backgroundColor: isDarkMode
              ? theme.color.Gray[900]
              : theme.color.Gray[100],
            flexDirection: 'row',
            alignItems: 'center',
            flex: grows ? 1 : undefined,
          },
        }}
        onValueChange={(itemValue) => handleChange(itemValue)}
        items={options.map((option, optionIndex) => ({
          label: option.label,
          value: option.value,
          key: optionIndex,
          index: optionIndex,
        }))}
        value={selectedValue}
        disabled={isSubmitting}
      />
      {errors?.length && (
        <Text
          size="sm"
          style={{
            color: isDarkMode ? theme.color.Red[400] : theme.color.Red[500],
          }}
          id={`${id}-error`}
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
