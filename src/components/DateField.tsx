// import React, { useCallback, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Rows } from './Rows';
// import { Button } from './Button';

// export interface DateFieldProps {}

// export function DateField(props: DateFieldProps) {
//   const {} = props;
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = useCallback(() => setIsOpen((x) => !x), []);

//   return (
//     <Rows>
//       <Button onPress={toggle}>Toggle</Button>
//       {isOpen && (
//         <DateTimePicker value={new Date()} is24Hour onChange={toggle} />
//       )}
//     </Rows>
//   );
// }

/* eslint-disable react-native/no-inline-styles */
import { useCallback, useState } from 'react';
import React from 'react';

import { useField, useIsSubmitting } from './ActionContextProvider';
// import { TextInput } from 'react-native';
import { useTheme } from 'theme-native';
import { View } from './View';
import { Text } from './Text';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

export interface DateFieldProps {
  name: string;
  id?: string;
  label?: string | undefined;
  className?: string;
  notify?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  helper?: string;
  grows?: boolean;
  placeholder?: string;
  format?: string;
  onChange?: (value: string) => void;
}

export function DateField(props: DateFieldProps) {
  const {
    name,
    id: providedId,
    label,
    placeholder,
    disabled,
    notify,
    helper,
    grows,
    format,
    ...restOfProps
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const { value, error: errors } = useField(name);
  const isSubmitting = useIsSubmitting();
  const id = providedId || name;

  const [text, setText] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((x) => !x), []);

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
      {isOpen && (
        <DateTimePicker
          style={{
            backgroundColor: 'red',
          }}
          value={text ? new Date(text) : new Date()}
          is24Hour
          themeVariant={isDarkMode ? 'dark' : 'light'}
          onChange={(_e, date) => {
            setText(date?.toISOString() || '');
            if (notify) {
              notify(date?.toISOString() || '');
            }
            toggle();
          }}
        />
      )}
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
      <TouchableOpacity
        id={id}
        onPress={toggle}
        disabled={!(!disabled && !isSubmitting)}
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
          paddingLeft: 17,
          paddingRight: 17,
          height: grows ? undefined : 55,
          backgroundColor: isDarkMode
            ? theme.color.Gray[900]
            : theme.color.Gray[100],
          flexDirection: 'row',
          alignItems: 'center',
          flex: grows ? 1 : undefined,
        }}
        {...restOfProps}
      >
        {text && (
          <Text
            color={isDarkMode ? theme.color.White : theme.color.Black}
            darkColor={isDarkMode ? theme.color.White : theme.color.Black}
          >
            {dayjs(text).format(format || 'ddd DD MMM YYYY')}
          </Text>
        )}
        {!text && (
          <Text
            color={
              isDarkMode
                ? errors?.length
                  ? theme.color.Danger[400]
                  : theme.color.Gray[500]
                : errors?.length
                ? theme.color.Danger[500]
                : theme.color.Gray[500]
            }
            darkColor={
              isDarkMode
                ? errors?.length
                  ? theme.color.Danger[400]
                  : theme.color.Gray[500]
                : errors?.length
                ? theme.color.Danger[500]
                : theme.color.Gray[500]
            }
          >
            {placeholder}
          </Text>
        )}
      </TouchableOpacity>
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
