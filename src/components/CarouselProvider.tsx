import React, { useContext } from 'react';
import { createContext, type PropsWithChildren } from 'react';

export interface CarouselContextValue {
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  gotoPrevPage: () => void;
  gotoNextPage: () => void;
}

export const CarouselContext = createContext<CarouselContextValue>({
  page: 0,
  isFirstPage: true,
  isLastPage: true,
  gotoNextPage() {},
  gotoPrevPage() {},
});

export interface CarouselProviderProps
  extends PropsWithChildren<CarouselContextValue> {}

export function CarouselProvider(props: CarouselProviderProps) {
  const { children, ...restOfProps } = props;
  return (
    <CarouselContext.Provider value={restOfProps}>
      {children}
    </CarouselContext.Provider>
  );
}

export function useCarousel() {
  return useContext(CarouselContext);
}
