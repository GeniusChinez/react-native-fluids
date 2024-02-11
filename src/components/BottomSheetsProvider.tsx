import React, { useContext, useRef, useState } from 'react';
import {
  createContext,
  useMemo,
  type PropsWithChildren,
  useCallback,
} from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useTheme } from 'theme-native';

export type BottomSheetArgs = {
  height?: number;
  content: React.ReactNode;
};

export interface BottomSheetsValue {
  open: (args: BottomSheetArgs) => void;
  close: () => void;
}
export const BottomSheetsContext = createContext<BottomSheetsValue>({
  open() {},
  close() {},
});

export interface BottomSheetsProviderProps extends PropsWithChildren<{}> {}

export function BottomSheetsProvider(props: BottomSheetsProviderProps) {
  const { children } = props;

  const ref = useRef<BottomSheet>(null);
  const [content, setContent] = useState<any>(null);
  const [height, setHeight] = useState(50);

  const close = useCallback(() => {
    if (ref?.current) {
      ref?.current.close();
    }
  }, [ref]);

  const open = useCallback(
    (args: BottomSheetArgs) => {
      if (!ref.current) {
        return;
      }

      setContent(args.content);
      setHeight(args.height || 50);

      ref.current.expand();
    },
    [ref]
  );

  const value = useMemo(
    () => ({
      close,
      open,
    }),
    [close, open]
  );

  const theme = useTheme();
  const { isDarkMode } = theme;

  // renders
  const renderBackdrop = useCallback(
    (props_: any) => (
      <BottomSheetBackdrop
        {...props_}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <BottomSheetsContext.Provider value={value}>
      {children}
      <BottomSheet
        style={{
          padding: theme.spacing[2],
          backgroundColor: isDarkMode
            ? theme.color.Stone[800]
            : theme.color.White,
        }}
        ref={ref}
        index={-1}
        enablePanDownToClose
        snapPoints={['1%', `${height || 50}%`]}
        backdropComponent={renderBackdrop}
        animateOnMount
        detached
      >
        {content}
      </BottomSheet>
    </BottomSheetsContext.Provider>
  );
}

export function useBottomSheets() {
  return useContext(BottomSheetsContext);
}
