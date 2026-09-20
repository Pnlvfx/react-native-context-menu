import type { ContextMenuRootProps } from './Root';
import ContextMenuNativeView, { type NativeContextMenuItem } from './ContextMenuViewNativeComponent';
import { createContext, use, useEffect, useRef, useState } from 'react';

export type RegisteredItem = NativeContextMenuItem & {
  onPress: (() => void) | undefined;
};

interface PreviewConfig {
  onPress: (() => void) | undefined;
  borderRadius: number | undefined;
}

interface ContextMenuCommands {
  registerItem: (item: RegisteredItem) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
}

interface ContextMenuPreviewCommands {
  registerPreview: (config: PreviewConfig) => void;
  unregisterPreview: () => void;
}

const Context = createContext<ContextMenuCommands | undefined>(undefined);
const PreviewContext = createContext<ContextMenuPreviewCommands | undefined>(undefined);

export const Root = ({ children, style, previewBorderRadius }: ContextMenuRootProps) => {
  const [nativeItems, setNativeItems] = useState<NativeContextMenuItem[]>([]);
  const handlersRef = useRef<Map<string, () => void>>(new Map());
  const [previewConfig, setPreviewConfig] = useState<PreviewConfig | undefined>(undefined);

  const registerItem = ({ onPress, id, title, destructive, disabled, systemImage }: RegisteredItem) => {
    if (onPress !== undefined) {
      handlersRef.current.set(id, onPress);
    }
    setNativeItems((prev) => [...prev.filter((i) => i.id !== id), { id, title, destructive, disabled, systemImage }]);
  };

  const unregisterItem = (id: string) => {
    handlersRef.current.delete(id);
    setNativeItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateHandler = (id: string, onPress: (() => void) | undefined) => {
    if (onPress === undefined) {
      handlersRef.current.delete(id);
    } else {
      handlersRef.current.set(id, onPress);
    }
  };

  const registerPreview = (config: PreviewConfig) => {
    setPreviewConfig(config);
  };

  const unregisterPreview = () => {
    setPreviewConfig(undefined);
  };

  const handleMenuItemPress = (event: { nativeEvent: { id: string } }) => {
    handlersRef.current.get(event.nativeEvent.id)?.();
  };

  const handlePreviewPress = () => {
    previewConfig?.onPress?.();
  };

  const effectiveBorderRadius = previewConfig?.borderRadius ?? previewBorderRadius;
  const hasPreview = previewConfig !== undefined;

  return (
    <PreviewContext value={{ registerPreview, unregisterPreview }}>
      <Context value={{ registerItem, unregisterItem, updateHandler }}>
        <ContextMenuNativeView
          hasPreview={hasPreview}
          menuItems={nativeItems}
          onMenuItemPress={handleMenuItemPress}
          onPreviewPress={handlePreviewPress}
          previewBorderRadius={effectiveBorderRadius}
          style={style}
        >
          {children}
        </ContextMenuNativeView>
      </Context>
    </PreviewContext>
  );
};

export const useContextMenu = () => {
  const context = use(Context);
  if (!context) throw new Error('useContextMenu must be used within ContextMenu.Root.');
  return context;
};

export const useContextMenuPreview = ({ onPress, borderRadius }: { onPress: (() => void) | undefined; borderRadius: number | undefined }) => {
  const context = use(PreviewContext);
  if (!context) throw new Error('useContextMenuPreview must be used within ContextMenu.Root.');

  const { registerPreview, unregisterPreview } = context;

  useEffect(() => {
    registerPreview({ onPress, borderRadius });
    return () => {
      unregisterPreview();
    };
  }, [registerPreview, unregisterPreview, onPress, borderRadius]);
};
