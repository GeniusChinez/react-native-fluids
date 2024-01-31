/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert, Image } from 'react-native';
import {
  FluidsProvider,
  Rows,
  BottomNavigation,
  TopAppbar,
  useTheme,
  useLightMode,
  Carousel,
  SelectField,
  TextField,
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
      <Carousel
        // showButtons
        showIndicators
        items={[
          {
            type: 'normal',
            label: 'First Wave',
            description:
              'hjgfjhgf jgh jh jhf jghdf jhfgd jghd jhgd dghj hgd hgjd hgd hdg jghd',
          },
          {
            type: 'normal',
            label: 'Second Wave',
            image: 'https://picsum.photos/536/354',
          },
          {
            type: 'raw',
            children: (
              <Image
                source={{
                  uri: 'https://picsum.photos/536/354',
                }}
                style={{
                  flexGrow: 1,
                }}
                resizeMode="cover"
              />
            ),
          },
          {
            type: 'raw',
            children: (
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
            ),
          },
        ]}
      />
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
