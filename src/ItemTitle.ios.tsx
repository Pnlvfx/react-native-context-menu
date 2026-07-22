import { useContextMenuItem } from './Item.ios';
import type { ContextMenuItemTitleProps } from './ItemTitle';
import { useEffect } from 'react';

export const ItemTitle = ({ children }: ContextMenuItemTitleProps) => {
  const { setTitle } = useContextMenuItem();

  if (typeof children !== 'string') {
    throw new TypeError('ItemTitle children must be a string.');
  }

  useEffect(() => {
    setTitle(children);

    return () => {
      setTitle('');
    };
  }, [children, setTitle]);

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};
