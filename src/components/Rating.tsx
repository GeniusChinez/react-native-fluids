import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { FontSize, useTheme } from 'theme-native';
import type { ColorVariant } from './Button';

export interface CustomRatingProps {
  rating: number;
  isDisabled?: boolean;
  count?: number;
  color?: keyof ReturnType<typeof useTheme>['color'];
  darkColor?: keyof ReturnType<typeof useTheme>['color'];
  colorVariant?: ColorVariant;
  darkColorVariant?: ColorVariant;
  size?: keyof typeof FontSize;
}

export function CustomRating(props: CustomRatingProps) {
  const {
    rating,
    isDisabled = false,
    count = 5,
    color,
    darkColor,
    colorVariant = 600,
    darkColorVariant = 400,
    size = 'base',
  } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  return (
    <AirbnbRating
      count={count}
      defaultRating={rating}
      selectedColor={
        theme.color[
          isDarkMode ? darkColor || color || 'Primary' : color || 'Primary'
        ][isDarkMode ? darkColorVariant : colorVariant]
      }
      showRating={false}
      size={theme.fontSize[size]}
      isDisabled={isDisabled}
    />
  );
}
