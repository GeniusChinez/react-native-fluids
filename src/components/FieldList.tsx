import React from 'react';
import { Rows, type RowsProps } from './Rows';

export interface FieldListProps extends RowsProps {}

export function FieldList(props: FieldListProps) {
  const { children, ...restOfProps } = props;
  return (
    <Rows gap={4} {...restOfProps}>
      {children}
    </Rows>
  );
}
