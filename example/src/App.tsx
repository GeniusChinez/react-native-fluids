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
      <Columns
        gap={4}
        grows
        alignX="center"
        alignY="center"
        darkBg={theme.color.Stone[900]}
      >
        <Rows gap={2} w={'5/6'}>
          <Button icon="UserPlus" shape="pill" variant="solid">
            Create Account
          </Button>
          <Button shape="pill" variant="outline" color="Primary">
            Log In
          </Button>
          <Button icon="Plus" onPress={() => Alert.alert('Hie')} />
        </Rows>
      </Columns>
    </View>
  );
}
