/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useTheme } from 'theme-native';
import { MenuItem, type MenuLayoutItem } from './MenuLayout';

export interface CustomMenuProps extends PropsWithChildren<{}> {
  isFullWidth?: boolean;
  name?: string;
  items: MenuLayoutItem[];
}

export function CustomMenu(props: CustomMenuProps) {
  const { children, items, name, isFullWidth } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const ref = useRef<Menu>(null);

  return (
    <Menu
      style={{ width: isFullWidth ? '100%' : undefined, padding: 0, margin: 0 }}
      name={name}
      ref={ref}
    >
      <MenuTrigger
        style={{
          width: isFullWidth ? '100%' : undefined,
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={{
          backgroundColor: isDarkMode
            ? theme.color.Stone[700]
            : theme.color.White,
          borderRadius: theme.borderRadius.Md,
        }}
      >
        {items.map((option, optionIndex) => (
          <MenuOption
            onSelect={() => {
              if (option.onPress) {
                option.onPress();
              }
            }}
            key={optionIndex}
          >
            <MenuItem {...option} />
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
}
