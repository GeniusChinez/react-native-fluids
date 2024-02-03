import { useCallback, useMemo, useRef } from 'react';
import { type BottomSheetRef } from 'react-native-sheet';

export function useBottomSheetTrigger() {
  const ref = useRef<BottomSheetRef>(null);
  const open = useCallback(() => ref.current?.show(), []);
  const close = useCallback(() => ref.current?.hide(), []);

  return useMemo(() => ({ ref, open, close }), [close, open]);
}
