import React from 'react';
import { View as ReactNativeView } from 'react-native';
import type { TextProps as ReactNativeTextProps } from 'react-native';
import { useTheme } from 'theme-native';

export interface ViewProps extends ReactNativeTextProps {
  bg?: string;
  darkBg?: string;
}

export function View(props: ViewProps) {
  const {
    bg = 'transparent',
    darkBg = 'transparent',
    style,
    ...restOfProps
  } = props;
  const { isDarkMode } = useTheme();

  return (
    <ReactNativeView
      style={{
        backgroundColor: isDarkMode ? darkBg : bg,
        ...(style as any),
      }}
      {...restOfProps}
    />
  );
}
