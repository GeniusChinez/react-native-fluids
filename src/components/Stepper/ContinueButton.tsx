import React from 'react';
import { Button, type ButtonProps } from '../Button';
import { useStepper } from './Context';

export interface StepperContinueButtonProps extends ButtonProps {
  handleFinalStep: () => void;
}

export function StepperContinueButton(props: StepperContinueButtonProps) {
  const { handleFinalStep, ...restOfProps } = props;
  const { isLastStep, goForward } = useStepper();

  return (
    <Button
      {...restOfProps}
      onPress={(e) => {
        if (restOfProps.onPress) {
          restOfProps.onPress(e);
        }

        if (isLastStep) {
          handleFinalStep();
        } else {
          goForward();
        }
      }}
    />
  );
}
