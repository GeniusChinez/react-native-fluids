import { useMemo } from 'react';
import type { BottomAppbarProps } from '../components/BottomAppbar';
import type { BottomNavigationProps } from '../components/BottomNavigation';
import { useBottomAppbar } from './useBottomAppbar';
import { useBottomNavigation } from './useBottomNavigation';

interface Args {
  bottomAppbar?: BottomAppbarProps;
  bottomNavigation?: BottomNavigationProps;
}

export function useScreen(args: Args) {
  const bottomAppbar = useBottomAppbar(args.bottomAppbar);
  const bottomNavigation = useBottomNavigation(args.bottomNavigation);

  return useMemo(
    () => ({
      bottomAppbar,
      bottomNavigation,
      darkBg: 'black',
    }),
    [bottomAppbar, bottomNavigation]
  );
}
