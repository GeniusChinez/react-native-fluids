import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  useLightMode,
  BottomNavigation,
  TopAppbar,
  useTheme,
  View,
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
  const theme = useTheme();

  return (
    <Rows grows alignY="space-between" darkBg={'black'}>
      <View>
        <TopAppbar
          textColor={theme.color.Gray[700]}
          bg={theme.color.Gray[100]}
          layout={{
            type: 'small',
            leadingIcon: {
              icon: 'Menu',
            },
            headline: 'Grayson Banes',
            // subheadline: '+123123123123',
            trailingIcons: [
              {
                icon: 'Camera',
              },
              {
                icon: 'User',
              },
            ],
          }}
        />
      </View>
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
