/* eslint-disable react-native/no-inline-styles */
import { useTheme } from 'theme-native';
import React, { useMemo, type RefObject, type PropsWithChildren } from 'react';
import { BottomSheet, type BottomSheetRef } from 'react-native-sheet';
import { useRef } from 'react';
import { BottomSheetsProvider } from './BottomSheetsProvider';
import { ScrollView } from 'react-native';

export interface BlankSheetProps extends PropsWithChildren<{}> {
  height?: number;
  sheetRef?: RefObject<BottomSheetRef>;
}

export function BlankSheet(props: BlankSheetProps) {
  const { height = 200, sheetRef, children } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const ref = useMemo(() => sheetRef || bottomSheetRef, [sheetRef]);

  return (
    <BottomSheet
      height={height || 200}
      ref={ref}
      sheetStyle={{
        padding: theme.spacing[2],
        backgroundColor: isDarkMode
          ? theme.color.Stone[800]
          : theme.color.White,
      }}
      backdropClosesSheet
    >
      <BottomSheetsProvider customRef={ref}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: theme.spacing[12],
          }}
        >
          {children}
        </ScrollView>
      </BottomSheetsProvider>
    </BottomSheet>
  );
}
