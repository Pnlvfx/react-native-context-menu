import { useEffect, useState } from 'react';
import type { ContextMenuItemProps } from './Item';
import { useContextMenu } from './ContextMenuContext';
import { ItemContext } from './ItemContext';

export const Item = ({
  id,
  destructive = false,
  disabled = false,
  onPress,
  children,
}: ContextMenuItemProps) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const { registerItem, unregisterItem } = useContextMenu();

  useEffect(() => {
    registerItem({
      id,
      title,
      destructive,
      disabled,
      systemImage: icon,
      onPress,
    });

    return () => {
      unregisterItem(id);
    };
  }, [
    id,
    title,
    destructive,
    disabled,
    icon,
    registerItem,
    unregisterItem,
    onPress,
  ]);

  return <ItemContext value={{ setTitle, setIcon }}>{children}</ItemContext>;
};
