import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';
import type { ResponsiveProps } from '../components/Responsive';

export function useResponsiveProps<PropsT extends { style?: any }>(
  props: ResponsiveProps<PropsT>
) {
  const {
    xs: xsProps,
    sm: smProps,
    md: mdProps,
    lg: lgProps,
    xl: xlProps,
    xl2: xl2Props,
    style: style_,
    ...usefulProps
  } = props;

  const { xs, sm, md, lg, xl, xl2 } = useMediaQuery();
  return useMemo(() => {
    let result = { ...usefulProps, style: style_ };
    if (xs) {
      result = {
        ...result,
        ...xsProps,
        style: { ...(result.style as any), ...(xsProps?.style as any) },
      };
    }
    if (sm) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        style: { ...(result.style as any), ...(smProps?.style as any) },
      };
    }
    if (md) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        ...mdProps,
        style: { ...(result.style as any), ...(mdProps?.style as any) },
      };
    }
    if (lg) {
      result = {
        ...result,
        ...xsProps,
        ...smProps,
        ...mdProps,
        ...lgProps,
        style: { ...(result.style as any), ...(lgProps?.style as any) },
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
        style: { ...(result.style as any), ...(xlProps?.style as any) },
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
    xs,
    xsProps,
  ]);
}
