import type { MenuLayoutProps } from './MenuLayout';

export interface MenuTriggerProps {
  menu?: {
    height?: number;
    inject?: React.ReactNode;
    inplace?: boolean;
    name: string;
    panToClose?: boolean;
  } & MenuLayoutProps;
}
