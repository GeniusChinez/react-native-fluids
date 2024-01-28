/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Text } from './Text';
import { FontSize, useTheme } from 'theme-native';
import { Columns } from './Columns';
import { Icon, type IconType } from './Icon';
import { LoadingIcon } from './LoadingIcon';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ColorVariant =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

export interface ButtonProps extends TouchableOpacityProps {
  shape?: 'pill' | 'square';

  text?: string;
  loadingText?: string;
  textColor?: string;
  darkTextColor?: string;
  textSize?: keyof typeof FontSize;

  icon?: IconType;
  iconPos?: 'left' | 'right';

  variant?: ButtonVariant;

  color?: keyof ReturnType<typeof useTheme>['color'];
  colorVariant?: ColorVariant;
  darkColor?: keyof ReturnType<typeof useTheme>['color'];
  darkColorVariant?: ColorVariant;

  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    text,
    loadingText,
    textColor,
    darkTextColor,
    textSize = 'base',
    children,
    shape = 'pill',
    icon,
    iconPos = 'left',
    variant = 'solid',
    color: color_ = 'Primary',
    darkColor: darkColor_,
    colorVariant = 600,
    darkColorVariant = 600,
    disabled,
    isDisabled = disabled,
    isLoading,
    ...restOfProps
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const isGhostButton = useMemo(() => variant === 'ghost', [variant]);
  const isOutlineButton = useMemo(() => variant === 'outline', [variant]);
  const isIconButton = useMemo(() => !children && !text, [children, text]);

  const color = useMemo(() => {
    if (typeof theme.color[color_] === 'string') {
      return theme.color[color_];
    }
    return theme.color[color_][colorVariant];
  }, [colorVariant, color_, theme.color]);

  const darkColor = useMemo(() => {
    if (!darkColor_) {
      return color;
    }
    if (typeof theme.color[darkColor_] === 'string') {
      return theme.color[darkColor_] as string;
    }
    return theme.color[darkColor_][darkColorVariant];
  }, [color, darkColorVariant, darkColor_, theme.color]);

  const finalTextColor = useMemo(() => {
    if (textColor && !isDarkMode) {
      return textColor;
    }

    if (darkTextColor && isDarkMode) {
      return darkTextColor;
    }

    if (variant === 'ghost' || variant === 'outline') {
      if (isDarkMode) {
        return darkColor;
      }
      return color;
    }

    return 'white';
  }, [color, darkColor, darkTextColor, isDarkMode, textColor, variant]);

  return (
    <TouchableOpacity
      {...restOfProps}
      disabled={isDisabled || isLoading}
      style={{
        height: theme.fontSize[textSize || 'md'] * 3.3,
        width: isIconButton
          ? theme.fontSize[textSize || 'md'] * 3.3
          : undefined,
        opacity: isDisabled || isLoading ? 0.7 : 1,
        borderWidth: theme.borderWidth.Default,
        borderColor: isOutlineButton ? color : theme.color.Transparent,
        backgroundColor:
          variant === 'ghost' || variant === 'outline'
            ? theme.color.Transparent
            : isDarkMode
            ? darkColor
            : color,
        borderRadius: isIconButton
          ? theme.borderRadius.Full
          : shape === 'pill'
          ? theme.borderRadius['3xl']
          : theme.borderRadius.Lg,
      }}
    >
      <Columns px={6} alignX="center" alignY="center" grows gap={2}>
        {isLoading && (
          <LoadingIcon
            color={finalTextColor}
            strokeWidth={isGhostButton ? 3 : undefined}
            size={textSize ? theme.fontSize[textSize] * 1.2 : undefined}
          />
        )}
        {!isLoading && !!icon && iconPos === 'left' && (
          <Icon
            name={icon}
            color={finalTextColor}
            strokeWidth={isGhostButton ? 3 : undefined}
            size={textSize ? theme.fontSize[textSize] * 1.2 : undefined}
          />
        )}
        {!(isLoading && !!loadingText) && (
          <>
            {!!text && (
              <Text
                color={finalTextColor}
                darkColor={finalTextColor}
                isCenterAligned
                weight={isGhostButton ? 'Semibold' : undefined}
                size={textSize}
              >
                {text}
              </Text>
            )}
            {!!children && typeof children === 'string' ? (
              <Text
                color={finalTextColor}
                darkColor={finalTextColor}
                isCenterAligned
                weight={isGhostButton ? 'Semibold' : undefined}
                size={textSize}
              >
                {children}
              </Text>
            ) : (
              children
            )}
          </>
        )}
        {isLoading && !!loadingText && (
          <Text
            color={finalTextColor}
            darkColor={finalTextColor}
            isCenterAligned
            weight={isGhostButton ? 'Semibold' : undefined}
            size={textSize}
          >
            {loadingText}
          </Text>
        )}
        {!isLoading && !!icon && iconPos === 'right' && (
          <Icon
            name={icon}
            color={finalTextColor}
            strokeWidth={isGhostButton ? 3 : undefined}
            size={textSize ? theme.fontSize[textSize] * 1.2 : undefined}
          />
        )}
      </Columns>
    </TouchableOpacity>
  );
}
