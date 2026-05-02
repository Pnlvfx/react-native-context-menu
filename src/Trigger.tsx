import type { ReactNode } from 'react';

export interface ContextMenuTriggerProps {
  children: ReactNode;
}

export const Trigger = ({ children }: ContextMenuTriggerProps) => {
  return children;
};
