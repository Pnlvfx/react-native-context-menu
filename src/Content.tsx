import type { ReactNode } from 'react';

interface ContextMenuContentProps {
  readonly children: ReactNode;
}

export const Content = ({ children }: ContextMenuContentProps) => {
  return children;
};
