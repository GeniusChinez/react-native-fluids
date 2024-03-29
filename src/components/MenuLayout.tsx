/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react';
import { Icon, type IconProps } from './Icon';
import { Text, type TextProps } from './Text';
import { Rows, type RowsProps } from './Rows';
import { Columns } from './Columns';
import { View } from './View';
import { useTheme } from 'theme-native';
import { useBottomSheets } from './BottomSheetsProvider';
import { TouchableOpacity } from 'react-native';

export interface MenuLayoutItem {
  icon?: IconProps;
  iconPos?: 'left' | 'right';
  label: string;
  onPress?: () => void;
  labelProps?: TextProps;
  disabled?: boolean;
}

export function MenuItem(props: MenuLayoutItem) {
  const {
    icon,
    iconPos = 'left',
    label,
    labelProps,
    onPress,
    disabled,
  } = props;
  const theme = useTheme();
  const { isDarkMode } = theme;

  const stuff = (
    <Columns
      alignX="space-between"
      alignY="center"
      w={'Full'}
      p={3}
      py={4}
      bg={isDarkMode ? theme.color.Stone[700] : theme.color.White}
      gap={4}
      rounded="Md"
      style={{
        opacity: disabled ? 0.5 : 1,
        borderBottomColor: isDarkMode
          ? theme.color.Stone[600]
          : theme.color.Gray[100],
        borderBottomWidth: theme.borderWidth.Default,
      }}
    >
      {!!icon && iconPos === 'left' && (
        <Icon
          size={19}
          color={theme.color.Gray[800]}
          darkColor={theme.color.Gray[300]}
          {...icon}
        />
      )}
      <Rows grows alignY="center">
        <Text color={theme.color.Gray[800]} {...labelProps}>
          {label}
        </Text>
      </Rows>
      {!!icon && iconPos === 'right' && (
        <Icon
          size={19}
          color={theme.color.Gray[800]}
          darkColor={theme.color.Gray[300]}
          {...icon}
        />
      )}
    </Columns>
  );

  return (
    <>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>{stuff}</TouchableOpacity>
      ) : (
        <View w={'Full'}>{stuff}</View>
      )}
    </>
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
            <Rows pb={2}>
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
          </Fragment>
        ))}
      </Rows>
    </Rows>
  );
}
