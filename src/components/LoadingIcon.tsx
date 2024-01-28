import React from 'react';
import { useInfiniteAnimation } from '../hooks/useInfiniteAnimation';
import { Icon, type IconProps } from './Icon';
import { Animated } from 'react-native';
import { useTheme } from 'theme-native';

export interface LoadingIconArgs extends Omit<IconProps, 'name'> {}

export function LoadingIcon(props: LoadingIconArgs) {
  const { ...restOfProps } = props;
  const animation = useInfiniteAnimation({
    startingValue: 0,
    stoppingValue: 360,
  });

  const animatedRotate = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'], // Output as string with "deg" unit
  });

  const theme = useTheme();

  return (
    <Animated.View style={[{ transform: [{ rotate: animatedRotate }] }]}>
      <Icon color={theme.color.Primary[600]} {...restOfProps} name="Loader2" />
    </Animated.View>
  );
}
