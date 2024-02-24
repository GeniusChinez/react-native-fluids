export type Responsive<T> = {
  xs?: Partial<T>;
  sm?: Partial<T>;
  md?: Partial<T>;
  lg?: Partial<T>;
  xl?: Partial<T>;
  xl2?: Partial<T>;
};

export type ResponsiveProps<T> = {
  xs?: Partial<T>;
  sm?: Partial<T>;
  md?: Partial<T>;
  lg?: Partial<T>;
  xl?: Partial<T>;
  xl2?: Partial<T>;
} & T;
