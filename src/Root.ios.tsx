import type { ContextMenuRootProps } from './Root';
import ContextMenuNativeView, {
  type NativeContextMenuItem,
} from './ContextMenuViewNativeComponent';
import { useRef, useState } from 'react';
import { ContextMenuContext, type RegisteredItem } from './ContextMenuContext';

export const Root = ({ children, style }: ContextMenuRootProps) => {
  const [nativeItems, setNativeItems] = useState<NativeContextMenuItem[]>([]);
  const handlersRef = useRef<Map<string, () => void>>(new Map());

  const registerItem = ({
    onPress,
    id,
    title,
    destructive,
    disabled,
    systemImage,
  }: RegisteredItem) => {
    if (onPress !== undefined) {
      handlersRef.current.set(id, onPress);
    }

    setNativeItems((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      return [
        ...filtered,
        {
          id,
          title,
          destructive: destructive ?? false,
          disabled: disabled ?? false,
          systemImage: systemImage ?? '',
        },
      ];
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
