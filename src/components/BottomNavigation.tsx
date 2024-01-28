/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useTheme } from 'theme-native';

import { Button } from './Button';
import { Columns } from './Columns';
import { Icon, type IconType } from './Icon';
import { Text } from './Text';
import { Rows } from './Rows';
import { TouchableOpacity } from 'react-native';
import { View } from './View';

type Action = {
  icon: IconType;
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
};

export interface BottomNavigationProps {
  actions?: Action[];
  primary?: Omit<Action, 'label'>;
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
          // <Button
          //   key={actionIndex}
          //   icon={action.icon}
          //   variant="solid"
          //   darkColor={'Stone'}
          //   colorVariant={200}
          //   darkColorVariant={800}
          //   textColor={theme.color.Gray[700]}
          //   color={'Gray'}
          //   onPress={action.onPress}
          // />
          <TouchableOpacity
            key={actionIndex}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Rows alignX="center" alignY="center">
              <View
                bg={action.isSelected ? theme.color.Gray[200] : undefined}
                px={4}
                py={1.5}
                style={{
                  borderRadius: theme.borderRadius['2xl'],
                }}
              >
                <Icon
                  name={action.icon}
                  color={
                    action.isSelected
                      ? theme.color.Primary[700]
                      : theme.color.Gray[700]
                  }
                />
              </View>
              <Text
                size="sm"
                color={
                  action.isSelected
                    ? theme.color.Primary[700]
                    : theme.color.Gray[700] // maybe lower the opacity if inactive?
                }
              >
                {action.label}
              </Text>
            </Rows>
          </TouchableOpacity>
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
            icon={primary.icon}
            shape="square"
            colorVariant={200}
            darkColorVariant={800}
            darkColor={'Stone'}
            textColor={theme.color.Primary[700]}
            darkTextColor={theme.color.Primary[300]}
            onPress={primary.onPress}
          />
        </Rows>
      )}
    </Columns>
  );
}
