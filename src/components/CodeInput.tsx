/* eslint-disable react-native/no-inline-styles */
import React, { createRef, useEffect, useMemo } from 'react';
import { TextInput } from 'react-native';
import { Columns } from './Columns';
import { useState } from 'react';
import { useTheme } from 'theme-native';

/// .....
export interface CodeInputProps {
  length: number;
  hiddenInput?: boolean;
  notify?: (txt: string) => void;
  handleDone?: (txt: string) => void;
  isInvalid?: boolean;
  disabled?: boolean;
}

export function CodeInput(props: CodeInputProps) {
  const { length, hiddenInput, notify, handleDone, isInvalid, disabled } =
    props;
  const [values, setValues] = useState(Array.from(new Array(length)));
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasFocus, setHasFocus] = useState(false);

  const theme = useTheme();
  const { isDarkMode } = theme;

  const refs = useMemo(
    () => Array.from(new Array(length)).map(() => createRef<TextInput>()),
    [length]
  );

  useEffect(() => {
    if (activeIndex < length && activeIndex > -1) {
      refs[activeIndex]?.current?.focus();
      refs.slice(activeIndex).forEach((ref) => ref.current?.clear());
    }
  }, [activeIndex, length, refs]);

  useEffect(() => {
    if (notify) {
      notify(values.join(''));
    }
  }, [notify, values]);

  return (
    <Columns gap={2} alignX="center">
      {values.map((value, index) => (
        <TextInput
          key={index}
          editable={!disabled}
          ref={refs[index]}
          value={value}
          onFocus={() => {
            setActiveIndex(index);
            setHasFocus(true);
          }}
          onChangeText={(txt) => {
            const ch = txt.length > 0 ? txt[0] : '';
            if (!ch) {
              return;
            }

            const newValues = [
              ...values.slice(0, activeIndex),
              txt[0],
              ...values.slice(activeIndex + 1),
            ];

            setValues(newValues);

            if (activeIndex === length - 1) {
              refs[activeIndex]?.current?.blur();
              setHasFocus(false);

              if (handleDone) {
                handleDone(newValues.join(''));
              }
            }
            setActiveIndex((x) => x + 1);
          }}
          secureTextEntry={hiddenInput}
          style={{
            borderRadius: theme.borderRadius.Md,
            borderColor: isDarkMode
              ? isInvalid
                ? theme.color.Danger[400]
                : activeIndex === index
                ? theme.color.Slate[400]
                : theme.color.Slate[700]
              : isInvalid
              ? theme.color.Danger[500]
              : activeIndex === index
              ? theme.color.Primary[500]
              : theme.color.Slate[300],
            borderWidth: 2,
            fontSize: theme.fontSize.lg,
            height: 50,
            width: 45,
            opacity: disabled
              ? 0.5
              : activeIndex >= index
              ? 1
              : hasFocus
              ? 0.4
              : 1,
            color: isDarkMode ? theme.color.White : theme.color.Black,
            backgroundColor: isDarkMode
              ? theme.color.Gray[900]
              : theme.color.Gray[100],
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
        />
      ))}
    </Columns>
  );
}
