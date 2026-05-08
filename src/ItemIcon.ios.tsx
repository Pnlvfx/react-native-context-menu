import { useEffect } from 'react';
import { useContextMenuItem } from './ItemContext';
import type { ContextMenuItemIconProps } from './ItemIcon';

export const ItemIcon = ({ ios }: ContextMenuItemIconProps) => {
  const { setIcon } = useContextMenuItem();

  useEffect(() => {
    if (ios !== undefined) {
      setIcon(ios);
    }

    return () => {
      setIcon('');
    };
  }, [ios, setIcon]);

  return undefined;
};
