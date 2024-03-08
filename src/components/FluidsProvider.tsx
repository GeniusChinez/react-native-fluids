/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, type ThemeProviderProps } from 'theme-native';
import { BottomSheetsProvider } from './BottomSheetsProvider';
import { MenuProvider } from 'react-native-popup-menu';
import { PortalProvider } from '@gorhom/portal';

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
          <PortalProvider>
            <MenuProvider>
              <BottomSheetsProvider>{children}</BottomSheetsProvider>
            </MenuProvider>
          </PortalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
