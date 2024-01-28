import { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';

export interface InifiniteAnimationArgs {
  stoppingValue?: number;
  startingValue?: number;
}

export function useInfiniteAnimation(args: InifiniteAnimationArgs) {
  const { startingValue = 0, stoppingValue = 100 } = args;
  const animation = useRef(new Animated.Value(startingValue)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: stoppingValue,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [animation, stoppingValue]);

  return useMemo(() => animation, [animation]);
}
