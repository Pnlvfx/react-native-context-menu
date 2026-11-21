import type { NativeContextMenuItem } from '../native/ContextMenuViewNativeComponent';
import type { ContextMenuPreviewProps } from '../Preview/Preview';
import { createContext, use } from 'react';

export type RegisteredItem = NativeContextMenuItem & {
  onPress: (() => void) | undefined;
};

interface ContextMenuCommands {
  registerItem: (item: RegisteredItem) => void;
  unregisterItem: (id: string) => void;
  updateHandler: (id: string, onPress: (() => void) | undefined) => void;
  registerPreview: (preview: ContextMenuPreviewProps) => void;
  unregisterPreview: () => void;
}

export const RootContext = createContext<ContextMenuCommands | undefined>(undefined);

export const useContextMenu = () => {
  const context = use(RootContext);
  if (!context) throw new Error('useContextMenu must be used within ContextMenu.Root.');
  return context;
};
