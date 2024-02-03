/* eslint-disable react-native/no-inline-styles */
import { useTheme } from 'theme-native';
import { Text } from './Text';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from './View';
import { Rows } from './Rows';
import type { ButtonProps } from './Button';
import { Icon, type IconType } from './Icon';
import { useBottomSheetTrigger } from '../hooks/useBottomSheetTrigger';
import { SheetMenu } from './SheetMenu';

export interface BottomNavigationAction extends ButtonProps {
  icon: IconType;
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
  menu?: ButtonProps['menu'];
}

export interface BottomNavigationItemProps extends BottomNavigationAction {}

export function BottomNavigationItem(props: BottomNavigationItemProps) {
  const { isSelected, label, menu } = props;

  const theme = useTheme();
  const menuBottomSheet = useBottomSheetTrigger();

  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (menu) {
            menuBottomSheet.open();
          }
        }}
      >
        <Rows alignX="center" alignY="center">
          <View
            bg={isSelected ? theme.color.Gray[200] : undefined}
            darkBg={isSelected ? theme.color.Gray[800] : undefined}
            px={4}
            py={1.5}
            style={{
              borderRadius: theme.borderRadius['2xl'],
            }}
          >
            <Icon
              name={props.icon}
              darkColor={
                isSelected ? theme.color.Primary[400] : theme.color.Gray[400]
              }
              color={
                isSelected ? theme.color.Primary[700] : theme.color.Gray[700]
              }
            />
          </View>
          <Text
            size="sm"
            darkColor={
              isSelected ? theme.color.Primary[400] : theme.color.Gray[400]
            }
            color={
              isSelected ? theme.color.Primary[700] : theme.color.Gray[700] // maybe lower the opacity if inactive? // maybe lower the opacity if inactive?
            }
          >
            {label}
          </Text>
        </Rows>
      </TouchableOpacity>
      {!!menu && <SheetMenu {...menu} sheetRef={menuBottomSheet.ref} />}
    </>
  );
}
