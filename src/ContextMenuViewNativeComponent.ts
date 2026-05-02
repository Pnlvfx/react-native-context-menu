import type { ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';
import type { CodegenTypes } from 'react-native';

type MenuItemPressEvent = Readonly<{
  id: string;
}>;

type NativeMenuItem = Readonly<{
  id: string;
  title: string;
  destructive: boolean;
  disabled: boolean;
  systemImage: string;
}>;

interface NativeProps extends ViewProps {
  menuItems?: ReadonlyArray<NativeMenuItem>;
  onMenuItemPress?: CodegenTypes.DirectEventHandler<MenuItemPressEvent>;
}

export default codegenNativeComponent<NativeProps>('ContextMenuView');
