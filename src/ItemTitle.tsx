import { useEffect, type ReactNode } from 'react';
import { useContextMenuItem } from './ItemContext';

export interface ContextMenuItemTitleProps {
  children: ReactNode;
}

export const ItemTitle = ({ children }: ContextMenuItemTitleProps) => {
  const { setTitle } = useContextMenuItem();

  if (typeof children !== 'string') {
    throw new Error('ItemTitle children must be a string.');
  }

  useEffect(() => {
    setTitle(children);

    return () => {
      setTitle('');
    };
  }, [children, setTitle]);

  return null;
};
