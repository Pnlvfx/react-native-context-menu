import type { ContextMenuPreviewProps } from './Preview';
import { useEffect } from 'react';
import { useContextMenu } from '../Root/RootContext';

export const Preview = (props: ContextMenuPreviewProps): undefined => {
  const { registerPreview, unregisterPreview } = useContextMenu();

  useEffect(() => {
    // Registers the preview with the parent Root so it renders inside the native view.
    registerPreview(props);

    return () => {
      unregisterPreview();
    };
  }, [props, registerPreview, unregisterPreview]);
};

Preview.displayName = 'ContextMenu.Preview';
