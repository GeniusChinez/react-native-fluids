import React from 'react';
import { Columns, type ColumnsProps } from './Columns';
import { Rows, type RowsProps } from './Rows';
import { View, type ViewProps } from './View';
import { useTheme } from 'theme-native';

export type SurfaceProps = {} & (
  | ({ type: 'rows' } & RowsProps)
  | ({ type: 'columns' } & ColumnsProps)
  | ({ type: 'normal' } & ViewProps)
);

export function Surface(props: SurfaceProps) {
  const { type, ...restOfProps } = props;
  const theme = useTheme();

  return (
    <>
      {type === 'columns' && (
        <Columns
          p={3}
          bg={theme.color.Gray[100]}
          darkBg={theme.color.Gray[900]}
          rounded={'Md'}
          {...(restOfProps as ColumnsProps)}
        />
      )}
      {type === 'rows' && (
        <Rows
          p={3}
          bg={theme.color.Gray[100]}
          darkBg={theme.color.Gray[900]}
          rounded={'Md'}
          {...(restOfProps as RowsProps)}
        />
      )}
      {type === 'normal' && (
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
