/* eslint-disable goat-eslint/no-inline-styles */
import { StrictMode } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ContextMenu1 } from './context-menu';

const App = () => {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  return (
    <StrictMode>
      <GestureHandlerRootView style={gestureRoot}>
        <View style={[container, { backgroundColor: dark ? '#0f0f0f' : '#f5f5f5' }]}>
          <Text style={[heading, { color: dark ? '#ffffff' : '#0f0f0f' }]}>{'react-native-context-menu'}</Text>
          <Text style={[subheading, { color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }]}>{'thanks for being here'}</Text>
          <ContextMenu1 />
        </View>
      </GestureHandlerRootView>
    </StrictMode>
  );
};

export default App;

const { gestureRoot, container, heading, subheading } = StyleSheet.create({
  gestureRoot: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  heading: { fontSize: 18, fontWeight: '700', letterSpacing: 0.2, marginBottom: 4 },
  subheading: { fontSize: 13, fontWeight: '400', marginBottom: 32 },
});
