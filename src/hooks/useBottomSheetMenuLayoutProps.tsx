import type { MenuTriggerProps } from '../components/MenuTrigger';
import { useBottomSheets } from '../components/BottomSheetsProvider';

export function useBottomSheetMenuLayoutProps(args: MenuTriggerProps) {
  const { menu } = args;

  const sheets = useBottomSheets();

  return {
    items: menu?.items?.map((item) => ({
      ...item,
      onPress() {
        if (item.onPress) {
          item.onPress();
        }
        sheets.close();
      },
    })),
    groups: menu?.groups?.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        onPress() {
          if (item.onPress) {
            item.onPress();
          }
          sheets.close();
        },
      })),
    })),
  };
}
