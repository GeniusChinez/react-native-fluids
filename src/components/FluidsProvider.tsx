import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, type ThemeProviderProps } from 'theme-native';

export interface FluidsProviderProps extends ThemeProviderProps {}

export function FluidsProvider(props: FluidsProviderProps) {
  const { children, ...themeNativeProviderProps } = props;
  return (
    <SafeAreaProvider>
      <ThemeProvider {...themeNativeProviderProps}>{children}</ThemeProvider>
    </SafeAreaProvider>
  );
}
