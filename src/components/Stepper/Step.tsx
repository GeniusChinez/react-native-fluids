/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useStepper } from './Context';
import { useTheme } from 'theme-native';
import { View } from '../View';
import { Text } from '../Text';
import { Button } from '../Button';
import { ScrollView } from 'react-native';

export interface StepperStepProps {
  title?: string;
  subtitle?: string;
  showContinueButton?: boolean;
  isSkippable?: boolean;
  content?: React.ReactNode;
}

export function StepperStep(props: StepperStepProps) {
  const { title, subtitle, content, showContinueButton, isSkippable } = props;

  const theme = useTheme();
  const { goForward } = useStepper();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View
        grows
        style={{
          gap: theme.spacing[4],
          paddingTop: theme.spacing[6],
        }}
      >
        {(!!title || !!subtitle) && (
          <View
            style={{
              marginBottom: theme.spacing[6],
              flexDirection: 'column',
              gap: theme.spacing[0.5],
              alignItems: 'center',
            }}
          >
            {!!title && (
              <Text
                variant="h7"
                style={{
                  textAlign: 'center',
                }}
                darkColor={theme.color.Gray[300]}
              >
                {title}
              </Text>
            )}
            {!!subtitle && (
              <Text
                color={theme.color.Gray[600]}
                darkColor={theme.color.Gray[400]}
                size="sm"
                style={{
                  textAlign: 'center',
                  maxWidth: '80%',
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>
        )}
        <View
          grows
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            // padding: theme.spacing[4],
            gap: theme.spacing[6],
          }}
        >
          {content}
          {(showContinueButton || isSkippable) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              gap={2}
            >
              {showContinueButton && (
                <View grows>
                  <Button text="Continue" onPress={goForward} color="Primary" />
                </View>
              )}
              {isSkippable && (
                <View grows>
                  <Button text="Skip" onPress={goForward} color="Secondary" />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
