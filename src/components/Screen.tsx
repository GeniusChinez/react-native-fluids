/* eslint-disable react-native/no-inline-styles */
import React, { type PropsWithChildren } from 'react';
import { BottomAppbar, type BottomAppbarProps } from './BottomAppbar';
import {
  BottomNavigation,
  type BottomNavigationProps,
} from './BottomNavigation';
import { useKeyboard } from '../hooks/useKeyboard';
import { View, type ViewProps } from './View';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export interface ScreenProps extends PropsWithChildren<ViewProps> {
  bottomNavigation?: BottomNavigationProps;
  bottomAppbar?: BottomAppbarProps;
  isScrollable?: boolean;
}

export function Screen(props: ScreenProps) {
  const {
    bottomAppbar,
    bottomNavigation,
    children,
    isScrollable,
    ...restOfProps
  } = props;
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();

  return (
    <>
      {isScrollable && (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            // bg="white"
            // darkBg="black"
            grows
            {...restOfProps}
            style={{
              paddingTop: insets.top,
              ...(restOfProps.style as any),
            }}
          >
            {children}
          </View>
        </ScrollView>
      )}
      {!isScrollable && (
        <View
          bg="white"
          darkBg="black"
          grows
          {...restOfProps}
          style={{
            paddingTop: insets.top,
            ...(restOfProps.style as any),
          }}
        >
          {children}
        </View>
      )}
      {!!bottomAppbar && !keyboard.shown && <BottomAppbar {...bottomAppbar} />}
      {!!bottomNavigation && !keyboard.shown && (
        <BottomNavigation {...bottomNavigation} />
      )}
    </>
  );
}
