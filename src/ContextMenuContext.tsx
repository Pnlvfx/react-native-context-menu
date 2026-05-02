import type { MenuItemConfig } from './types';
import { createContext, use } from 'react';

interface ContextMenuContextValue {
  registerItem: (item: MenuItemConfig) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextValue>({
  registerItem: () => {},
  unregisterItem: () => {},
  updateHandler: () => {},
});

export const useContextMenu = () => use(ContextMenuContext);
