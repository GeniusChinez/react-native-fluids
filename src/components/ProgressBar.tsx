import React from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { useTheme } from 'theme-native';
import { View } from './View';
import { useInfiniteAnimation } from '../hooks/useInfiniteAnimation';

export interface ProgressBarProps {}

export const ProgressBar = (_props: ProgressBarProps) => {
  const w = Dimensions.get('screen').width * 0.95;
  const progressAnim = useInfiniteAnimation({
    startingValue: 0,
    stoppingValue: w,
  });

  const theme = useTheme();
  const styles = stylesGenerator(theme);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bar, { transform: [{ translateX: progressAnim }] }]}
      />
    </View>
  );
};

const stylesGenerator = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 10,
    },
    bar: {
      height: 4,
      width: 100,
      backgroundColor: theme.color.Primary[500],
      borderRadius: 10,
    },
  });
