import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  BottomAppbar,
  useLightMode,
} from 'react-native-fluids';

export default function App() {
  return (
    <FluidsProvider
      mode="device"
      colorAliases={{
        Primary: 'Indigo',
      }}
    >
      <Example />
    </FluidsProvider>
  );
}

function Example() {
  useLightMode();

  return (
    <Rows grows alignY="bottom" darkBg={'black'}>
      <BottomAppbar
        actions={[
          {
            icon: 'ArrowLeft',
            onPress() {
              Alert.alert('Back', 'going back');
            },
          },
          {
            icon: 'QrCode',
            onPress() {},
          },
        ]}
        primary={{
          icon: 'Download',
          onPress() {
            Alert.alert('do it');
          },
        }}
      />
    </Rows>
  );
}
