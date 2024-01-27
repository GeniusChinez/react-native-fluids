/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, type ViewProps } from './View';

export interface RowsProps extends ViewProps {
  align?: 'top' | 'center' | 'bottom' | 'space-between' | 'space-around';
}

export function Rows(props: RowsProps) {
  const { align, style, children, ...viewProps } = props;
  return (
    <View
      {...viewProps}
      style={{
        flexDirection: 'column',
        justifyContent:
          align === 'center'
            ? 'center'
            : align === 'bottom'
            ? 'flex-end'
            : align === 'space-around'
            ? 'space-around'
            : align === 'space-between'
            ? 'space-between'
            : 'flex-start',
        ...(style as any),
      }}
    >
      {children}
    </View>
  );
}
