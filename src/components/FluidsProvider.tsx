/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, type ThemeProviderProps } from 'theme-native';
import { BottomSheetsProvider } from './BottomSheetsProvider';
import { MenuProvider } from 'react-native-popup-menu';

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
        <ThemeProvider {...themeNativeProviderProps}>
          <MenuProvider>
            <BottomSheetsProvider>{children}</BottomSheetsProvider>
          </MenuProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
