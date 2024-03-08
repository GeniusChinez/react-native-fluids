/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { PropsWithChildren } from 'react';
import { Box, type BoxProps } from './Box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function FullScreenOverlay(
  props: PropsWithChildren<
    BoxProps & {
      opacity?: number;
    }
  >
) {
  const { children, opacity = 0.95, ...restOfProps } = props;
  const insets = useSafeAreaInsets();

  return (
    <Box
      {...restOfProps}
      style={{
        backgroundColor: `rgba(52, 52, 52, ${opacity})`,
        paddingTop: insets.top,
        paddingEnd: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 297_483_947,
        ...(restOfProps.style as any),
      }}
    >
      {children}
    </Box>
  );
}
