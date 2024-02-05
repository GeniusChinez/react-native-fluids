import React, { type PropsWithChildren } from 'react';
import { BottomAppbar, type BottomAppbarProps } from './BottomAppbar';
import {
  BottomNavigation,
  type BottomNavigationProps,
} from './BottomNavigation';
import { TopAppbar, type TopAppbarProps } from './TopAppbar';
import { useKeyboard } from '../hooks/useKeyboard';
import { View, type ViewProps } from './View';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ScreenProps extends PropsWithChildren<ViewProps> {
  topAppbar?: TopAppbarProps;
  bottomNavigation?: BottomNavigationProps;
  bottomAppbar?: BottomAppbarProps;
}

export function Screen(props: ScreenProps) {
  const {
    bottomAppbar,
    bottomNavigation,
    topAppbar,
    children,
    ...restOfProps
  } = props;
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  // const theme = useTheme();

  return (
    <>
      {!!topAppbar && <TopAppbar {...topAppbar} />}
      <View
        grows
        {...restOfProps}
        style={{
          paddingTop: topAppbar ? undefined : insets.top,
          ...(restOfProps.style as any),
        }}
      >
        {children}
      </View>
      {!!bottomAppbar && !keyboard.shown && <BottomAppbar {...bottomAppbar} />}
      {!!bottomNavigation && !keyboard.shown && (
        <BottomNavigation {...bottomNavigation} />
      )}
    </>
  );
}
