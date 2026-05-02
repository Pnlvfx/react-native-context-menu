import type { NativeContextMenuItem } from './ContextMenuViewNativeComponent';
import { createContext, use } from 'react';

export type RegisteredItem = NativeContextMenuItem & {
  onPress: (() => void) | undefined;
};

interface ContextMenuCommands {
  registerItem: (item: RegisteredItem) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
}

export const ContextMenuContext = createContext<ContextMenuCommands>({
  registerItem: () => {},
  unregisterItem: () => {},
  updateHandler: () => {},
});

export const useContextMenu = () => use(ContextMenuContext);
