import { type ViewProps, type CodegenTypes, codegenNativeComponent } from 'react-native';

interface MenuItemPressEvent {
  readonly id: string;
}

// eslint-disable-next-line @typescript-eslint/no-generated-empty-object-type, @typescript-eslint/no-empty-object-type
type MenuLifecycleEvent = Readonly<{}>;

export interface NativeContextMenuItem {
  readonly id: string;
  readonly title: string;
  readonly destructive: boolean;
  readonly disabled: boolean;
  readonly systemImage: string;
}

interface NativeProps extends ViewProps {
  menuItems?: readonly NativeContextMenuItem[];
  hasPreview?: CodegenTypes.WithDefault<boolean, false>;
  onMenuItemPress?: CodegenTypes.DirectEventHandler<MenuItemPressEvent>;
  onMenuWillCreate?: CodegenTypes.DirectEventHandler<MenuLifecycleEvent>;
  onMenuWillShow?: CodegenTypes.DirectEventHandler<MenuLifecycleEvent>;
  onMenuWillHide?: CodegenTypes.DirectEventHandler<MenuLifecycleEvent>;
  onMenuDidHide?: CodegenTypes.DirectEventHandler<MenuLifecycleEvent>;
  onPreviewPress?: CodegenTypes.DirectEventHandler<MenuLifecycleEvent>;
}

export default codegenNativeComponent<NativeProps>('ContextMenuView');
