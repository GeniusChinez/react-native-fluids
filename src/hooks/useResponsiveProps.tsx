import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';

type Responsive<T> = {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xl2?: T;
};

export function useResponsiveProps<PropsT extends { style?: any }>(
  props: PropsT & Responsive<PropsT>
) {
  const {
    sm: smProps,
    md: mdProps,
    lg: lgProps,
    xl: xlProps,
    xl2: xl2Props,
    style: style_,
    ...usefulProps
  } = props;

  const { sm, md, lg, xl, xl2 } = useMediaQuery();
  return useMemo(() => {
    let result = { ...usefulProps, style: style_ };
    if (sm) {
      result = {
        ...result,
        ...smProps,
        style: { ...(result.style as any), ...(smProps?.style as any) },
      };
    }
    if (md) {
      result = {
        ...result,
        ...mdProps,
        style: { ...(result.style as any), ...(mdProps?.style as any) },
      };
    }
    if (lg) {
      result = {
        ...result,
        ...lgProps,
        style: { ...(result.style as any), ...(lgProps?.style as any) },
      };
    }
    if (xl) {
      result = {
        ...result,
        ...xlProps,
        style: { ...(result.style as any), ...(xlProps?.style as any) },
      };
    }
    if (xl2) {
      result = {
        ...result,
        ...xl2Props,
        style: { ...(result.style as any), ...(xl2Props?.style as any) },
      };
    }
    return result as PropsT;
  }, [
    lg,
    lgProps,
    md,
    mdProps,
    sm,
    smProps,
    style_,
    usefulProps,
    xl,
    xl2,
    xl2Props,
    xlProps,
  ]);
}
