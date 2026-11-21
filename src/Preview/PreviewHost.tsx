import type { ContextMenuPreviewProps, ContextMenuPreviewSize } from './Preview';
import { useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, useWindowDimensions, View } from 'react-native';
import ContextMenuPreviewNativeView from '../native/ContextMenuPreviewViewNativeComponent';

export const PreviewHost = ({ children: renderPreview, size, backgroundColor, borderRadius, preferredCommitStyle, isResizeAnimated }: ContextMenuPreviewProps) => {
  const window = useWindowDimensions();
  const [measuredSize, setMeasuredSize] = useState<ContextMenuPreviewSize | undefined>();

  const preferredSize = size ?? measuredSize;
  const hostSize = preferredSize ?? { width: window.width, height: window.height };
  const hostAppearance = { backgroundColor, borderRadius };

  const handleContentLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setMeasuredSize({ width: layout.width, height: layout.height });
  };

  return (
    <ContextMenuPreviewNativeView
      isResizeAnimated={isResizeAnimated}
      preferredCommitStyle={preferredCommitStyle}
      preferredHeight={preferredSize?.height}
      preferredWidth={preferredSize?.width}
      style={[styles.host, hostSize, hostAppearance]}
    >
      <View onLayout={size === undefined ? handleContentLayout : undefined} style={size ?? styles.content}>
        {renderPreview()}
      </View>
    </ContextMenuPreviewNativeView>
  );
};

const styles = StyleSheet.create({
  host: { position: 'absolute', top: 0, left: 0, overflow: 'hidden' },
  content: { alignSelf: 'flex-start' },
});
