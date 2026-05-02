import type { ReactNode } from 'react';

interface ContentProps {
  readonly children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return <>{children}</>;
};
