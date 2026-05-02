import type { ContextMenuRootProps } from './Root.native';

export const Root = (_props: ContextMenuRootProps): never => {
  throw new Error(
    '@simonegauli/react-native-context-menu is only supported on native platforms.'
  );
};
