import React from 'react';
import { icons as Icons } from 'lucide-react-native';
import { useTheme } from 'theme-native';

export type IconType = keyof typeof Icons;

export interface IconProps {
  name: IconType;
  color?: string;
  darkColor?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon(props: IconProps) {
  const { name, size, color, darkColor, strokeWidth } = props;
  const CustomIcon = Icons[name];

  const theme = useTheme();
  const { isDarkMode } = theme;

  return (
    <CustomIcon
      size={size || theme.fontSize.xl}
      color={isDarkMode ? darkColor || color : color}
      strokeWidth={strokeWidth}
    />
  );
}
