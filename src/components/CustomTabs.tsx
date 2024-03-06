/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState, type FC } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from 'theme-native';
import { View } from './View';
import { Text } from './Text';
import { Icon, type IconType } from './Icon';
import { Rows, type RowsProps } from './Rows';
import { useResponsiveProps } from '../hooks/useResponsiveProps';
import type { ResponsiveProps } from './Responsive';
// import {
//   Icon,
//   IconType,
//   ResponsiveProps,
//   Rows,
//   Text,
//   View,
//   useResponsiveProps,
//   useTheme,
// } from 'react-native-fluids';

export interface CustomTabButtonProps {
  name: string;
  label: string;
  isActive?: boolean;
  icon?: IconType;
  handlePress?: () => void;
  width?: number;
  notifications?: number;
  color?: string;
  darkColor?: string;
}
export function CustomTabButton(props: CustomTabButtonProps) {
  const {
    label,
    isActive,
    icon,
    handlePress,
    width = 140,
    notifications,
    color: color_,
    darkColor,
  } = props;
  const theme = useTheme();

  const { isDarkMode } = theme;
  const color = useMemo(
    () =>
      isDarkMode
        ? darkColor || theme.color.Primary[500]
        : color_ || theme.color.Primary[700],
    [color_, darkColor, isDarkMode, theme.color.Primary]
  );

  return (
    <TouchableOpacity
      style={{
        width: width === 0 ? undefined : width,
        borderRadius: theme.borderRadius.Md,
        // backgroundColor: isActive ? theme.color.Primary[100] : theme.color.Gray[100],
        borderBottomWidth: theme.borderWidth[2],
        borderBottomColor: isActive ? color : theme.color.Transparent,
        padding: theme.spacing[3],
        paddingHorizontal: width === 0 ? theme.spacing[5] : undefined,
        borderBottomEndRadius: isActive ? theme.borderRadius.None : undefined,
        borderBottomLeftRadius: isActive ? theme.borderRadius.None : undefined,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: theme.spacing[2],
      }}
      onPress={handlePress}
    >
      {!!notifications && (
        <View
          style={{
            position: 'absolute',
            top: theme.spacing[0],
            right: -3,
            width: notifications > 99 ? undefined : 23,
            height: 23,
            paddingHorizontal: notifications > 99 ? 5 : undefined,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
          rounded="Full"
          bg={color_ || theme.color.Primary[500]}
        >
          <Text color="white" size={'xs'}>
            {notifications > 99 ? '99+' : notifications}
          </Text>
        </View>
      )}
      {!!icon && (
        <Icon
          name={icon}
          color={isActive ? color : color_ || theme.color.Gray[600]}
          size={18}
        />
      )}
      <View>
        <Text
          color={isActive ? color : color_ || theme.color.Gray[600]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export interface CustomTabProps extends CustomTabButtonProps {
  element: FC;
}

export function CustomTab(_props: CustomTabProps) {}

export interface CustomTabsProps extends RowsProps {
  isScrollable?: boolean;
  tabs: CustomTabProps[];
  initialActiveTab?: string;
  tabButtonWidth?: number;
  alignButtons?: 'left' | 'center' | 'right';
}

export function CustomTabs(props_: ResponsiveProps<CustomTabsProps>) {
  const props = useResponsiveProps(props_);

  const {
    // isScrollable,
    tabs: tabs_,
    initialActiveTab,
    tabButtonWidth = 140,
    alignButtons = 'left',
    ...restOfProps
  } = props;
  const theme = useTheme();

  const tabs = (tabs_ as CustomTabsProps['tabs'])!;

  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    } else {
      setActiveTab((tabs.length ? tabs[0]?.name : '') || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialActiveTab]);

  return (
    <Rows {...restOfProps}>
      <Rows
        w="Full"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.color.Gray[200],
        }}
        alignX={alignButtons}
      >
        <FlatList
          horizontal
          data={tabs}
          renderItem={({ item }) => (
            <CustomTabButton
              width={tabButtonWidth}
              {...item}
              key={item.name}
              isActive={activeTab === item.name}
              handlePress={() => setActiveTab(item.name)}
            />
          )}
          keyExtractor={(item) => item.label}
        />
      </Rows>
      <Rows grows pt={2}>
        {activeTab
          ? (() => {
              const tab =
                tabs.find((tab_) => tab_.name === activeTab) ||
                (tabs.length ? tabs[0] : undefined);
              if (tab) {
                const Tab = tab.element;
                return <Tab />;
              }
              return null;
            })()
          : null}
      </Rows>
    </Rows>
  );
}
