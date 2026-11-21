import { createContext, use } from 'react';
import type { NativeContextMenuItem } from '../native/ContextMenuViewNativeComponent';

export type RegisteredItem = NativeContextMenuItem & {
  onPress: (() => void) | undefined;
};

interface ContextMenuCommands {
  registerItem: (item: RegisteredItem) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
}

export const RootContext = createContext<ContextMenuCommands | undefined>(undefined);

export const useContextMenu = () => {
  const context = use(RootContext);
  if (!context) throw new Error('useContextMenu must be used within ContextMenu.Root.');
  return context;
};
