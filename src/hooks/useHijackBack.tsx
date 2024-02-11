import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export interface HijackBackProps {
  disabled?: boolean;
  enableIf?: () => boolean;
  ifNotEnabled?: () => void;
  ifEnabled?: () => void;
}

export function useHijackBack(props: HijackBackProps) {
  const { enableIf, disabled, ifNotEnabled, ifEnabled } = props;

  const hardwareBackPressCustom = useCallback(() => {
    if (disabled) {
      return true;
    }

    if (enableIf) {
      if (enableIf()) {
        if (ifEnabled) {
          ifEnabled();
          return true;
        }
        return false;
      }
      if (ifNotEnabled) {
        ifNotEnabled();
      }
      return true;
    }

    // to disable default, return true
    return false;
  }, [disabled, enableIf, ifEnabled, ifNotEnabled]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom
      );
    };
  }, [hardwareBackPressCustom]);
}
