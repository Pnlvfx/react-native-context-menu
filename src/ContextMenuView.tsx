import type { ColorValue, ViewProps } from 'react-native';

interface Props extends ViewProps {
  readonly color?: ColorValue;
}

export function ContextMenuView(_props: Props): never {
  throw new Error(
    "'@simonegauli/react-native-context-menu' is only supported on native platforms."
  );
}
