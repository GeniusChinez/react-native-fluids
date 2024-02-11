import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export interface HijackBackProps {
  disabled?: boolean;
  enableIf?: () => boolean;
  ifNotEnabled?: () => void;
}

export function useHijackBack(props: HijackBackProps) {
  const { enableIf, disabled, ifNotEnabled } = props;

  const hardwareBackPressCustom = useCallback(() => {
    if (disabled) {
      return true;
    }

    if (enableIf) {
      if (enableIf()) {
        return false;
      }
      if (ifNotEnabled) {
        ifNotEnabled();
      }
      return true;
    }

    // to disable default, return true
    return false;
  }, [disabled, enableIf, ifNotEnabled]);

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
