import type { ContextMenuRootProps } from './Root';
import ContextMenuNativeView, { type NativeContextMenuItem } from './ContextMenuViewNativeComponent';
import { createContext, use, useRef, useState } from 'react';

export type RegisteredItem = NativeContextMenuItem & {
  onPress: (() => void) | undefined;
};

interface ContextMenuCommands {
  registerItem: (item: RegisteredItem) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
}

const Context = createContext<ContextMenuCommands | undefined>(undefined);

export const Root = ({ children, style }: ContextMenuRootProps) => {
  const [nativeItems, setNativeItems] = useState<NativeContextMenuItem[]>([]);
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

  const handleMenuItemPress = (event: { nativeEvent: { id: string } }) => {
    handlersRef.current.get(event.nativeEvent.id)?.();
  };

  return (
    <Context value={{ registerItem, unregisterItem, updateHandler }}>
      <ContextMenuNativeView menuItems={nativeItems} onMenuItemPress={handleMenuItemPress} style={style}>
        {children}
      </ContextMenuNativeView>
    </Context>
  );
};

export const useContextMenu = () => {
  const context = use(Context);
  if (!context) throw new Error('useContextMenu must be used within ContextMenu.Root.');
  return context;
};
