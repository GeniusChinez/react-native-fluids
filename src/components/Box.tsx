import React from 'react';
import { Surface, type SurfaceProps } from './Surface';
import { Rows, type RowsProps } from './Rows';
import { Columns, type ColumnsProps } from './Columns';
import { View, type ViewProps } from './View';

export type BoxProps =
  | ({ surface: true } & SurfaceProps)
  | ({ rows: true } & RowsProps)
  | ({ columns: true } & ColumnsProps)
  | ViewProps;

export function Box(props: BoxProps) {
  return (
    <>
      {'surface' in props && props.surface ? (
        <Surface {...props} />
      ) : 'rows' in props && props.rows ? (
        <Rows {...props} />
      ) : 'columns' in props && props.columns ? (
        <Columns {...props} />
      ) : (
        <View {...props} />
      )}
    </>
  );
}
