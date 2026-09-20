import { type ViewProps, type CodegenTypes, codegenNativeComponent } from 'react-native';

interface MenuItemPressEvent {
  readonly id: string;
}

interface PreviewPressEvent {
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
  menuItems?: readonly NativeContextMenuItem[];
  onMenuItemPress?: CodegenTypes.DirectEventHandler<MenuItemPressEvent>;
  previewBorderRadius?: CodegenTypes.Float;
  hasPreview?: boolean;
  onPreviewPress?: CodegenTypes.DirectEventHandler<PreviewPressEvent>;
}

export default codegenNativeComponent<NativeProps>('ContextMenuView');
