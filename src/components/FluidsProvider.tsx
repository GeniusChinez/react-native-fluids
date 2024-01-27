import React from 'react';
import { ThemeProvider, type ThemeProviderProps } from 'theme-native';

export interface FluidsProviderProps extends ThemeProviderProps {}

export function FluidsProvider(props: FluidsProviderProps) {
  const { children, ...themeNativeProviderProps } = props;
  return (
    <ThemeProvider {...themeNativeProviderProps}>{children}</ThemeProvider>
  );
}
