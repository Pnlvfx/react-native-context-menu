import type { ContextMenuItemProps } from './Item';
import { createContext, use, useEffect, useState } from 'react';
import { useContextMenu } from './Root.ios';

export interface ItemCommands {
  setTitle: (title: string) => void;
  setIcon: (name: string) => void;
}

export const ItemContext = createContext<ItemCommands | undefined>(undefined);

export const Item = ({ id, destructive = false, disabled = false, onPress, children }: ContextMenuItemProps) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const { registerItem, unregisterItem } = useContextMenu();

  useEffect(() => {
    registerItem({ id, title, destructive, disabled, systemImage: icon, onPress });

    return () => {
      unregisterItem(id);
    };
  }, [id, title, destructive, disabled, icon, registerItem, unregisterItem, onPress]);

  return <ItemContext value={{ setTitle, setIcon }}>{children}</ItemContext>;
};

export const useContextMenuItem = () => {
  const context = use(ItemContext);
  if (!context) throw new Error('useContextMenuItem must be used within ContextMenu.Item');
  return context;
};
