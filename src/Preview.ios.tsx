import type { ReactNode } from 'react';
import { StyleSheet, type ViewStyle, View } from 'react-native';
import { useContextMenuPreview } from './Root.ios';

export interface ContextMenuPreviewProps {
  readonly children: () => ReactNode;
  readonly onPress?: () => void;
  readonly borderRadius?: number;
}

export const Preview = ({ borderRadius, children, onPress }: ContextMenuPreviewProps) => {
  useContextMenuPreview({ borderRadius, onPress });

  return (
    <View
      nativeID="ContextMenuPreview"
      pointerEvents="none"
      style={styles.offscreen}
    >
      {children()}
    </View>
  );
};

const styles = StyleSheet.create<{ offscreen: ViewStyle }>({
  // Positioned off-screen so it lays out naturally (gets real size from children)
  // but doesn't appear in the visible UI. The native side reads its bounds
  // and moves it into the preview UIViewController.
  offscreen: {
    position: 'absolute',
    left: -10_000,
    top: 0,
  },
});
