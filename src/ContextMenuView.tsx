import type { ColorValue, ViewProps } from 'react-native';

type Props = ViewProps & {
  color?: ColorValue;
};

export function ContextMenuView(_props: Props): never {
  throw new Error(
    "'react-native-context-menu' is only supported on native platforms."
  );
}
