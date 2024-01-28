/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from './Text';
import { useTheme } from 'theme-native';
import { StatusBar } from 'react-native';
import { Rows } from './Rows';
import { Columns } from './Columns';
import { Button } from './Button';
import type { IconType } from './Icon';

export type AppbarIcon = {
  icon: IconType;
  onPress?: () => void;
};

interface AppbarContent {
  textColor?: string;
  headline: string;
  subheadline?: string;
  darkTextColor?: string;
}

interface CenterAlignedTopAppbarContentProps extends AppbarContent {
  type: 'center-aligned';
  leadingIcon?: AppbarIcon;
  trailingIcon?: AppbarIcon;
}

interface TypicalAppbarContent extends AppbarContent {
  leadingIcon?: AppbarIcon;
  trailingIcons?: AppbarIcon[];
  textColor?: string;
  darkTextColor?: string;
}

interface SmallTopAppbarContentProps
  extends Omit<TypicalAppbarContent, 'subheadline'> {
  type: 'small';
}
interface MediumTopAppbarContentProps
  extends Omit<TypicalAppbarContent, 'subheadline'> {
  type: 'medium';
}
interface LargeTopAppbarContentProps extends TypicalAppbarContent {
  type: 'large';
}

export interface TopAppbarProps {
  bg?: string;
  darkBg?: string;
  isDark?: boolean;
  textColor?: string;
  darkTextColor?: string;
  layout:
    | CenterAlignedTopAppbarContentProps
    | SmallTopAppbarContentProps
    | MediumTopAppbarContentProps
    | LargeTopAppbarContentProps;
}

function CenterAlignedTopAppbarContent(
  props: CenterAlignedTopAppbarContentProps
) {
  const theme = useTheme();
  const {
    headline,
    leadingIcon,
    trailingIcon,
    textColor = theme.color.Gray[700],
    darkTextColor = theme.color.Gray[300],
  } = props;

  return (
    <Columns
      grows
      alignY="center"
      alignX="space-between"
      px={2}
      w={'Full'}
      gap={1}
    >
      <Rows
        alignX="left"
        style={{
          flexBasis: theme.width[14],
        }}
      >
        {!!leadingIcon && (
          <Button
            icon={leadingIcon.icon}
            onPress={leadingIcon.onPress}
            textColor={textColor}
            darkTextColor={darkTextColor}
            variant="ghost"
          />
        )}
      </Rows>
      <Rows grows alignX="center" alignY="center">
        <Text
          size={'lg'}
          numberOfLines={1}
          color={textColor}
          darkColor={darkTextColor}
        >
          {headline}
        </Text>
      </Rows>
      <Rows
        alignX="right"
        pr={2}
        style={{
          flexBasis: theme.width[14],
        }}
      >
        {!!trailingIcon && (
          <Button
            icon={trailingIcon.icon}
            onPress={trailingIcon.onPress}
            textColor={textColor}
            darkTextColor={darkTextColor}
            variant="ghost"
          />
        )}
      </Rows>
    </Columns>
  );
}

function SmallTopAppbarContent(props: SmallTopAppbarContentProps) {
  const theme = useTheme();
  const {
    headline,
    leadingIcon,

    trailingIcons,
    textColor = theme.color.Gray[700],
    darkTextColor = theme.color.Gray[300],
  } = props;

  return (
    <Columns
      grows
      alignY="center"
      alignX="space-between"
      px={2}
      w={'Full'}
      gap={1}
    >
      <Rows
        alignX="left"
        style={{
          flexBasis: theme.width[14],
        }}
      >
        {!!leadingIcon && (
          <Button
            icon={leadingIcon.icon}
            onPress={leadingIcon.onPress}
            textColor={textColor}
            darkTextColor={darkTextColor}
            variant="ghost"
          />
        )}
      </Rows>
      <Rows grows alignX="left" alignY="center">
        <Text
          size={'lg'}
          numberOfLines={1}
          color={textColor}
          darkColor={darkTextColor}
        >
          {headline}
        </Text>
      </Rows>

      {!!trailingIcons && (
        <Columns alignX="right" gap={1} pr={2}>
          {trailingIcons.map((trailingIcon, trailingIconIndex) => (
            <Button
              key={trailingIconIndex}
              icon={trailingIcon.icon}
              onPress={trailingIcon.onPress}
              textColor={textColor}
              darkTextColor={darkTextColor}
              variant="ghost"
              isCompact
            />
          ))}
        </Columns>
      )}
    </Columns>
  );
}
function MediumTopAppbarContent(props: MediumTopAppbarContentProps) {
  const theme = useTheme();
  const {
    headline,
    leadingIcon,

    trailingIcons,
    textColor = theme.color.Gray[700],
    darkTextColor = theme.color.Gray[300],
  } = props;

  return (
    <Rows>
      <Columns
        grows
        alignY="center"
        alignX="space-between"
        px={2}
        w={'Full'}
        gap={1}
      >
        <Rows
          alignX="left"
          style={{
            flexBasis: theme.width[14],
          }}
        >
          {!!leadingIcon && (
            <Button
              icon={leadingIcon.icon}
              onPress={leadingIcon.onPress}
              textColor={textColor}
              darkTextColor={darkTextColor}
              variant="ghost"
            />
          )}
        </Rows>

        {!!trailingIcons && (
          <Columns alignX="right" gap={1} pr={2}>
            {trailingIcons.map((trailingIcon, trailingIconIndex) => (
              <Button
                key={trailingIconIndex}
                icon={trailingIcon.icon}
                onPress={trailingIcon.onPress}
                textColor={textColor}
                darkTextColor={darkTextColor}
                variant="ghost"
                isCompact
              />
            ))}
          </Columns>
        )}
      </Columns>
      <Rows grows alignX="left" alignY="center" px={5}>
        <Text
          size={'lg'}
          numberOfLines={1}
          color={textColor}
          darkColor={darkTextColor}
        >
          {headline}
        </Text>
      </Rows>
    </Rows>
  );
}
function LargeTopAppbarContent(props: LargeTopAppbarContentProps) {
  const theme = useTheme();
  const {
    headline,
    subheadline,
    leadingIcon,

    trailingIcons,
    textColor = theme.color.Gray[700],
    darkTextColor = theme.color.Gray[300],
  } = props;

  return (
    <Rows>
      <Columns
        grows
        alignY="center"
        alignX="space-between"
        px={2}
        w={'Full'}
        gap={1}
      >
        <Rows
          alignX="left"
          style={{
            flexBasis: theme.width[14],
          }}
        >
          {!!leadingIcon && (
            <Button
              icon={leadingIcon.icon}
              onPress={leadingIcon.onPress}
              textColor={textColor}
              darkTextColor={darkTextColor}
              variant="ghost"
            />
          )}
        </Rows>

        {!!trailingIcons && (
          <Columns alignX="right" gap={1} pr={2}>
            {trailingIcons.map((trailingIcon, trailingIconIndex) => (
              <Button
                key={trailingIconIndex}
                icon={trailingIcon.icon}
                onPress={trailingIcon.onPress}
                textColor={textColor}
                darkTextColor={darkTextColor}
                variant="ghost"
                isCompact
              />
            ))}
          </Columns>
        )}
      </Columns>
      <Rows grows alignX="left" alignY="center" px={5}>
        <Text
          size={subheadline ? 'xl' : 'lg'}
          numberOfLines={1}
          color={textColor}
          darkColor={darkTextColor}
        >
          {headline}
        </Text>
        {!!subheadline && (
          <Text
            size={'sm'}
            numberOfLines={1}
            color={textColor}
            darkColor={darkTextColor}
            style={{
              opacity: 0.7,
            }}
          >
            {subheadline}
          </Text>
        )}
      </Rows>
    </Rows>
  );
}

export function TopAppbar(props: TopAppbarProps) {
  const theme = useTheme();

  const { isDark, bg = theme.color.Gray[100], darkBg, layout } = props;

  return (
    <Rows
      bg={bg}
      darkBg={darkBg}
      w={'Full'}
      h={layout.type === 'medium' ? 24 : layout.type === 'large' ? 32 : 16}
      alignY="bottom"
    >
      <StatusBar
        backgroundColor={bg}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      {layout?.type === 'center-aligned' && (
        <CenterAlignedTopAppbarContent {...props} {...layout} />
      )}
      {layout?.type === 'small' && (
        <SmallTopAppbarContent {...props} {...layout} />
      )}
      {layout?.type === 'medium' && (
        <MediumTopAppbarContent {...props} {...layout} />
      )}
      {layout?.type === 'large' && (
        <LargeTopAppbarContent {...props} {...layout} />
      )}
    </Rows>
  );
}
