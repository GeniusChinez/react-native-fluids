/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  useTheme,
  useLightMode,
  SelectField,
  TextField,
  Form,
  View,
  Stepper,
  Box,
  useScreen,
  Screen,
  CheckboxField,
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
  // const theme = useTheme();

  return (
    <Box rows p={3} gap={4} alignY="center">
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
            menu: {
              items: [
                {
                  label: 'Cilck me',
                },
              ],
            },
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
        <CheckboxField name="remember" label="Remember me?" />
      </Form>
    </Box>
  );
}

function Example() {
  useLightMode();
  const theme = useTheme();
  /**
   * - Menu
   * - DateField
   * - Code Input
   * - ...
   */
  const screen = useScreen({
    topAppbar: {
      textColor: theme.color.Gray[700],
      bg: theme.color.Gray[100],
      darkBg: 'black',
      layout: {
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
      },
    },
    bottomNavigation: {
      actions: [
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
          icon: 'Menu',
          label: 'More',
          menu: {
            items: [
              {
                label: 'Freeze',
                icon: {
                  name: 'IceCream',
                },
                iconPos: 'right',
              },
              {
                label: 'Freeze',
                icon: {
                  name: 'IceCream',
                },
                iconPos: 'right',
              },
              {
                label: 'Delete',
                icon: {
                  name: 'Trash',
                  color: 'red',
                },
                labelProps: {
                  color: 'red',
                },
                iconPos: 'right',
              },
            ],
          },
        },
      ],
      primary: {
        icon: 'Menu',
        menu: {
          height: 400,
          groups: [
            {
              label: 'Saving',
              items: [
                {
                  label: 'Save',
                  icon: {
                    name: 'Save',
                  },
                  // iconPos: 'right',
                },
                {
                  label: 'Save All',
                  icon: {
                    name: 'SaveAll',
                  },
                  // iconPos: 'right',
                },
              ],
            },
            {
              label: 'Dangerous',
              items: [
                {
                  label: 'Freeze',
                  icon: {
                    name: 'IceCream',
                  },
                  iconPos: 'right',
                },
                {
                  label: 'Delete',
                  icon: {
                    name: 'Trash',
                    color: 'red',
                  },
                  labelProps: {
                    color: 'red',
                  },
                  iconPos: 'right',
                },
              ],
            },
            {
              label: 'Dangerous',
              items: [
                {
                  label: 'Freeze',
                  icon: {
                    name: 'IceCream',
                  },
                  iconPos: 'right',
                },
                {
                  label: 'Delete',
                  icon: {
                    name: 'Trash',
                    color: 'red',
                  },
                  labelProps: {
                    color: 'red',
                  },
                  iconPos: 'right',
                },
              ],
            },
            {
              label: 'Dangerous',
              items: [
                {
                  label: 'Freeze',
                  icon: {
                    name: 'IceCream',
                  },
                  iconPos: 'right',
                },
                {
                  label: 'Delete',
                  icon: {
                    name: 'Trash',
                    color: 'red',
                  },
                  labelProps: {
                    color: 'red',
                  },
                  iconPos: 'right',
                },
              ],
            },
          ],
        },
      },
    },
  });

  return (
    <Screen {...screen}>
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
    </Screen>
  );
}
