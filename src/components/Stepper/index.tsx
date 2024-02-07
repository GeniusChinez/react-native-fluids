/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import { StepperBody } from './Body';
import { StepperProvider } from './Context';
import { StepperHeader } from './Header';
import { type StepperStepProps } from './Step';
import { useTheme } from 'theme-native';

export interface StepperProps {
  defaultStep?: number;
  steps: StepperStepProps[];
  renderProvider?: boolean;
}

export function Stepper(props: StepperProps) {
  const { steps, defaultStep, renderProvider = true } = props;
  const theme = useTheme();

  const stuff = (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flex: 1,
        gap: theme.spacing[2],
      }}
    >
      <StepperHeader steps={steps} />
      <StepperBody steps={steps} />
    </ScrollView>
  );

  if (renderProvider) {
    return (
      <StepperProvider totalSteps={steps.length} defaultStep={defaultStep}>
        {stuff}
      </StepperProvider>
    );
  }
  return stuff;
}

export * from './Context';
export * from './ContinueButton';
