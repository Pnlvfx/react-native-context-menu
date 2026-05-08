import { StrictMode } from 'react';
import { Alert, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import * as ContextMenu from '@simonegauli/react-native-context-menu';

export default function App() {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  return (
    <StrictMode>
      <GestureHandlerRootView style={styles.gestureRoot}>
        <View
          style={[
            styles.container,
            dark ? styles.containerDark : styles.containerLight,
          ]}
        >
          <Text
            style={[
              styles.heading,
              dark ? styles.headingDark : styles.headingLight,
            ]}
          >
            react-native-context-menu
          </Text>
          <Text
            style={[
              styles.subheading,
              dark ? styles.subheadingDark : styles.subheadingLight,
            ]}
          >
            thanks for being here
          </Text>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <Pressable
                style={({ pressed }) => [
                  styles.box,
                  dark ? styles.boxDark : styles.boxLight,
                  pressed &&
                    (dark ? styles.boxPressedDark : styles.boxPressedLight),
                ]}
                onPress={() => Alert.alert('Button pressed')}
              >
                <Text
                  style={[
                    styles.label,
                    dark ? styles.labelDark : styles.labelLight,
                  ]}
                >
                  Hold me
                </Text>
              </Pressable>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item
                id="share"
                onPress={() => Alert.alert('Share pressed')}
              >
                <ContextMenu.ItemTitle>{'Share'}</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon ios="square.and.arrow.up" />
              </ContextMenu.Item>
              <ContextMenu.Item
                id="copy"
                onPress={() => Alert.alert('Copy pressed')}
              >
                <ContextMenu.ItemTitle>{'Copy'}</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon ios="doc.on.doc" />
              </ContextMenu.Item>
              <ContextMenu.Item
                id="delete"
                destructive
                onPress={() => Alert.alert('Delete pressed')}
              >
                <ContextMenu.ItemTitle>{'Delete'}</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon ios="trash" />
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </View>
      </GestureHandlerRootView>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  gestureRoot: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  containerDark: { backgroundColor: '#0f0f0f' },
  containerLight: { backgroundColor: '#f5f5f5' },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  headingDark: { color: '#ffffff' },
  headingLight: { color: '#0f0f0f' },
  subheading: { fontSize: 13, fontWeight: '400', marginBottom: 32 },
  subheadingDark: { color: 'rgba(255,255,255,0.5)' },
  subheadingLight: { color: 'rgba(0,0,0,0.4)' },
  box: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxDark: {
    backgroundColor: '#1e1e1e',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  boxLight: { backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.08)' },
  boxPressedDark: { backgroundColor: '#2a2a2a' },
  boxPressedLight: { backgroundColor: '#e8e8e8' },
  label: { fontWeight: '500', fontSize: 15 },
  labelDark: { color: 'rgba(255,255,255,0.85)' },
  labelLight: { color: 'rgba(0,0,0,0.8)' },
});
