import type { MenuItemConfig, NativeMenuItemData } from './types';
import ContextMenuNativeView from './ContextMenuViewNativeComponent';
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { ContextMenuContext } from './ContextMenuContext';

type RootProps = {
  children: ReactNode;
};

export const Root = ({ children }: RootProps) => {
  const [nativeItems, setNativeItems] = useState<NativeMenuItemData[]>([]);
  const handlersRef = useRef<Map<string, () => void>>(new Map());

  const registerItem = useCallback((item: MenuItemConfig) => {
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
  }, []);

  const unregisterItem = useCallback((id: string) => {
    handlersRef.current.delete(id);
    setNativeItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateHandler = useCallback(
    (id: string, onPress: (() => void) | undefined) => {
      if (onPress !== undefined) {
        handlersRef.current.set(id, onPress);
      } else {
        handlersRef.current.delete(id);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({ registerItem, unregisterItem, updateHandler }),
    [registerItem, unregisterItem, updateHandler]
  );

  const handleMenuItemPress = useCallback(
    (event: { nativeEvent: { id: string } }) => {
      handlersRef.current.get(event.nativeEvent.id)?.();
    },
    []
  );

  return (
    <ContextMenuContext value={contextValue}>
      <ContextMenuNativeView
        style={root}
        menuItems={nativeItems}
        onMenuItemPress={handleMenuItemPress}
      >
        {children}
      </ContextMenuNativeView>
    </ContextMenuContext>
  );
};

const { root } = StyleSheet.create({
  root: {
    alignSelf: 'flex-start',
  },
});
