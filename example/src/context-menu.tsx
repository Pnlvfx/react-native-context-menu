// eslint-disable-next-line import/no-extraneous-dependencies
import * as ContextMenuPrimitive from '@simonegauli/react-native-context-menu';
import { Pressable, StyleSheet, Text } from 'react-native';

export const ContextMenu1 = () => {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>
        <Pressable
          onPress={() => Alert.alert('Button pressed')}
          style={({ pressed }) => [box, dark ? styles.boxDark : styles.boxLight, pressed && (dark ? styles.boxPressedDark : styles.boxPressedLight)]}
        >
          <Text style={[label, dark ? styles.labelDark : styles.labelLight]}>{'Hold me'}</Text>
        </Pressable>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Content>
        <ContextMenuPrimitive.Item
          id="share"
          onPress={() => {
            Alert.alert('Share pressed');
          }}
        >
          <ContextMenuPrimitive.ItemTitle>{'Share'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="square.and.arrow.up" />
        </ContextMenuPrimitive.Item>
        <ContextMenuPrimitive.Item
          id="copy"
          onPress={() => {
            Alert.alert('Copy pressed');
          }}
        >
          <ContextMenuPrimitive.ItemTitle>{'Copy'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="doc.on.doc" />
        </ContextMenuPrimitive.Item>
        <ContextMenuPrimitive.Item
          destructive
          id="delete"
          onPress={() => {
            Alert.alert('Delete pressed');
          }}
        >
          <ContextMenuPrimitive.ItemTitle>{'Delete'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="trash" />
        </ContextMenuPrimitive.Item>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Root>
  );
};

const { box, label } = StyleSheet.create({
  box: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  boxDark: { backgroundColor: '#1e1e1e', borderColor: 'rgba(255,255,255,0.12)' },
  boxLight: { backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.08)' },
  boxPressedDark: { backgroundColor: '#2a2a2a' },
  boxPressedLight: { backgroundColor: '#e8e8e8' },
  label: { fontWeight: '500', fontSize: 15 },
  labelDark: { color: 'rgba(255,255,255,0.85)' },
  labelLight: { color: 'rgba(0,0,0,0.8)' },
});
