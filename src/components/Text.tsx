/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text as ReactNativeText } from 'react-native';
import type { TextProps as ReactNativeTextProps } from 'react-native';
import { useTheme, type FontSize, type FontWeight } from 'theme-native';
import { useResponsiveProps } from '../hooks/useResponsiveProps';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p';

export interface RawTextProps extends ReactNativeTextProps {
  size?: keyof typeof FontSize;
  color?: string;
  darkColor?: string;

  weight?: keyof typeof FontWeight;
  variant?: TextVariant;

  isUnderlined?: boolean;
  isItalic?: boolean;
  isCancelled?: boolean;

  isCenterAligned?: boolean;
  isLeftAligned?: boolean;
  isRightAligned?: boolean;
  isJustified?: boolean;
}

export type TextProps = {
  sm?: RawTextProps;
  md?: RawTextProps;
  lg?: RawTextProps;
  xl?: RawTextProps;
  xl2?: RawTextProps;
} & RawTextProps;

export const variantSizeMap: Record<TextVariant, keyof typeof FontSize> = {
  h1: 'xl6',
  h2: 'xl5',
  h3: 'xl4',
  h4: 'xl3',
  h5: 'xl2',
  h6: 'xl',
  h7: 'lg',
  p: 'base',
};

export function Text(props: TextProps) {
  const actualProps = useResponsiveProps<RawTextProps>(props);

  const {
    color,
    darkColor,
    style,
    size,
    weight,
    variant,
    isUnderlined,
    isItalic,
    isCancelled,
    isCenterAligned,
    isLeftAligned,
    isRightAligned,
    isJustified,
    ...restOfProps
  } = actualProps;

  const { isDarkMode } = useTheme();
  const theme = useTheme();

  return (
    <ReactNativeText
      style={{
        color: isDarkMode ? darkColor || theme.color.Gray[300] : color,
        fontStyle: isItalic ? 'italic' : 'normal',
        textAlign: isCenterAligned
          ? 'center'
          : isLeftAligned
          ? 'left'
          : isRightAligned
          ? 'right'
          : isJustified
          ? 'justify'
          : 'auto',
        textDecorationLine: isCancelled
          ? isUnderlined
            ? 'underline line-through'
            : 'line-through'
          : isUnderlined
          ? 'underline'
          : 'none',
        fontSize: variant
          ? theme.fontSize[variantSizeMap[variant]]
          : theme.fontSize[size || 'base'],
        fontWeight: variant
          ? variant === 'p'
            ? theme.fontWeight[weight || 'Normal']
            : theme.fontWeight[weight || 'Bold']
          : theme.fontWeight[weight || 'Normal'],
        ...(style as any),
      }}
      {...restOfProps}
    />
  );
}
