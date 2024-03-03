/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Text } from './Text';
import { FontSize, useTheme } from 'theme-native';
import { Columns } from './Columns';
import { Icon, type IconType } from './Icon';
import { LoadingIcon } from './LoadingIcon';
import { useMediaQuery } from '../hooks/useMediaQuery';
import type { MenuTriggerProps } from './MenuTrigger';
import { useMenuTriggerActions } from '../hooks/useMenuTriggerActions';
import { PotentialMenuTrigger } from './PotentialMenuTrigger';

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

export interface ButtonProps extends TouchableOpacityProps, MenuTriggerProps {
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

  isFullWidth?: boolean;
  isCompact?: boolean;
  isVeryCompact?: boolean;
  sheet?: { height?: number; children: React.ReactNode; panToClose?: boolean };
}

export function Button(props: ButtonProps) {
  const theme = useTheme();

  const {
    text,
    loadingText,
    textSize = 'base',
    children,
    shape = 'pill',
    icon,
    isFullWidth,
    iconPos = 'left',
    variant = 'solid',
    color: color_ = 'Primary',
    colorVariant = color_ !== 'Primary' ? 200 : 600,
    darkColorVariant = color_ !== 'Primary' ? 800 : 600,
    textColor = color_ === 'Primary'
      ? theme.color.White
      : theme.color[color_ === 'Secondary' ? 'Primary' : color_][700],
    darkTextColor,
    darkColor: darkColor_ = color_ === 'Secondary' ? 'Gray' : color_,
    disabled,
    isDisabled = disabled,
    isLoading,
    isCompact,
    isVeryCompact,
    ...restOfProps
  } = props;

  const { isDarkMode } = theme;

  const isGhostButton = useMemo(() => variant === 'ghost', [variant]);
  const isOutlineButton = useMemo(() => variant === 'outline', [variant]);
  const isIconButton = useMemo(() => !children && !text, [children, text]);

  const menuTriggerActions = useMenuTriggerActions(props);

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

  const { sm } = useMediaQuery();

  const button = (weirdArgs?: any) => (
    <TouchableOpacity
      {...restOfProps}
      disabled={isDisabled || isLoading}
      style={{
        height:
          theme.fontSize[textSize || 'md'] *
          (isCompact ? 2.5 : isVeryCompact ? 2 : 3.3),
        width: isIconButton
          ? theme.fontSize[textSize || 'md'] *
            (isCompact ? 2.5 : isVeryCompact ? 2 : 3.3)
          : isFullWidth
          ? '100%'
          : sm
          ? 'auto'
          : '100%',
        opacity: isDisabled || isLoading ? 0.7 : 1,
        borderWidth: theme.borderWidth.Default,
        borderColor: isOutlineButton ? color : theme.color.Transparent,
        backgroundColor:
          variant === 'ghost' || variant === 'outline'
            ? theme.color.Transparent
            : isDarkMode
            ? darkColor
            : color,
        borderRadius:
          shape === 'pill'
            ? isIconButton
              ? theme.borderRadius.Full
              : theme.borderRadius['3xl']
            : theme.borderRadius.Lg,
      }}
      onPress={(e) => {
        if (restOfProps.onPress) {
          restOfProps.onPress(e);
        }
        menuTriggerActions.onPress(e, weirdArgs);
      }}
    >
      <Columns
        px={isIconButton ? undefined : 6}
        alignX="center"
        alignY="center"
        grows
        gap={2}
      >
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
            strokeWidth={isGhostButton ? 2.5 : undefined}
            size={
              textSize
                ? theme.fontSize[textSize] * (isIconButton ? 1.4 : 1.2)
                : undefined
            }
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
            strokeWidth={isGhostButton ? 2.5 : undefined}
            size={
              textSize
                ? theme.fontSize[textSize] * (isIconButton ? 1.4 : 1.2)
                : undefined
            }
          />
        )}
      </Columns>
    </TouchableOpacity>
  );

  return <PotentialMenuTrigger {...props} button={button} />;
}
