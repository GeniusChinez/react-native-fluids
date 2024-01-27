import React from 'react';
import { View as ReactNativeView } from 'react-native';
import type { TextProps as ReactNativeTextProps } from 'react-native';
import { Spacing, useTheme } from 'theme-native';

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
    ...restOfProps
  } = props;

  const theme = useTheme();

  const { isDarkMode, spacing } = theme;

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

        ...(style as any),
      }}
      {...restOfProps}
    />
  );
}
