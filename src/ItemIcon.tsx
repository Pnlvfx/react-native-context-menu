import type { SFSymbol } from 'sf-symbols-typescript';
import { useEffect } from 'react';
import { useContextMenuItem } from './ItemContext';

export interface ContextMenuItemIconProps {
  ios?: SFSymbol;
  androidIconName?: string;
}

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
