/* eslint-disable eslint-comments/no-unlimited-disable */
import React, { type PropsWithChildren, useCallback } from 'react';
import { BottomSheetsProvider } from './BottomSheetsProvider';
import { useBottomSheets } from './BottomSheetsProvider';

export interface BlankSheetProps extends PropsWithChildren<{}> {
  height?: number;
}

export function BlankSheet__(props: BlankSheetProps) {
  const { height = 50, children } = props;

  const sheets = useBottomSheets();

  // eslint-disable-next-line
  const open = useCallback(() => {
    sheets.open({
      height,
      content: children,
    });
  }, [children, height, sheets]);

  return <BottomSheetsProvider>{children}</BottomSheetsProvider>;
}
