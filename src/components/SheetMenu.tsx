import React, { useMemo, type RefObject } from 'react';
import { MenuLayout, type MenuLayoutProps } from './MenuLayout';
import { type BottomSheetRef } from 'react-native-sheet';
import { useRef } from 'react';
import { View } from './View';
import { BlankSheet } from './BlankSheet';

export interface SheetMenuProps extends MenuLayoutProps {
  height?: number;
  sheetRef?: RefObject<BottomSheetRef>;
}

export function SheetMenu(props: SheetMenuProps) {
  const { height = 200, sheetRef, ...menuProps } = props;
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const ref = useMemo(() => sheetRef || bottomSheetRef, [sheetRef]);

  return (
    <BlankSheet height={height || 200} sheetRef={ref}>
      <View grows>
        <MenuLayout {...menuProps} />
      </View>
    </BlankSheet>
  );
}
