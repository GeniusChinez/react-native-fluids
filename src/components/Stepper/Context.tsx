import React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

export interface StepperContextValue {
  activeStep: number;
  totalSteps: number;
  totalCompletedSteps: number;
  totalErrorneousSteps: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  canGoForward: boolean;
  canGoBackward: boolean;
  errorneousSteps?: number[];

  goForward: () => void;
  goBackward: () => void;

  setActiveStep: (n: number | ((n: number) => number)) => void;
  setTotalSteps: (n: number | ((n: number) => number)) => void;
  setErrorneousSteps: (s: number[]) => void;
}

export const StepperContext = createContext<StepperContextValue>({
  activeStep: 0,
  totalSteps: 0,
  totalCompletedSteps: 0,
  totalErrorneousSteps: 0,
  isLastStep: true,
  isFirstStep: true,
  canGoForward: false,
  canGoBackward: false,
  setActiveStep: () => {},
  setTotalSteps: () => {},
  setErrorneousSteps: () => {},
  goBackward: () => {},
  goForward: () => {},
});

export interface StepperProviderProps extends PropsWithChildren<{}> {
  defaultStep?: number;
  totalSteps: number;
}

export function StepperProvider(props: StepperProviderProps) {
  const { children, defaultStep = 0, totalSteps: totalSteps_ } = props;

  const [activeStep, setActiveStep] = useState(defaultStep);
  const [totalSteps, setTotalSteps] = useState(totalSteps_);
  const [errorneousSteps, setErrorneousSteps] = useState<
    number[] | undefined
  >();
  const totalErrorneousSteps = useMemo(
    () => errorneousSteps?.length || 0,
    [errorneousSteps?.length]
  );
  const isLastStep = useMemo(
    () => activeStep === totalSteps - 1,
    [activeStep, totalSteps]
  );
  const isFirstStep = useMemo(() => activeStep === 0, [activeStep]);
  const canGoForward = useMemo(() => !isLastStep, [isLastStep]);
  const canGoBackward = useMemo(() => !isFirstStep, [isFirstStep]);
  const totalCompletedSteps = useMemo(() => activeStep, [activeStep]);

  const goBackward = useCallback(() => {
    if (canGoBackward) {
      setActiveStep((x) => x - 1);
    }
  }, [canGoBackward]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      setActiveStep((x) => x + 1);
    }
  }, [canGoForward]);

  const value = useMemo(
    () => ({
      errorneousSteps,
      activeStep,
      totalSteps,
      isLastStep,
      isFirstStep,
      canGoBackward,
      canGoForward,
      totalErrorneousSteps,
      totalCompletedSteps,
      setActiveStep,
      setErrorneousSteps,
      setTotalSteps,
      goBackward,
      goForward,
    }),
    [
      errorneousSteps,
      activeStep,
      totalSteps,
      isLastStep,
      isFirstStep,
      canGoBackward,
      canGoForward,
      totalErrorneousSteps,
      totalCompletedSteps,
      goBackward,
      goForward,
    ]
  );

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
}

export function useStepper() {
  return useContext(StepperContext);
}
