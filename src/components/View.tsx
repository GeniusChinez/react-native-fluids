/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View as ReactNativeView } from 'react-native';
import type { TextProps as ReactNativeTextProps } from 'react-native';
import { Height, Spacing, Width, useTheme } from 'theme-native';

export interface ViewProps extends ReactNativeTextProps {
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
}

export function View(props: ViewProps) {
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

    ...restOfProps
  } = props;

  const theme = useTheme();

  const { isDarkMode, spacing, width, height } = theme;

  return (
    <ReactNativeView
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

        ...(style as any),
      }}
      {...restOfProps}
    />
  );
}
