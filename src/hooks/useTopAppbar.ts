import { useMemo } from 'react';
import type { TopAppbarProps } from '../components/TopAppbar';

export function useTopAppbar(args?: TopAppbarProps) {
  return useMemo(() => args, [args]);
}
