import React from 'react';
import { useTheme } from 'theme-native';

import { Button } from './Button';
import { Columns } from './Columns';
import type { IconType } from './Icon';

type Action = {
  icon: IconType;
  onPress?: () => void;
};

export interface BottomAppbarProps {
  actions?: Action[];
  primary?: Action;
}

export function BottomAppbar(props: BottomAppbarProps) {
  const { primary, actions } = props;
  const theme = useTheme();

  return (
    <Columns
      bg={theme.color.Gray[100]}
      darkBg={theme.color.Stone[900]}
      alignY="center"
      alignX="space-between"
      w={'Full'}
      style={{
        height: theme.height['20'],
      }}
      px={4}
    >
      <Columns alignX="left" alignY="center" gap={0.5}>
        {actions?.map((action, actionIndex) => (
          <Button
            key={actionIndex}
            icon={action.icon}
            variant="solid"
            darkColor={'Stone'}
            colorVariant={200}
            darkColorVariant={800}
            textColor={theme.color.Gray[700]}
            color={'Gray'}
            onPress={action.onPress}
          />
        ))}
      </Columns>
      {!!primary && (
        <Button
          icon={primary.icon}
          shape="square"
          colorVariant={200}
          darkColorVariant={800}
          darkColor={'Stone'}
          textColor={theme.color.Primary[700]}
          darkTextColor={theme.color.Primary[300]}
          onPress={primary.onPress}
        />
      )}
    </Columns>
  );
}
