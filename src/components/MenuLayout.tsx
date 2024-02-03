/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react';
import { Icon, type IconProps } from './Icon';
import { Text, type TextProps } from './Text';
import { Rows, type RowsProps } from './Rows';
import { TouchableOpacity } from 'react-native';
import { Columns } from './Columns';
import { View } from './View';
import { useTheme } from 'theme-native';
import { Separator } from './Separator';
import { useBottomSheets } from './BottomSheetsProvider';

export interface MenuLayoutItem {
  icon?: IconProps;
  iconPos?: 'left' | 'right';
  label: string;
  onPress?: () => void;
  labelProps?: TextProps;
  disabled?: boolean;
}

function MenuItem(props: MenuLayoutItem) {
  const {
    icon,
    iconPos = 'left',
    label,
    labelProps,
    onPress,
    disabled,
  } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Columns
        alignX="space-between"
        alignY="center"
        w={'Full'}
        p={3}
        gap={4}
        rounded="Md"
        style={{
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {!!icon && iconPos === 'left' && (
          <Icon size={19} color={theme.color.Gray[800]} {...icon} />
        )}
        <View grows>
          <Text color={theme.color.Gray[800]} {...labelProps}>
            {label}
          </Text>
        </View>
        {!!icon && iconPos === 'right' && (
          <Icon size={19} color={theme.color.Gray[800]} {...icon} />
        )}
      </Columns>
    </TouchableOpacity>
  );
}

export interface MenuLayoutProps extends RowsProps {
  groups?: {
    label?: string;
    items: MenuLayoutItem[];
  }[];
  items?: MenuLayoutItem[];
}

export function MenuLayout(props: MenuLayoutProps) {
  const { groups, items, ...restOfProps } = props;
  const theme = useTheme();
  const { close } = useBottomSheets();

  return (
    <Rows {...restOfProps} w={'Full'} gap={0}>
      {groups?.map((group, groupIndex) => (
        <Fragment key={groupIndex}>
          <Rows w={'Full'} pt={2} px={2}>
            {!!group.label && (
              <Text size={'xs'} color={theme.color.Gray[500]}>
                {group.label}
              </Text>
            )}
            <View h={1} />
            <Rows>
              {group.items.map((item, index) => (
                <Fragment key={index}>
                  <MenuItem
                    {...item}
                    onPress={() => {
                      if (item.onPress) {
                        item.onPress();
                      }
                      close();
                    }}
                  />
                  {/* <Separator w={'Full'} /> */}
                </Fragment>
              ))}
            </Rows>
          </Rows>
          {groupIndex < groups.length - 1 && (
            <View h={3} bg={theme.color.Gray[100]} w={'Full'} />
          )}
        </Fragment>
      ))}
      <Rows>
        {items?.map((item, index) => (
          <Fragment key={index}>
            <MenuItem
              {...item}
              onPress={() => {
                if (item.onPress) {
                  item.onPress();
                }
                close();
              }}
            />
            <Separator w={'Full'} />
          </Fragment>
        ))}
      </Rows>
    </Rows>
  );
}
