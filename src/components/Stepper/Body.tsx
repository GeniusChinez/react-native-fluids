import React from 'react';
import { useStepper } from './Context';
import { StepperStep, type StepperStepProps } from './Step';

export interface StepperBodyProps {
  steps: StepperStepProps[];
}

export function StepperBody(props: StepperBodyProps) {
  const { steps } = props;

  const stepper = useStepper();
  const { activeStep } = stepper;

  return <StepperStep {...steps[activeStep]} />;
}
