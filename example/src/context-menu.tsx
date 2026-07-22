/* eslint-disable goat-eslint/no-inline-styles */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ContextMenuPrimitive from '@simonegauli/react-native-context-menu';
import { Alert, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';

const handlePress = () => {
  Alert.alert('Button pressed');
};

const handleShare = () => {
  Alert.alert('Share pressed');
};

const handleCopy = () => {
  Alert.alert('Copy pressed');
};

const handleDelete = () => {
  Alert.alert('Delete pressed');
};

export const ContextMenu1 = () => {
  const dark = useColorScheme() === 'dark';

  const computed = ({ pressed }: { pressed: boolean }) => [
    box,
    dark ? { backgroundColor: '#1e1e1e', borderColor: 'rgba(255,255,255,0.12)' } : { backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.08)' },
    pressed && (dark ? { backgroundColor: '#2a2a2a' } : { backgroundColor: '#e8e8e8' }),
  ];

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>
        <Pressable onPress={handlePress} style={computed}>
          <Text style={[label, dark ? { color: 'rgba(255,255,255,0.85)' } : { color: 'rgba(0,0,0,0.8)' }]}>{'Hold me'}</Text>
        </Pressable>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Content>
        <ContextMenuPrimitive.Item id="share" onPress={handleShare}>
          <ContextMenuPrimitive.ItemTitle>{'Share'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="square.and.arrow.up" />
        </ContextMenuPrimitive.Item>
        <ContextMenuPrimitive.Item id="copy" onPress={handleCopy}>
          <ContextMenuPrimitive.ItemTitle>{'Copy'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="doc.on.doc" />
        </ContextMenuPrimitive.Item>
        <ContextMenuPrimitive.Item destructive id="delete" onPress={handleDelete}>
          <ContextMenuPrimitive.ItemTitle>{'Delete'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="trash" />
        </ContextMenuPrimitive.Item>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Root>
  );
};

const { box, label } = StyleSheet.create({
  box: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: '500', fontSize: 15 },
});
