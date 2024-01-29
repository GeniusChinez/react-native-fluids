import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  BottomNavigation,
  TopAppbar,
  useTheme,
  View,
  useDeviceTheme,
  TextField,
  ActionContextProvider,
  FormError,
  FormPrimaryButton,
  FormButton,
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
  useDeviceTheme();
  const theme = useTheme();
  /**
   * - Rating
   * - TextField
   * - SelectField
   * - Screen
   * - Stepper
   * - Tabs
   * - Carousel
   * - Menu
   * - DateField
   * - ...
   */

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
      <Rows grows p={3} gap={4} w={'Full'} alignY="center">
        <View w={'Full'} gap={3}>
          <ActionContextProvider isSubmitting={false}>
            <TextField
              name="email"
              label="Email"
              placeholder="Enter Your Email"
              required
            />
            <FormError />
            <FormPrimaryButton text="Log In" loadingText="Validating..." />
            <FormButton
              colorVariant={200}
              textColor={theme.color.Primary[700]}
              color={'Secondary'}
              text="Create Account"
            />
          </ActionContextProvider>
        </View>
      </Rows>
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
