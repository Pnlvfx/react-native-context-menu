import type { ReactNode } from 'react';

type RootProps = {
  children: ReactNode;
};

export const Root = (_props: RootProps): never => {
  throw new Error(
    'react-native-context-menu is only supported on native platforms.'
  );
};
