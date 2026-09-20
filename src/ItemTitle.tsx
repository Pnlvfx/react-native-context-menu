import type { ReactNode } from 'react';

export interface ContextMenuItemTitleProps {
  children: ReactNode;
}

export const ItemTitle = ({ children }: ContextMenuItemTitleProps) => children;

ItemTitle.displayName = 'ContextMenu.ItemTitle';
