import React from 'react';
import type { PropsWithChildren } from 'react';
import { Platform } from 'react-native';

export function PlatformSpecific(
  props: PropsWithChildren<{ os: typeof Platform.OS }>
) {
  return <>{Platform.OS === props.os && props.children}</>;
}
