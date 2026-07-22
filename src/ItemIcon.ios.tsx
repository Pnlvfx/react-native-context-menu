import type { ContextMenuItemIconProps } from './ItemIcon';
import { useEffect } from 'react';
import { useContextMenuItem } from './ItemContext';

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

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};
