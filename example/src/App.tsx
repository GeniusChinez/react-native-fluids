import React from 'react';
import { Alert } from 'react-native';
import {
  View,
  FluidsProvider,
  useTheme,
  Button,
  useLightMode,
  Columns,
  Rows,
  Text,
} from 'react-native-fluids';

export default function App() {
  return (
    <FluidsProvider
      colorAliases={{
        Primary: 'Orange',
      }}
    >
      <Example />
    </FluidsProvider>
  );
}

function Example() {
  const theme = useTheme();

  useLightMode();
  // useDarkMode();

  return (
    <View grows>
      <Rows
        grows
        darkBg={theme.color.Stone[900]}
        alignX="center"
        alignY="center"
        gap={20}
      >
        <Rows alignX="center">
          <Text isCenterAligned variant="h5" color={theme.color.Gray[700]}>
            Login
          </Text>
          <Text isCenterAligned color={theme.color.Gray[600]}>
            What do you wanna do here?
          </Text>
        </Rows>
        <Rows gap={2} alignY="center" p={5} w={'Full'}>
          <Button icon="UserPlus" shape="pill" variant="solid">
            Create Account
          </Button>
          <Button shape="pill" variant="outline" color="Primary">
            Log In
          </Button>
          <Columns alignX="space-between" w={'Full'}>
            <Button
              icon="Camera"
              onPress={() => Alert.alert('Hie')}
              colorVariant={100}
              // textSize="lg"
              textColor={theme.color.Primary[600]}
            />
            <Button
              icon="Plus"
              onPress={() => Alert.alert('Hie')}
              colorVariant={100}
              // textSize="lg"
              textColor={theme.color.Primary[600]}
            />
          </Columns>
        </Rows>
      </Rows>
    </View>
  );
}
