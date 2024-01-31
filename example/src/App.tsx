/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  Rows,
  BottomNavigation,
  TopAppbar,
  useTheme,
  useLightMode,
  SelectField,
  TextField,
  Form,
  View,
  Stepper,
  useKeyboard,
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

function ExampleScreen2() {
  return (
    <Rows p={3} gap={4} alignY="center">
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
  );
}

function Example() {
  useLightMode();
  const theme = useTheme();
  /**
   * - Screen
   * - [implement a searchbox-lead topbar (like playstore)]
   * - Surface (rounded borders, grey, padding)
   *
   * - Rating
   * - Menu
   * - DateField
   * - Checkbox
   * - ...
   */
  const keyboard = useKeyboard();

  return (
    <>
      <TopAppbar
        textColor={theme.color.Gray[700]}
        bg={theme.color.Gray[100]}
        darkBg="black"
        layout={{
          type: 'center-aligned',
          leadingIcon: {
            icon: 'ArrowLeft',
          },
          headline: 'Create Account',
          // subheadline: '+123123123123',
          // trailingIcons: [
          //   {
          //     icon: 'Camera',
          //   },
          //   {
          //     icon: 'User',
          //   },
          // ],
        }}
      />
      {/* <Rows growsOnly p={3} gap={4} alignY="center">
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
      </Rows> */}
      {/* <View grows style={{ zIndex: 1001 }}>
        <Tabs
          tabs={[
            {
              label: 'First',
              Component: ExampleScreen1,
            },
            {
              label: 'Second',
              Component: ExampleScreen1,
            },
          ]}
        />
      </View> */}
      <View grows style={{ zIndex: 1001 }} p={2} darkBg="black">
        <Stepper
          steps={[
            {
              title: 'First Step',
              subtitle: 'subtitle, bro',
              content: <ExampleScreen2 />,
            },
            {
              title: 'Second Step',
              subtitle: 'subtitle, bro',
              content: <ExampleScreen2 />,
            },
            {
              title: 'Third Step',
              subtitle: 'subtitle, bro',
              content: <ExampleScreen2 />,
            },
            {
              title: 'Fourth Step',
              subtitle: 'subtitle, bro',
              content: <ExampleScreen2 />,
            },
          ]}
        />
      </View>
      {!keyboard.shown && (
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
      )}
    </>
  );
}
