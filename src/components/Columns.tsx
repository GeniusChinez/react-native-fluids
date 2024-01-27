/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, type ViewProps } from './View';

export interface ColumnsProps extends ViewProps {
  alignX?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
  alignY?: 'top' | 'center' | 'bottom';
}

export function Columns(props: ColumnsProps) {
  const { alignX, alignY, style, children, ...viewProps } = props;
  return (
    <View
      {...viewProps}
      style={{
        flexDirection: 'row',
        justifyContent:
          alignX === 'center'
            ? 'center'
            : alignX === 'right'
            ? 'flex-end'
            : alignX === 'space-around'
            ? 'space-around'
            : alignX === 'space-between'
            ? 'space-between'
            : 'flex-start',
        alignItems:
          alignY === 'center'
            ? 'center'
            : alignY === 'bottom'
            ? 'flex-end'
            : 'flex-start',
        ...(style as any),
      }}
    >
      {children}
    </View>
  );
}
