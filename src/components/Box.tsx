import React from 'react';
import { Surface, type SurfaceProps } from './Surface';
import { Rows, type RowsProps } from './Rows';
import { Columns, type ColumnsProps } from './Columns';
import { View, type ViewProps } from './View';
import { useResponsiveProps } from '../hooks/useResponsiveProps';

export type RawBoxProps =
  | ({ surface: true } & SurfaceProps)
  | ({ rows: true } & RowsProps)
  | ({ columns: true } & ColumnsProps)
  | ViewProps;

export type BoxProps = {
  sm?: RawBoxProps;
  md?: RawBoxProps;
  lg?: RawBoxProps;
  xl?: RawBoxProps;
  xl2?: RawBoxProps;
} & RawBoxProps;

export function Box(props: BoxProps) {
  const actualProps = useResponsiveProps<RawBoxProps>(props);

  return (
    <>
      {'surface' in actualProps && actualProps.surface ? (
        <Surface {...actualProps} />
      ) : 'rows' in actualProps && actualProps.rows ? (
        <Rows {...actualProps} />
      ) : 'columns' in actualProps && actualProps.columns ? (
        <Columns {...actualProps} />
      ) : (
        <View {...actualProps} />
      )}
    </>
  );
}
