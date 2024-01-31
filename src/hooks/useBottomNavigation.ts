import { useMemo } from 'react';
import type { BottomNavigationProps } from '../components/BottomNavigation';

export function useBottomNavigation(args?: BottomNavigationProps) {
  return useMemo(() => args, [args]);
}
