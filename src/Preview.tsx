import type { ReactNode } from 'react';

export interface ContextMenuPreviewProps {
  children: () => ReactNode;
  onPress?: () => void;
  borderRadius?: number;
}

// eslint-disable-next-line unicorn/no-useless-undefined
export const Preview = (_props: ContextMenuPreviewProps) => undefined;
