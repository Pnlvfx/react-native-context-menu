import type { ContextMenuItemProps } from './Item';
import { createContext, use } from 'react';

interface ContextMenuCommands {
  registerItem: (item: ContextMenuItemProps) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
}

export const ContextMenuContext = createContext<ContextMenuCommands>({
  registerItem: () => {},
  unregisterItem: () => {},
  updateHandler: () => {},
});

export const useContextMenu = () => use(ContextMenuContext);
