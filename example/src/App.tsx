import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  BottomNavigation,
  TopAppbar,
  useTheme,
  TextField,
  SelectField,
  useLightMode,
  Form,
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
      <TopAppbar
        textColor={theme.color.Gray[700]}
        bg={theme.color.Gray[100]}
        layout={{
          type: 'large',
          leadingIcon: {
            icon: 'Menu',
          },
          headline: 'Grayson Banes',
          subheadline: '+123123123123',
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
      <Rows growsOnly p={3} gap={4} alignY="center">
        <Form
          // isSubmitting
          primary={{
            text: 'Log In',
            loadingText: 'Validating...',
          }}
          actions={[
            {
              color: 'Secondary',
              text: 'Create Account',
            },
          ]}
        >
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
        </Form>
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
