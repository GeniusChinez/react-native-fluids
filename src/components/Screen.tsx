import React, { type PropsWithChildren } from 'react';
import { BottomAppbar, type BottomAppbarProps } from './BottomAppbar';
import {
  BottomNavigation,
  type BottomNavigationProps,
} from './BottomNavigation';
import { TopAppbar, type TopAppbarProps } from './TopAppbar';
import { useKeyboard } from '../hooks/useKeyboard';

export interface ScreenProps extends PropsWithChildren<{}> {
  topAppbar?: TopAppbarProps;
  bottomNavigation?: BottomNavigationProps;
  bottomAppbar?: BottomAppbarProps;
}

export function Screen(props: ScreenProps) {
  const { bottomAppbar, bottomNavigation, topAppbar, children } = props;
  const keyboard = useKeyboard();
  // const theme = useTheme();

  return (
    <>
      {!!topAppbar && <TopAppbar {...topAppbar} />}
      {children}
      {!!bottomAppbar && !keyboard.shown && <BottomAppbar {...bottomAppbar} />}
      {!!bottomNavigation && !keyboard.shown && (
        <BottomNavigation {...bottomNavigation} />
      )}
    </>
  );
}
