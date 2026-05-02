import type { MenuItemConfig, NativeMenuItemData } from './types';
import type { StyleProp, ViewStyle } from 'react-native';
import ContextMenuNativeView from './ContextMenuViewNativeComponent';
import { useRef, useState, type ReactNode } from 'react';
import { ContextMenuContext } from './ContextMenuContext';

export interface RootProps {
  readonly children: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}

export const Root = ({ children, style }: RootProps) => {
  const [nativeItems, setNativeItems] = useState<NativeMenuItemData[]>([]);
  const handlersRef = useRef<Map<string, () => void>>(new Map());

  const registerItem = (item: MenuItemConfig) => {
    const { onPress, ...rest } = item;
    if (onPress !== undefined) {
      handlersRef.current.set(item.id, onPress);
    }
    const nativeItem: NativeMenuItemData = {
      id: rest.id,
      title: rest.title,
      destructive: rest.destructive ?? false,
      disabled: rest.disabled ?? false,
      systemImage: rest.systemImage ?? '',
    };
    setNativeItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [...filtered, nativeItem];
    });
  };

  const unregisterItem = (id: string) => {
    handlersRef.current.delete(id);
    setNativeItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateHandler = (id: string, onPress: (() => void) | undefined) => {
    if (onPress !== undefined) {
      handlersRef.current.set(id, onPress);
    } else {
      handlersRef.current.delete(id);
    }
  };

  const handleMenuItemPress = (event: { nativeEvent: { id: string } }) => {
    handlersRef.current.get(event.nativeEvent.id)?.();
  };

  return (
    <ContextMenuContext value={{ registerItem, unregisterItem, updateHandler }}>
      <ContextMenuNativeView
        style={style}
        menuItems={nativeItems}
        onMenuItemPress={handleMenuItemPress}
      >
        {children}
      </ContextMenuNativeView>
    </ContextMenuContext>
  );
};
