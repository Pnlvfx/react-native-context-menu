import { useEffect } from 'react';
import { useContextMenu } from './ContextMenuContext';

type ItemProps = {
  id: string;
  title: string;
  destructive?: boolean;
  disabled?: boolean;
  systemImage?: string;
  onPress?: () => void;
};

export const Item = ({
  id,
  title,
  destructive = false,
  disabled = false,
  systemImage = '',
  onPress,
}: ItemProps) => {
  const { registerItem, unregisterItem } = useContextMenu();

  useEffect(() => {
    registerItem({
      id,
      title,
      destructive,
      disabled,
      systemImage,
      onPress,
    });
    return () => unregisterItem(id);
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

  return undefined;
};
