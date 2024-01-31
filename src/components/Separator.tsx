/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useTheme } from 'theme-native';
import { View, type ViewProps } from './View';
import { Text, type TextProps } from './Text';

export interface SeparatorProps extends ViewProps {
  tweenText?: TextProps;
}

export function Separator(props: SeparatorProps) {
  const { tweenText } = props;
  const theme = useTheme();

  const instanceOf = (
    <View
      bg={theme.color.Gray[200]}
      darkBg="rgba(255,255,255,0.1)"
      {...props}
      style={{
        height: 1,
        ...(props.style as any),
      }}
    />
  );

  return (
    <>
      {!tweenText && instanceOf}
      {!!tweenText && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing[2],
          }}
        >
          {instanceOf}
          <Text {...tweenText} />
          {instanceOf}
        </View>
      )}
    </>
  );
}
