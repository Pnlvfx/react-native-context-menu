import { useEffect, useState, type ReactNode } from 'react';
import { useContextMenu } from './ContextMenuContext';
import { ItemContext } from './ItemContext';

export interface ContextMenuItemProps {
  id: string;
  destructive?: boolean;
  disabled?: boolean;
  systemImage?: string;
  onPress?: () => void;
  children?: ReactNode;
}

export const Item = ({
  id,
  destructive = false,
  disabled = false,
  systemImage = '',
  onPress,
  children,
}: ContextMenuItemProps) => {
  const [title, setTitle] = useState('');
  const { registerItem, unregisterItem } = useContextMenu();

  useEffect(() => {
    registerItem({ id, title, destructive, disabled, systemImage, onPress });

    return () => {
      unregisterItem(id);
    };
  }, [
    id,
    title,
    destructive,
    disabled,
    systemImage,
    registerItem,
    unregisterItem,
    onPress,
  ]);

  return <ItemContext value={{ setTitle }}>{children}</ItemContext>;
};
