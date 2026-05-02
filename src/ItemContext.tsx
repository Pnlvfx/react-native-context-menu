import { createContext, use } from 'react';

export interface ItemCommands {
  setTitle: (title: string) => void;
  setIcon: (name: string) => void;
}

export const ItemContext = createContext<ItemCommands>({
  setTitle: () => {},
  setIcon: () => {},
});

export const useContextMenuItem = () => {
  const context = use(ItemContext);
  if (!context)
    throw new Error('useCtxMenuItem must be used within ContextMenu.Item');
  return context;
};
