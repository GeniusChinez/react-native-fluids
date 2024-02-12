import React from 'react';
import { Alert } from 'react-native';
import {
  FluidsProvider,
  useTheme,
  SelectField,
  TextField,
  Form,
  Box,
  useScreen,
  Screen,
  CheckboxField,
  Text,
  DateField,
  CodeField,
  AnswerPicker,
  Rows,
  View,
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

export function ExampleScreen2() {
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
            sheet: {
              children: <Text>bro thinks he's Hikaru</Text>,
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
        <DateField
          name="date"
          label="Date Of Birth"
          placeholder="Choose Date of Birth"
          required
        />
        <CodeField
          name="pin"
          label="Enter PIN"
          length={4}
          hiddenInput
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
  const theme = useTheme();
  /**
   * - Code Input
   * - ...
   */
  const screen = useScreen({
    topAppbar: {
      textColor: theme.color.Gray[700],
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
          sheet: {
            children: <Text>bro thinks he's Hikaru</Text>,
          },
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
          height: 50,
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

  useLightMode();
  return (
    <Screen {...screen}>
      <Rows alignY="center" grows p={4} gap={10} alignX="center">
        <View style={{ maxWidth: '80%' }}>
          <Text
            color={theme.color.Gray[500]}
            weight="Bold"
            size="xl"
            isCenterAligned
          >
            What do you do when you say something gay:
          </Text>
        </View>
        <AnswerPicker
          // incorrect
          // correct
          layout="rows"
          alignAnswers="center"
          handleChange={(x) => Alert.alert(x)}
          options={[
            {
              label: 'Continue',
              value: 'first',
            },
            {
              label: 'Pause',
              value: 'second',
            },
            {
              label: 'Neither',
              value: 'third',
            },
          ]}
        />
      </Rows>
      {/* <View grows style={{ zIndex: 1001 }} p={2} darkBg='black'>
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
      </View> */}
    </Screen>
  );
}
