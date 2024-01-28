import React from 'react';
import type { PropsWithChildren } from 'react';
import { useTheme } from 'theme-native';
import { View } from './View';
import { Text } from './Text';
import { Icon } from './Icon';
import { Columns } from './Columns';

export interface BulletPointProps extends PropsWithChildren<{}> {}

export function BulletPoint(props: BulletPointProps) {
  const { children } = props;
  const theme = useTheme();

  return (
    <Columns gap={3} alignX="left" alignY="center">
      <Icon name="Squircle" size={22} color={theme.color.Gray[500]} />
      <View grows>
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
    </Columns>
  );
}
