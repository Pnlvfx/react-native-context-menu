import type { ReactNode } from 'react';

export interface ContextMenuItemProps {
  id: string;
  destructive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: ReactNode;
}

export const Item = ({ children }: ContextMenuItemProps) => children;
