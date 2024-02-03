import React, { useContext } from 'react';
import {
  createContext,
  useMemo,
  type PropsWithChildren,
  type RefObject,
  useCallback,
} from 'react';
import type { BottomSheetRef } from 'react-native-sheet';

export interface BottomSheetsValue {
  close: () => void;
}
export const BottomSheetsContext = createContext<BottomSheetsValue>({
  close() {},
});

export interface BottomSheetsProviderProps extends PropsWithChildren<{}> {
  customRef: RefObject<BottomSheetRef>;
}

export function BottomSheetsProvider(props: BottomSheetsProviderProps) {
  const { customRef: ref, children } = props;

  const close = useCallback(() => {
    if (ref?.current) {
      ref?.current?.hide();
    }
  }, [ref]);

  const open = useCallback(() => {
    if (ref?.current) {
      ref?.current?.show();
    }
  }, [ref]);

  const value = useMemo(
    () => ({
      close,
      open,
    }),
    [close, open]
  );

  return (
    <BottomSheetsContext.Provider value={value}>
      {children}
    </BottomSheetsContext.Provider>
  );
}

export function useBottomSheets() {
  return useContext(BottomSheetsContext);
}
