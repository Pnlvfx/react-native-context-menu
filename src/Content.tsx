import type { ReactNode } from 'react';

type ContentProps = {
  children: ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  return <>{children}</>;
};
