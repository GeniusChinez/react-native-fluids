import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';
import type { ResponsiveProps } from '../components/Responsive';

export function useResponsivePropsWithoutStyle<PropsT>(
  props: ResponsiveProps<PropsT>
) {
  const {
    xs: xsProps,
    sm: smProps,
    md: mdProps,
    lg: lgProps,
    xl: xlProps,
    xl2: xl2Props,
    ...usefulProps
  } = props;

  const { xs, sm, md, lg, xl, xl2 } = useMediaQuery();
  return useMemo(() => {
    let result = { ...usefulProps };
    if (xs) {
      result = {
        ...result,
        ...xsProps,
      };
    }
    if (sm) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
      };
    }
    if (md) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        ...mdProps,
      };
    }
    if (lg) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        ...mdProps,
        ...lgProps,
      };
    }
    if (xl) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        ...mdProps,
        ...lgProps,
        ...xlProps,
      };
    }
    if (xl2) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        ...mdProps,
        ...lgProps,
        ...xlProps,
        ...xl2Props,
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
    usefulProps,
    xl,
    xl2,
    xl2Props,
    xlProps,
    xs,
    xsProps,
  ]);
}
