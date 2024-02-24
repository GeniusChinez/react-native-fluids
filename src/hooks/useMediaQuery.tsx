import { useMemo } from 'react';
import { Dimensions } from 'react-native';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl2';

export function useMediaQuery() {
  const width = Dimensions.get('screen').width;

  // const xs = useMemo(() => width >= 0, [width]);
  // const sm = useMemo(() => width >= 640, [width]);
  // const md = useMemo(() => width >= 768, [width]);
  // const lg = useMemo(() => width >= 1024, [width]);
  // const xl = useMemo(() => width >= 1280, [width]);
  // const xl2 = useMemo(() => width >= 1536, [width]);

  const xs = useMemo(() => width >= 0, [width]);
  const sm = useMemo(() => width >= 400, [width]);
  const md = useMemo(() => width >= 600, [width]);
  const lg = useMemo(() => width >= 850, [width]);
  const xl = useMemo(() => width >= 1080, [width]);
  const xl2 = useMemo(() => width >= 1236, [width]);

  const breakpoint: Breakpoint = useMemo(() => {
    if (xl2) {
      return 'xl2';
    } else if (xl) {
      return 'xl';
    } else if (lg) {
      return 'lg';
    } else if (md) {
      return 'md';
    } else if (sm) {
      return 'sm';
    }
    return 'xs';
  }, [lg, md, sm, xl, xl2]);

  return useMemo(
    () => ({
      breakpoint,
      xs,
      sm,
      md,
      lg,
      xl,
      xl2,
    }),
    [breakpoint, lg, md, sm, xl, xl2, xs]
  );
}
