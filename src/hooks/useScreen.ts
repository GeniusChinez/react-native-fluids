import { useMemo } from 'react';
import type { BottomAppbarProps } from '../components/BottomAppbar';
import type { BottomNavigationProps } from '../components/BottomNavigation';
import type { TopAppbarProps } from '../components/TopAppbar';
import { useBottomAppbar } from './useBottomAppbar';
import { useBottomNavigation } from './useBottomNavigation';
import { useTopAppbar } from './useTopAppbar';

interface Args {
  topAppbar?: TopAppbarProps;
  bottomAppbar?: BottomAppbarProps;
  bottomNavigation?: BottomNavigationProps;
}

export function useScreen(args: Args) {
  const topAppbar = useTopAppbar(args.topAppbar);
  const bottomAppbar = useBottomAppbar(args.bottomAppbar);
  const bottomNavigation = useBottomNavigation(args.bottomNavigation);

  return useMemo(
    () => ({
      topAppbar,
      bottomAppbar,
      bottomNavigation,
      darkBg: 'black',
    }),
    [bottomAppbar, bottomNavigation, topAppbar]
  );
}
