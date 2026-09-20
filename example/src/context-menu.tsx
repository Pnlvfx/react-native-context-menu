/* eslint-disable goat-eslint/no-inline-styles */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ContextMenuPrimitive from '@simonegauli/react-native-context-menu';
import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

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

const handlePreviewPress = () => {
  Alert.alert('Preview tapped');
};

export const ContextMenu1 = () => {
  const dark = useColorScheme() === 'dark';

  const computed = ({ pressed }: { pressed: boolean }) => [
    box,
    dark ? { backgroundColor: '#1e1e1e', borderColor: 'rgba(255,255,255,0.12)' } : { backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.08)' },
    pressed && (dark ? { backgroundColor: '#2a2a2a' } : { backgroundColor: '#e8e8e8' }),
  ];

  return (
    <ContextMenuPrimitive.Root previewBorderRadius={12}>
      <ContextMenuPrimitive.Trigger>
        <Pressable onPress={handlePress} style={computed}>
          <Text style={[label, dark ? { color: 'rgba(255,255,255,0.85)' } : { color: 'rgba(0,0,0,0.8)' }]}>{'Hold me'}</Text>
        </Pressable>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Content>
        <ContextMenuPrimitive.Preview borderRadius={12} onPress={handlePreviewPress}>
          {() => (
            <View style={preview}>
              <Text style={previewTitle}>{'Preview card'}</Text>
              <Text style={previewSub}>{'Tap to open'}</Text>
            </View>
          )}
        </ContextMenuPrimitive.Preview>
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

const { box, label, preview, previewTitle, previewSub } = StyleSheet.create({
  box: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: '500', fontSize: 15 },
  preview: { width: 280, padding: 20, backgroundColor: '#f5f5f5', borderRadius: 12 },
  previewTitle: { fontSize: 17, fontWeight: '600', color: '#000' },
  previewSub: { fontSize: 13, color: '#666', marginTop: 4 },
});
