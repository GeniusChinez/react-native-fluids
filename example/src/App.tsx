import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  useLightMode,
  BottomNavigation,
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
      <BottomNavigation
        actions={[
          {
            icon: 'Home',
            onPress() {
              Alert.alert('Back', 'going back');
            },
            label: 'Home',
            isSelected: true,
          },
          {
            icon: 'Users',
            onPress() {},
            label: 'People',
          },
          {
            icon: 'QrCode',
            onPress() {},
            label: 'Qr Codes',
          },
        ]}
        primary={{
          icon: 'Plus',
          onPress() {
            Alert.alert('do it');
          },
        }}
      />
    </Rows>
  );
}
