/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useTheme } from 'theme-native';

import { Button } from './Button';
import { Columns } from './Columns';
import { Rows } from './Rows';
import {
  BottomNavigationItem,
  type BottomNavigationAction,
} from './BottomNavigationItem';

export interface BottomNavigationProps {
  actions?: BottomNavigationAction[];
  primary?: Omit<BottomNavigationAction, 'label'>;
}

export function BottomNavigation(props: BottomNavigationProps) {
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
      <Columns alignX="left" alignY="center" gap={0.5} grows>
        {actions?.map((action, actionIndex) => (
          <BottomNavigationItem {...action} key={actionIndex} />
        ))}
      </Columns>
      {!!primary && (
        <Rows
          style={{
            flexBasis: '30%',
          }}
          alignX="right"
        >
          <Button
            {...primary}
            icon={primary.icon}
            shape="pill"
            colorVariant={600}
            darkColorVariant={600}
            darkColor={'Primary'}
            textColor={theme.color.White}
            darkTextColor={theme.color.White}
            onPress={primary.onPress}
          />
        </Rows>
      )}
    </Columns>
  );
}
