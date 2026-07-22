import type { SFSymbol } from 'sf-symbols-typescript';

export interface ContextMenuItemIconProps {
  ios?: SFSymbol;
  androidIconName?: string;
}

// eslint-disable-next-line unicorn/no-useless-undefined
export const ItemIcon = (_props: ContextMenuItemIconProps) => undefined;
