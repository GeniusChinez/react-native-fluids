/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, type ViewProps } from './View';

export interface RowsProps extends ViewProps {
  alignY?: 'top' | 'center' | 'bottom' | 'space-between' | 'space-around';
  alignX?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
}

export function Rows(props: RowsProps) {
  const { alignY, alignX, style, children, ...viewProps } = props;
  return (
    <View
      w={'Full'}
      {...viewProps}
      style={{
        flexDirection: 'column',
        justifyContent:
          alignY === 'center'
            ? 'center'
            : alignY === 'bottom'
            ? 'flex-end'
            : alignY === 'space-around'
            ? 'space-around'
            : alignY === 'space-between'
            ? 'space-between'
            : 'flex-start',
        alignItems:
          alignX === 'center'
            ? 'center'
            : alignX === 'right'
            ? 'flex-end'
            : alignX === 'space-around'
            ? 'space-around'
            : alignX === 'space-between'
            ? 'space-between'
            : 'flex-start',
        ...(style as any),
      }}
    >
      {children}
    </View>
  );
}
