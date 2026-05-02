import { useEffect, useLayoutEffect, useRef } from 'react';
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
  const { registerItem, unregisterItem, updateHandler } = useContextMenu();

  const onPressRef = useRef(onPress);
  useLayoutEffect(() => {
    onPressRef.current = onPress;
  });

  useEffect(() => {
    registerItem({
      id,
      title,
      destructive,
      disabled,
      systemImage,
      onPress: () => onPressRef.current?.(),
    });
    return () => unregisterItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, title, destructive, disabled, systemImage]);

  useEffect(() => {
    updateHandler(id, () => onPressRef.current?.());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return null;
};
