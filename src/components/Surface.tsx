import React from 'react';
import { Columns, type ColumnsProps } from './Columns';
import { Rows, type RowsProps } from './Rows';
import { View, type ViewProps } from './View';
import { useTheme } from 'theme-native';

export type SurfaceProps = {} & (
  | ({ rows: true } & RowsProps)
  | ({ columns: true } & ColumnsProps)
  | ViewProps
);

export function Surface(props: SurfaceProps) {
  const { rows, columns, ...restOfProps } = props as {
    rows?: boolean;
    columns?: boolean;
  } & SurfaceProps;

  const theme = useTheme();

  return (
    <>
      {columns && (
        <Columns
          p={3}
          bg={theme.color.Gray[100]}
          darkBg={theme.color.Gray[900]}
          rounded={'Md'}
          {...(restOfProps as ColumnsProps)}
        />
      )}
      {rows && (
        <Rows
          p={3}
          bg={theme.color.Gray[100]}
          darkBg={theme.color.Gray[900]}
          rounded={'Md'}
          {...(restOfProps as RowsProps)}
        />
      )}
      {!(rows || columns) && (
        <View
          p={3}
          bg={theme.color.Gray[100]}
          darkBg={theme.color.Gray[900]}
          rounded={'Md'}
          {...(restOfProps as ViewProps)}
        />
      )}
    </>
  );
}
