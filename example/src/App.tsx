import React from 'react';
import {
  View,
  Text,
  Columns,
  Rows,
  FluidsProvider,
  useTheme,
} from 'react-native-fluids';

export default function App() {
  return (
    <FluidsProvider>
      <Example />
    </FluidsProvider>
  );
}

function Example() {
  const theme = useTheme();
  return (
    <View grows darkBg={theme.color.Stone[900]}>
      <Rows gap={4} grows align="center" darkBg={theme.color.Stone[950]}>
        <Text>A</Text>
        <Text>B</Text>
        <Text>C</Text>
      </Rows>
      <Columns alignX="space-around" alignY="center" gap={4} grows>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
      </Columns>
    </View>
  );
}
