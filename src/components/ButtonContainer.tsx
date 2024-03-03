import React from 'react';
import { Box, type BoxProps } from './Box';

export function ButtonContainer(props: BoxProps) {
  const { children, ...restOfProps } = props;
  return (
    <Box
      w="Full"
      gap={2}
      {...restOfProps}
      md={{
        ...restOfProps.md,
        style: {
          maxWidth: 300,
          marginHorizontal: 'auto',
          ...(restOfProps.md?.style as any),
        },
      }}
    >
      {children}
    </Box>
  );
}
