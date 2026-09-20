import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ContextMenuRootProps {
  readonly children: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
  readonly previewBorderRadius?: number;
}

export const Root = ({ children }: ContextMenuRootProps) => children;
