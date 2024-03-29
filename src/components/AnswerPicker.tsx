/* eslint-disable react-native/no-inline-styles */
import React, { type PropsWithChildren, useState, useEffect } from 'react';
import { Text } from './Text';
import { Box } from './Box';
import { useTheme } from 'theme-native';
import { TouchableOpacity } from 'react-native';
import { Columns } from './Columns';
import { Icon } from './Icon';
import { View } from './View';
import { useResponsivePropsWithoutStyle } from '../hooks/useResponsivePropsWithoutStyle';
import type { ResponsiveProps } from './Responsive';

export interface AnswerOptionProps extends PropsWithChildren<{}> {
  layout: 'rows' | 'columns';
  total?: number;
  isSelected?: boolean;
  handleSelect?: () => void;
  alignText?: 'center' | 'left';
  incorrect?: boolean;
  correct?: boolean;
  alwaysCheck?: boolean;
}
export function AnswerOption(props: AnswerOptionProps) {
  const {
    children,
    total = 3,
    layout,
    isSelected = false,
    handleSelect,
    alignText,
    correct,
    incorrect,
    alwaysCheck,
  } = props;
  const theme = useTheme();
  const { isDarkMode } = theme;

  return (
    <TouchableOpacity
      style={{
        width: layout === 'rows' ? '100%' : 'auto',
        flexBasis: layout === 'columns' ? `${(1 / total) * 100}%` : undefined,
        borderWidth: theme.borderWidth[2],
        borderColor: isDarkMode
          ? isSelected
            ? correct
              ? theme.color.Success[500]
              : incorrect
              ? theme.color.Danger[500]
              : theme.color.Primary[500]
            : theme.color.Gray[500]
          : isSelected
          ? correct
            ? theme.color.Success[600]
            : incorrect
            ? theme.color.Danger[500]
            : theme.color.Primary[500]
          : theme.color.Gray[300],
        padding: theme.spacing[4],
        borderRadius: theme.borderRadius.Md,
        backgroundColor: isSelected
          ? isDarkMode
            ? correct
              ? theme.color.Success[950]
              : incorrect
              ? theme.color.Danger[950]
              : theme.color.Primary[950]
            : correct
            ? theme.color.Success[50]
            : incorrect
            ? theme.color.Danger[50]
            : theme.color.Primary[50]
          : 'transparent',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: alignText === 'center' ? 'center' : 'flex-start',
      }}
      onPress={handleSelect}
    >
      <Columns
        alignX="space-between"
        gap={3}
        w={alignText === 'left' ? 'Full' : undefined}
      >
        <View grows={alignText !== 'center'}>
          {typeof children === 'string' ? (
            <Text
              weight={isSelected ? 'Bold' : 'Normal'}
              darkColor={isSelected ? theme.color.White : theme.color.Gray[400]}
              color={
                isSelected
                  ? correct
                    ? theme.color.Success[600]
                    : incorrect
                    ? theme.color.Danger[600]
                    : theme.color.Primary[700]
                  : theme.color.Gray[700]
              }
              isCenterAligned={alignText === 'center'}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
        {(incorrect || correct || alwaysCheck) && isSelected && (
          <Icon
            strokeWidth={3}
            darkColor={
              isSelected
                ? correct
                  ? theme.color.Success[300]
                  : incorrect
                  ? theme.color.Danger[200]
                  : theme.color.Primary[300]
                : theme.color.Gray[400]
            }
            color={
              isSelected
                ? correct
                  ? theme.color.Success[600]
                  : incorrect
                  ? theme.color.Danger[600]
                  : theme.color.Primary[700]
                : theme.color.Gray[700]
            }
            name={incorrect ? 'X' : 'Check'}
            size={22}
          />
        )}
      </Columns>
    </TouchableOpacity>
  );
}

// ...
export type AnswerPickerProps = ResponsiveProps<{
  layout?: 'rows' | 'columns';
  alignAnswers?: 'center' | 'left';
  defaultOption?: string;
  defaultOptions?: string[];
  options: { label: string; value: string }[];
  handleChange?: (v: string) => void;
  incorrect?: boolean;
  correct?: boolean;
  multiSelect?: boolean;
  alwaysCheck?: boolean;
}>;

export function AnswerPicker(props_: AnswerPickerProps) {
  const props = useResponsivePropsWithoutStyle(props_);

  const {
    layout = 'rows',
    defaultOption,
    defaultOptions,
    options,
    handleChange,
    alignAnswers,
    correct,
    incorrect,
    multiSelect,
    alwaysCheck,
  } = props;
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [selectedOptions, setSelectedOptions] = useState([
    ...(defaultOptions || []),
  ]);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  useEffect(() => {
    if (defaultOptions) {
      setSelectedOptions(defaultOptions);
    }
  }, [defaultOptions]);

  return (
    <Box
      {...(layout === 'rows' ? { rows: true } : { columns: true })}
      gap={layout === 'columns' ? 3 : 2}
      sm={{
        gap: layout === 'columns' ? 3 : 2,
        alignX: layout === 'columns' ? 'center' : undefined,
      }}
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
          alwaysCheck={alwaysCheck}
          isSelected={
            selectedOption === option.value ||
            selectedOptions.includes(option.value)
          }
          handleSelect={() => {
            if (multiSelect) {
              setSelectedOptions((prev) => {
                if (prev.includes(option.value)) {
                  return prev.filter((v) => v !== option.value);
                }
                return [...prev, option.value];
              });
            } else {
              setSelectedOption(option.value);
            }

            if (handleChange) {
              handleChange(option.value);
            }
          }}
          incorrect={
            (incorrect &&
              (selectedOption === option.value ||
                selectedOptions.includes(option.value))) ||
            undefined
          }
          correct={
            (correct &&
              (selectedOption === option.value ||
                selectedOptions.includes(option.value))) ||
            undefined
          }
        >
          {option.label}
        </AnswerOption>
      ))}
    </Box>
  );
}
