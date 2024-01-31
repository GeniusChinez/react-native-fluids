import { useMemo } from 'react';
import type { BottomAppbarProps } from '../components/BottomAppbar';

export function useBottomAppbar(args?: BottomAppbarProps) {
  return useMemo(() => args, [args]);
}
