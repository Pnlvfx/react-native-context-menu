import {
  type ViewProps,
  type CodegenTypes,
  codegenNativeComponent,
} from 'react-native';

interface MenuItemPressEvent {
  readonly id: string;
}

export interface NativeContextMenuItem {
  readonly id: string;
  readonly title: string;
  readonly destructive: boolean;
  readonly disabled: boolean;
  readonly systemImage: string;
}

interface NativeProps extends ViewProps {
  menuItems?: ReadonlyArray<NativeContextMenuItem>;
  onMenuItemPress?: CodegenTypes.DirectEventHandler<MenuItemPressEvent>;
}

export default codegenNativeComponent<NativeProps>('ContextMenuView');
