import React from 'react';
import { useTheme } from 'theme-native';

import { Button, type ButtonProps } from './Button';
import { Columns } from './Columns';
import type { IconType } from './Icon';

interface Action extends ButtonProps {
  icon: IconType;
}

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
            {...action}
            key={actionIndex}
            variant="solid"
            darkColor={'Stone'}
            colorVariant={200}
            darkColorVariant={800}
            textColor={theme.color.Gray[700]}
            color={'Gray'}
          />
        ))}
      </Columns>
      {!!primary && (
        <Button
          {...primary}
          shape="pill"
          colorVariant={600}
          darkColorVariant={600}
          darkColor={'Primary'}
          textColor={theme.color.White}
          darkTextColor={theme.color.White}
        />
      )}
    </Columns>
  );
}
