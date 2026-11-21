/* eslint-disable goat-eslint/no-inline-styles */
// eslint-disable-next-line import-x/no-extraneous-dependencies
import * as ContextMenuPrimitive from '@simonegauli/react-native-context-menu';
import { useState } from 'react';
import { Alert, StyleSheet, Text, useColorScheme } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { PreviewCard } from './preview-card';

const renderPreview = () => <PreviewCard />;

const handlePreviewPress = () => {
  Alert.alert('Preview pressed');
};

const handleShare = () => {
  Alert.alert('Share pressed');
};

export const PreviewMenu = () => {
  const dark = useColorScheme() === 'dark';
  const [status, setStatus] = useState('closed');

  const handleMenuWillShow = () => {
    setStatus('open');
  };

  const handleMenuWillHide = () => {
    setStatus('closed');
  };

  return (
    <ContextMenuPrimitive.Root onMenuWillHide={handleMenuWillHide} onMenuWillShow={handleMenuWillShow}>
      <ContextMenuPrimitive.Trigger>
        <Pressable style={[box, dark ? { backgroundColor: '#1e1e1e', borderColor: 'rgba(255,255,255,0.12)' } : { backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.08)' }]}>
          <Text style={[label, { color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)' }]}>{`Hold me for a preview (${status})`}</Text>
        </Pressable>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Content>
        <ContextMenuPrimitive.Preview borderRadius={16} onPress={handlePreviewPress}>
          {renderPreview}
        </ContextMenuPrimitive.Preview>
        <ContextMenuPrimitive.Item id="share" onPress={handleShare}>
          <ContextMenuPrimitive.ItemTitle>{'Share'}</ContextMenuPrimitive.ItemTitle>
          <ContextMenuPrimitive.ItemIcon ios="square.and.arrow.up" />
        </ContextMenuPrimitive.Item>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Root>
  );
};

const { box, label } = StyleSheet.create({
  box: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: '500', fontSize: 15 },
});
