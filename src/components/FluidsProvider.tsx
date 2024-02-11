/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, type ThemeProviderProps } from 'theme-native';
import { BottomSheetsProvider } from './BottomSheetsProvider';

export interface FluidsProviderProps extends ThemeProviderProps {}

export function FluidsProvider(props: FluidsProviderProps) {
  const { children, ...themeNativeProviderProps } = props;
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <BottomSheetsProvider>
          <ThemeProvider {...themeNativeProviderProps}>
            {children}
          </ThemeProvider>
        </BottomSheetsProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
