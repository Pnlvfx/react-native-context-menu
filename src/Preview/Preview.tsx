import type { ReactNode } from 'react';
import type { ColorValue } from 'react-native';

export interface ContextMenuPreviewSize {
  readonly width: number;
  readonly height: number;
}

export interface ContextMenuPreviewProps {
  readonly children: () => ReactNode;
  readonly size?: ContextMenuPreviewSize;
  readonly backgroundColor?: ColorValue;
  readonly borderRadius?: number;
  readonly preferredCommitStyle?: 'pop' | 'dismiss';
  readonly isResizeAnimated?: boolean;
  readonly onPress?: () => void;
}

export const Preview = (_props: ContextMenuPreviewProps): undefined => {
  // Previews are only supported on iOS, so this renders nothing on other platforms.
};

Preview.displayName = 'ContextMenu.Preview';
