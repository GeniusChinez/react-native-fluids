import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  createContext,
  useMemo,
  type PropsWithChildren,
  useCallback,
} from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useTheme } from 'theme-native';
import { BackHandler } from 'react-native';

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

  const isOpen = useMemo(() => !!content, [content]);

  const close = useCallback(() => {
    if (ref?.current) {
      setContent(null);
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

  const hardwareBackPressCustom = useCallback(() => {
    if (isOpen) {
      close();
      return true;
    }
    return false;
  }, [close, isOpen]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom
      );
    };
  }, [hardwareBackPressCustom]);

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
        onChange={(pos) => {
          if (pos === 0) {
            close();
          }
        }}
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
