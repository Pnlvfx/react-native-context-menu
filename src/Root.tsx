import type { RootProps } from './Root.native';

export const Root = (_props: RootProps): never => {
  throw new Error(
    'react-native-context-menu is only supported on native platforms.'
  );
};
