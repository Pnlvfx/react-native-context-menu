import type { ContextMenuRootProps } from './Root';
import type { ContextMenuPreviewProps } from '../Preview/Preview';
import ContextMenuNativeView, { type NativeContextMenuItem } from '../native/ContextMenuViewNativeComponent';
import { useRef, useState } from 'react';
import { PreviewHost } from '../Preview/PreviewHost';
import { RootContext, type RegisteredItem } from './RootContext';

export const Root = ({ children, style, onMenuWillShow, onMenuWillHide }: ContextMenuRootProps) => {
  const [nativeItems, setNativeItems] = useState<NativeContextMenuItem[]>([]);
  const [preview, setPreview] = useState<ContextMenuPreviewProps | undefined>();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handlersRef = useRef<Map<string, () => void>>(new Map());

  const registerItem = ({ onPress, id, title, destructive, disabled, systemImage }: RegisteredItem) => {
    if (onPress !== undefined) {
      handlersRef.current.set(id, onPress);
    }

    setNativeItems((prev) => {
      return [...prev.filter((i) => i.id !== id), { id, title, destructive, disabled, systemImage }];
    });
  };

  const unregisterItem = (id: string) => {
    handlersRef.current.delete(id);
    setNativeItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateHandler = (id: string, onPress: (() => void) | undefined) => {
    if (onPress === undefined) {
      handlersRef.current.delete(id);
    } else {
      handlersRef.current.set(id, onPress);
    }
  };

  const registerPreview = (nextPreview: ContextMenuPreviewProps) => {
    setPreview(nextPreview);
  };

  const unregisterPreview = () => {
    setPreview(undefined);
  };

  const handleMenuItemPress = (event: { nativeEvent: { id: string } }) => {
    handlersRef.current.get(event.nativeEvent.id)?.();
  };

  const handleMenuWillCreate = () => {
    setIsMenuActive(true);
  };

  const handleMenuDidHide = () => {
    setIsMenuActive(false);
  };

  const handleMenuWillShow = () => {
    onMenuWillShow?.();
  };

  const handleMenuWillHide = () => {
    onMenuWillHide?.();
  };

  const handlePreviewPress = () => {
    preview?.onPress?.();
  };

  return (
    <RootContext value={{ registerItem, unregisterItem, updateHandler, registerPreview, unregisterPreview }}>
      <ContextMenuNativeView
        hasPreview={preview !== undefined}
        menuItems={nativeItems}
        onMenuDidHide={handleMenuDidHide}
        onMenuItemPress={handleMenuItemPress}
        onMenuWillCreate={handleMenuWillCreate}
        onMenuWillHide={handleMenuWillHide}
        onMenuWillShow={handleMenuWillShow}
        onPreviewPress={handlePreviewPress}
        style={style}
      >
        {children}
        {isMenuActive && preview !== undefined ? <PreviewHost {...preview} /> : undefined}
      </ContextMenuNativeView>
    </RootContext>
  );
};

Root.displayName = 'ContextMenu.Root';
