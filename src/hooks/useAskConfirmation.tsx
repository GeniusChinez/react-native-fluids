import React from 'react';
import { useCallback, useMemo } from 'react';
import { useBottomSheets } from '../components/BottomSheetsProvider';
import { Rows } from '../components/Rows';
import { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import type { ButtonProps } from '../components/Button';
import { useTheme } from 'theme-native';
import { Button } from '../components/Button';

export interface AskConfirmationArgs {
  title?: string;
  subtitle?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

export function useAskConfirmation(args: AskConfirmationArgs) {
  const { title, subtitle, confirmButtonProps, cancelButtonProps } = args;

  const sheets = useBottomSheets();
  const theme = useTheme();

  const confirm = useCallback(() => {
    sheets.open({
      height: 40,
      content: (
        <Rows
          gap={8}
          p={4}
          py={6}
          grows
          alignY="center"
          alignX="center"
          entering={FadeInDown}
          exiting={FadeOutUp}
        >
          <Rows gap={2} alignX="center">
            <Text
              weight="Bold"
              size="lg"
              isCenterAligned
              darkColor={theme.color.Gray[300]}
            >
              {title || 'Are you sure?'}
            </Text>
            <Text
              color={theme.color.Gray[600]}
              isCenterAligned
              darkColor={theme.color.Gray[400]}
            >
              {subtitle || 'Use the buttons below to confirm'}
            </Text>
          </Rows>
          <Box gap={2} rows>
            <Button
              {...confirmButtonProps}
              text={confirmButtonProps?.text || 'Confirm'}
              onPress={(e) => {
                if (confirmButtonProps?.onPress) {
                  confirmButtonProps.onPress(e);
                }
                sheets.close();
              }}
            />
            <Button
              color="Secondary"
              {...cancelButtonProps}
              text={cancelButtonProps?.text || 'Cancel'}
              onPress={(e) => {
                if (cancelButtonProps?.onPress) {
                  cancelButtonProps.onPress(e);
                }
                sheets.close();
              }}
            />
          </Box>
        </Rows>
      ),
    });
  }, [
    cancelButtonProps,
    confirmButtonProps,
    sheets,
    subtitle,
    theme.color.Gray,
    title,
  ]);

  return useMemo(
    () => ({
      confirm,
    }),
    [confirm]
  );
}
