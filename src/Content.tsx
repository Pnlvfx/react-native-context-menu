import type { ReactNode } from 'react';

interface ContextMenuContentProps {
  readonly children: ReactNode;
}

export const Content = ({ children }: ContextMenuContentProps) => children;

Content.displayName = 'ContextMenu.Content';
