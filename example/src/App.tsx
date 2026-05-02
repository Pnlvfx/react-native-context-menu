import { StrictMode } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import * as ContextMenu from '@simonegauli/react-native-context-menu';

export default function App() {
  return (
    <StrictMode>
      <GestureHandlerRootView style={styles.gestureRoot}>
        <View style={styles.container}>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <Pressable
                style={({ pressed }) => [
                  styles.box,
                  pressed && styles.boxPressed,
                ]}
                onPress={() => Alert.alert('Button pressed')}
              >
                <Text style={styles.label}>Tap or hold</Text>
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

const blob = {
  position: 'absolute',
  width: 200,
  height: 200,
  borderRadius: 100,
  opacity: 0.6,
} as const;

const styles = StyleSheet.create({
  gestureRoot: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blob1: { ...blob, backgroundColor: '#FF6B6B', top: 60, left: 30 },
  blob2: { ...blob, backgroundColor: '#4ECDC4', top: 200, right: 20 },
  blob3: { ...blob, backgroundColor: '#FFE66D', bottom: 300, left: 60 },
  blob4: { ...blob, backgroundColor: '#A29BFE', bottom: 150, right: 40 },
  blob5: { ...blob, backgroundColor: '#FD79A8', top: 400, left: 100 },
  box: {
    width: 160,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxPressed: { backgroundColor: 'rgba(255,255,255,0.3)' },
  label: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
