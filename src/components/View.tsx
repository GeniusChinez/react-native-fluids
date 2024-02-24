/* eslint-disable react-native/no-inline-styles */
import React, { type ComponentProps } from 'react';
import Animated from 'react-native-reanimated';
import { BorderRadius, Height, Spacing, Width, useTheme } from 'theme-native';
import { useResponsiveProps } from '../hooks/useResponsiveProps';

export interface RawViewProps extends ComponentProps<typeof Animated.View> {
  bg?: string;
  darkBg?: string;

  p?: keyof typeof Spacing;
  px?: keyof typeof Spacing;
  pl?: keyof typeof Spacing;
  pr?: keyof typeof Spacing;
  pt?: keyof typeof Spacing;
  pb?: keyof typeof Spacing;
  py?: keyof typeof Spacing;

  m?: keyof typeof Spacing;
  mx?: keyof typeof Spacing;
  ml?: keyof typeof Spacing;
  mr?: keyof typeof Spacing;
  mt?: keyof typeof Spacing;
  mb?: keyof typeof Spacing;
  my?: keyof typeof Spacing;

  gap?: keyof typeof Spacing;
  gapx?: keyof typeof Spacing;
  gapy?: keyof typeof Spacing;

  w?: keyof typeof Width;
  h?: keyof typeof Height;

  grows?: boolean;
  growsOnly?: boolean;

  rounded?: keyof typeof BorderRadius;
}

export type ViewProps = {
  xs?: Partial<RawViewProps>;
  sm?: Partial<RawViewProps>;
  md?: Partial<RawViewProps>;
  lg?: Partial<RawViewProps>;
  xl?: Partial<RawViewProps>;
  xl2?: Partial<RawViewProps>;
} & RawViewProps;

export function View(props: ViewProps) {
  const actualProps = useResponsiveProps<RawViewProps>(props);

  const {
    bg = 'transparent',
    darkBg = 'transparent',
    style,
    p,
    px,
    pl,
    pr,
    pt,
    pb,
    py,

    m,
    mx,
    ml,
    mr,
    mt,
    mb,
    my,

    grows,
    growsOnly,

    gap,
    gapx,
    gapy,

    w,
    h,

    rounded,

    ...restOfProps
  } = actualProps;

  const theme = useTheme();
  const { isDarkMode, spacing, width, height, borderRadius } = theme;

  return (
    <Animated.View
      style={{
        backgroundColor: isDarkMode ? darkBg : bg,

        padding: p ? spacing[p] : undefined,
        paddingHorizontal: px ? spacing[px] : undefined,
        paddingLeft: pl ? spacing[pl] : undefined,
        paddingRight: pr ? spacing[pr] : undefined,
        paddingTop: pt ? spacing[pt] : undefined,
        paddingBottom: pb ? spacing[pb] : undefined,
        paddingVertical: py ? spacing[py] : undefined,

        margin: m ? spacing[m] : undefined,
        marginHorizontal: mx ? spacing[mx] : undefined,
        marginLeft: ml ? spacing[ml] : undefined,
        marginRight: mr ? spacing[mr] : undefined,
        marginTop: mt ? spacing[mt] : undefined,
        marginBottom: mb ? spacing[mb] : undefined,
        marginVertical: my ? spacing[my] : undefined,

        flex: grows ? 1 : undefined,
        flexGrow: growsOnly ? 1 : undefined,

        gap: gap ? spacing[gap] : undefined,
        rowGap: gapy ? spacing[gapy] : undefined,
        columnGap: gapx ? spacing[gapx] : undefined,

        width: w ? width[w] : undefined,
        height: h ? height[h] : undefined,

        borderRadius: rounded ? borderRadius[rounded] : undefined,

        ...(style as any),
      }}
      {...restOfProps}
    />
  );
}
