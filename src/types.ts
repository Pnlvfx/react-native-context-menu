export type MenuItemConfig = {
  id: string;
  title: string;
  destructive?: boolean;
  disabled?: boolean;
  systemImage?: string;
  onPress?: () => void;
};

export type NativeMenuItemData = {
  id: string;
  title: string;
  destructive: boolean;
  disabled: boolean;
  systemImage: string;
};
