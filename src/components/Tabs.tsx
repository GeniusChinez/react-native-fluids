/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useMemo, useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'theme-native';
import { Text } from './Text';

export interface TabsProps {
  tabs?: {
    label: string;
    Component: React.ComponentType<any>;
  }[];
  defaultTab?: number;
  colors?: {
    tabLabelColor?: string;
    tabLabelDarkColor?: string;
    focusedTabLabelColor?: string;
    focusedTabLabelDarkColor?: string;
    tabbarColor?: string;
    tabbarDarkColor?: string;
    indicatorColor?: string;
    indicatorDarkColor?: string;
  };
}

export function Tabs(props: TabsProps) {
  const { tabs, defaultTab = 0, colors } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const [tabIndex, setTabIndex] = useState(defaultTab);
  const layout = useWindowDimensions();

  const tabRoutes = useMemo(
    () =>
      tabs?.map((tab) => ({
        key: tab.label,
        title: tab.label,
      })) ?? [],
    [tabs]
  );

  const sceneMapArg = useMemo(() => {
    const result = {} as { [key: string]: React.ComponentType<unknown> };
    for (const tab of tabs || []) {
      result[tab.label] = tab.Component;
    }
    return result;
  }, [tabs]);

  const renderScene = useMemo(() => SceneMap(sceneMapArg), [sceneMapArg]);

  const renderTabBar = (tabbarProps: any) => (
    <TabBar
      {...tabbarProps}
      indicatorStyle={{
        backgroundColor: isDarkMode
          ? colors?.indicatorDarkColor ?? theme.color.Primary[600]
          : colors?.indicatorColor ?? theme.color.Primary[600],
      }}
      renderLabel={(scene) => (
        <Text
          color={
            scene.focused
              ? colors?.focusedTabLabelColor ?? theme.color.Primary[700]
              : colors?.tabLabelColor ?? theme.color.Slate[700]
          }
          darkColor={
            scene.focused
              ? colors?.focusedTabLabelDarkColor ?? theme.color.Primary[400]
              : colors?.tabLabelDarkColor ?? theme.color.Slate[400]
          }
        >
          {scene.route.title}
        </Text>
      )}
      style={{
        backgroundColor: isDarkMode
          ? colors?.tabbarDarkColor ?? theme.color.Stone[900]
          : colors?.tabbarColor ?? theme.color.Transparent,
        boxShadow: 'none',
      }}
    />
  );
  return (
    <TabView
      navigationState={{ index: tabIndex, routes: tabRoutes }}
      renderScene={renderScene}
      style={{ flex: 1 }}
      renderTabBar={renderTabBar}
      onIndexChange={setTabIndex}
      pagerStyle={{
        backgroundColor: isDarkMode
          ? theme.color.Black
          : theme.color.Transparent,
      }}
      initialLayout={{ width: layout.width }}
    />
  );
}
