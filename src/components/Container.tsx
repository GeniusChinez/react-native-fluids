/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { Box, type BoxProps } from './Box';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function Container(props: BoxProps) {
  const { children, ...restOfProps } = props;
  const mediaQuery = useMediaQuery();
  const maxWidth = useMemo(() => {
    if (mediaQuery.xl2) {
      return 1236;
    }
    if (mediaQuery.xl) {
      return 1080;
    }
    if (mediaQuery.lg) {
      return 850;
    }
    if (mediaQuery.md) {
      return 600;
    }
    if (mediaQuery.sm) {
      return 400;
    }
    return '100%';
  }, [mediaQuery]);

  return (
    <Box
      w="Full"
      {...restOfProps}
      style={{
        ...(restOfProps.style as any),
        maxWidth,
        marginHorizontal: 'auto',
      }}
    >
      {children}
    </Box>
  );
}
