/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useStepper } from './Context';
import { type StepperStepProps } from './Step';
import { Fragment } from 'react';
import { Separator } from '../Separator';
import { useTheme } from 'theme-native';
import { View } from '../View';
import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Icon } from '../Icon';

export interface StepperHeaderProps {
  steps: StepperStepProps[];
}

export function StepperHeader(props: StepperHeaderProps) {
  const { steps } = props;

  const theme = useTheme();
  const { isDarkMode } = theme;

  const stepper = useStepper();
  const { activeStep, setActiveStep } = stepper;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      p={2}
    >
      {steps.map((step, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Separator
              grows
              bg={
                activeStep >= index
                  ? theme.color.Primary[600]
                  : theme.color.Gray[200]
              }
              darkBg={
                activeStep >= index
                  ? theme.color.Primary[600]
                  : isDarkMode
                  ? theme.color.Gray[800]
                  : 'rgba(255,255,255,0.1)'
              }
              style={{
                height: 2,
              }}
            />
          )}
          <TouchableOpacity
            aria-label={step.title}
            style={{
              height: theme.height[7],
              width: theme.width[7],
              flexDirection: 'row',
              borderWidth: 2,
              borderColor:
                activeStep === index
                  ? theme.color.Primary[600]
                  : theme.color.Transparent,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: theme.borderRadius.Md,
              backgroundColor:
                activeStep > index
                  ? theme.color.Primary[600]
                  : isDarkMode
                  ? theme.color.Gray[800]
                  : theme.color.Gray[300],
            }}
            onPress={() => {
              // if (activeStep > index) {
              setActiveStep(index);
              // }
            }}
          >
            <Text size="sm">
              {activeStep > index ? (
                <Icon name="Check" size={18} color={'white'} />
              ) : (
                `${index + 1}`
              )}
            </Text>
          </TouchableOpacity>
        </Fragment>
      ))}
    </View>
  );
}
