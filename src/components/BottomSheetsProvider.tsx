import React, { useContext, useRef, useState } from 'react';
import {
  createContext,
  useMemo,
  type PropsWithChildren,
  useCallback,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useTheme } from 'theme-native';
import { View } from './View';
import { Dimensions } from 'react-native';

export type BottomSheetArgs = {
  height?: number;
  scrollable?: boolean;
  panToClose?: boolean;
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
  const [scrollable, setScrollable] = useState(false);
  const [panToClose, setPanToClose] = useState(true);

  const close = useCallback(() => {
    if (ref?.current) {
      setContent(null);
      setScrollable(false);
      setPanToClose(true);
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
      setScrollable(args.scrollable || false);
      setPanToClose(args.panToClose === undefined ? true : args.panToClose);

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
        onPress={() => close()}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [close]
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
          borderRadius: theme.borderRadius.Xl,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode
            ? theme.color.Stone[300]
            : theme.color.Gray[400],
        }}
        backgroundStyle={{
          backgroundColor: isDarkMode
            ? theme.color.Stone[800]
            : theme.color.White,
        }}
        ref={ref}
        index={-1}
        enableContentPanningGesture={panToClose}
        snapPoints={['1%', `${height || 50}%`]}
        backdropComponent={renderBackdrop}
        onChange={(pos) => {
          if (pos === 0) {
            close();
          }
        }}
        // animateOnMount
      >
        {scrollable ? (
          <BottomSheetScrollView>
            <View style={{ height: Dimensions.get('screen').height }}>
              {content}
            </View>
          </BottomSheetScrollView>
        ) : (
          content
        )}
      </BottomSheet>
    </BottomSheetsContext.Provider>
  );
}

export function useBottomSheets() {
  return useContext(BottomSheetsContext);
}
