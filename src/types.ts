export interface MenuItemConfig {
  id: string;
  title: string;
  destructive?: boolean;
  disabled?: boolean;
  systemImage?: string;
  onPress?: () => void;
}

export interface NativeMenuItemData {
  id: string;
  title: string;
  destructive: boolean;
  disabled: boolean;
  systemImage: string;
}
