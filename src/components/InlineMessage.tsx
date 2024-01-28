import React from 'react';
import { Text } from './Text';
import { View } from './View';
import { useTheme } from 'theme-native';
import { Rows } from './Rows';
import { Columns } from './Columns';
import { Icon, type IconType } from './Icon';

export interface InlineMessageProps {
  icon?: IconType;
  color: keyof ReturnType<typeof useTheme>['color'];
  text?: string;
  children?: string;
}

export function InlineMessage(props: InlineMessageProps) {
  const theme = useTheme();
  const { color, icon = 'BellRing', text, children } = props;

  return (
    <View
      bg={theme.color[color][100]}
      darkBg={theme.color[color][950]}
      p={4}
      style={{
        borderRadius: theme.borderRadius.Lg,
      }}
    >
      <Columns alignY="center" gap={3}>
        {!!icon && (
          <View>
            <Icon
              name={icon}
              color={theme.color[color][700]}
              darkColor={theme.color[color][300]}
              strokeWidth={2}
              size={23}
            />
          </View>
        )}
        <Rows alignY="center" grows>
          <Text
            weight="Semibold"
            color={theme.color[color][700]}
            darkColor={theme.color[color][300]}
          >
            {children || text}
          </Text>
        </Rows>
      </Columns>
    </View>
  );
}
