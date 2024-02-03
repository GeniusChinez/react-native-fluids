/* eslint-disable eslint-comments/no-unlimited-disable */
import React, { useMemo, type RefObject } from 'react';
import { MenuLayout, type MenuLayoutProps } from './MenuLayout';
import { type BottomSheetRef } from 'react-native-sheet';
import { useRef } from 'react';
import { View } from './View';
import { BlankSheet } from './BlankSheet';
import { useTheme } from 'theme-native';

export interface SheetMenuProps extends MenuLayoutProps {
  height?: number;
  sheetRef?: RefObject<BottomSheetRef>;
}

export function SheetMenu(props: SheetMenuProps) {
  const { height = 200, sheetRef, ...menuProps } = props;
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const ref = useMemo(() => sheetRef || bottomSheetRef, [sheetRef]);

  const theme = useTheme();

  // we are on the right tract...it's just wrong, that's all
  // eslint-disable-next-line
  const promosedMenuHeight = useMemo(() => {
    const numberOfGroups = menuProps.groups?.length || 0;
    const numberOfItems =
      menuProps.groups?.reduce((prev, curr) => prev + curr.items.length, 0) ||
      menuProps.items?.length ||
      0;
    return (
      theme.fontSize.base * numberOfItems +
      theme.height[3] * numberOfGroups +
      (theme.spacing[2] +
        theme.height[1] +
        theme.fontSize.xs +
        theme.spacing[3] +
        theme.fontSize.base) *
        numberOfGroups +
      (menuProps.items ? menuProps.items.length : 0)
    );
  }, [
    menuProps.groups,
    menuProps.items,
    theme.fontSize.base,
    theme.fontSize.xs,
    theme.height,
    theme.spacing,
  ]);

  return (
    <BlankSheet height={height || 200} sheetRef={ref}>
      <View grows>
        <MenuLayout {...menuProps} />
      </View>
    </BlankSheet>
  );
}
