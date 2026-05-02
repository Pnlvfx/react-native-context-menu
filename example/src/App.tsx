import { Alert, StyleSheet, Text, View } from 'react-native';
import { ContextMenu } from 'react-native-context-menu';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.blob1} />
        <View style={styles.blob2} />
        <View style={styles.blob3} />
        <View style={styles.blob4} />
        <View style={styles.blob5} />
      </View>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <View style={styles.box}>
            <Text style={styles.label}>Hold me</Text>
          </View>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item
            id="share"
            title="Share"
            systemImage="square.and.arrow.up"
            onPress={() => Alert.alert('Share pressed')}
          />
          <ContextMenu.Item
            id="copy"
            title="Copy"
            systemImage="doc.on.doc"
            onPress={() => Alert.alert('Copy pressed')}
          />
          <ContextMenu.Item
            id="delete"
            title="Delete"
            systemImage="trash"
            destructive
            onPress={() => Alert.alert('Delete pressed')}
          />
        </ContextMenu.Content>
      </ContextMenu.Root>
    </View>
  );
}

const blob = {
  position: 'absolute' as const,
  width: 200,
  height: 200,
  borderRadius: 100,
  opacity: 0.6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFill,
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
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
