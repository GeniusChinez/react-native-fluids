import React from 'react';
import { useBottomSheets } from '../components/BottomSheetsProvider';
import { MenuLayout } from '../components/MenuLayout';
import type { MenuTriggerProps } from '../components/MenuTrigger';
import { useBottomSheetMenuLayoutProps } from './useBottomSheetMenuLayoutProps';
import type { GestureResponderEvent } from 'react-native';

export function useMenuTriggerActions(
  args: MenuTriggerProps & {
    sheet?: { height?: number; children: React.ReactNode };
    onPress?: (event: GestureResponderEvent) => void;
  }
) {
  const { sheet, menu, onPress } = args;
  const sheets = useBottomSheets();
  const bottomSheetMenuLayoutProps = useBottomSheetMenuLayoutProps(args);

  return {
    onPress(e: GestureResponderEvent, weirdArgs?: any) {
      if (onPress) {
        onPress(e);
      }

      if (menu) {
        if (menu.inplace) {
          weirdArgs.ctx.menuActions.openMenu(menu.name);
        } else {
          sheets.open({
            scrollable: true,
            height: menu.height || 50,
            content: (
              <MenuLayout {...menu} {...bottomSheetMenuLayoutProps}>
                {menu.children}
                {menu.inject}
              </MenuLayout>
            ),
          });
        }
      }

      if (sheet) {
        sheets.open({
          height: sheet.height || 50,
          content: sheet.children,
        });
      }
    },
  };
}
