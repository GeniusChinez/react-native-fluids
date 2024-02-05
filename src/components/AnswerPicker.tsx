/* eslint-disable react-native/no-inline-styles */
import React, { type PropsWithChildren, useState, useEffect } from 'react';
import { Text } from './Text';
import { Box } from './Box';
import { useTheme } from 'theme-native';
import { TouchableOpacity } from 'react-native';

export interface AnswerOptionProps extends PropsWithChildren<{}> {
  layout: 'rows' | 'columns';
  total?: number;
  isSelected?: boolean;
  handleSelect?: () => void;
  alignText?: 'center' | 'left';
}
export function AnswerOption(props: AnswerOptionProps) {
  const {
    children,
    total = 3,
    layout,
    isSelected = false,
    handleSelect,
    alignText,
  } = props;
  const theme = useTheme();
  const { isDarkMode } = theme;

  return (
    <TouchableOpacity
      style={{
        width: layout === 'rows' ? '100%' : undefined,
        flexBasis: layout === 'columns' ? `${(1 / total) * 100}%` : undefined,
        borderWidth: theme.borderWidth[2],
        borderColor: isDarkMode
          ? isSelected
            ? theme.color.Primary[500]
            : theme.color.Gray[500]
          : isSelected
          ? theme.color.Primary[500]
          : theme.color.Gray[300],
        padding: theme.spacing[4],
        borderRadius: theme.borderRadius.Md,
        backgroundColor: isSelected
          ? isDarkMode
            ? theme.color.Primary[950]
            : theme.color.Primary[50]
          : 'transparent',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: alignText === 'center' ? 'center' : 'flex-start',
      }}
      onPress={handleSelect}
    >
      {typeof children === 'string' ? (
        <Text
          darkColor={
            isSelected ? theme.color.Primary[300] : theme.color.Gray[400]
          }
          color={isSelected ? theme.color.Primary[700] : theme.color.Gray[700]}
          isCenterAligned={alignText === 'center'}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

// ...
export interface AnswerPickerProps {
  layout?: 'rows' | 'columns';
  alignAnswers?: 'center' | 'left';
  defaultOption?: string;
  options: { label: string; value: string }[];
  handleChange?: (v: string) => void;
}
export function AnswerPicker(props: AnswerPickerProps) {
  const {
    layout = 'rows',
    defaultOption,
    options,
    handleChange,
    alignAnswers,
  } = props;
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  return (
    <Box
      {...(layout === 'rows' ? { rows: true } : { columns: true })}
      gap={layout === 'columns' ? 3 : 2}
      w="Full"
      alignX={layout === 'columns' ? 'space-around' : undefined}
      alignY={'stretch'}
    >
      {options.map((option, optionIndex) => (
        <AnswerOption
          alignText={alignAnswers ?? (layout === 'columns' ? 'center' : 'left')}
          total={options.length}
          key={optionIndex}
          layout={layout || 'rows'}
          isSelected={selectedOption === option.value}
          handleSelect={() => {
            setSelectedOption(option.value);
            if (handleChange) {
              handleChange(option.value);
            }
          }}
        >
          {option.label}
        </AnswerOption>
      ))}
    </Box>
  );
}
