import { createContext, useContext } from 'react';
import type { MenuItemConfig } from './types';

type ContextMenuContextValue = {
  registerItem: (item: MenuItemConfig) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
};

export const ContextMenuContext = createContext<ContextMenuContextValue>({
  registerItem: () => {},
  unregisterItem: () => {},
  updateHandler: () => {},
});

export const useContextMenu = () => useContext(ContextMenuContext);
