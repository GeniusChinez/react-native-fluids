import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  BottomNavigation,
  TopAppbar,
  useTheme,
  View,
  TextField,
  ActionContextProvider,
  FormError,
  FormPrimaryButton,
  FormButton,
  SelectField,
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
  const theme = useTheme();
  /**
   * - Rating
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
            <SelectField
              name="choose"
              label="Choose"
              placeholder="Select Country"
              options={[
                {
                  label: 'First',
                  value: '1',
                  key: 1,
                },
                {
                  label: 'Second',
                  value: '2',
                  key: 2,
                },
                {
                  label: 'Third',
                  value: '3',
                  key: 3,
                },
              ]}
              required
            />
            <FormError />
            <FormPrimaryButton text="Log In" loadingText="Validating..." />
            <FormButton
              colorVariant={200}
              darkColorVariant={800}
              textColor={theme.color.Primary[700]}
              color={'Secondary'}
              darkColor={'Gray'}
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
