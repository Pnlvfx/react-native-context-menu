import { type ViewProps, type CodegenTypes, codegenNativeComponent } from 'react-native';

interface NativeProps extends ViewProps {
  preferredWidth?: CodegenTypes.WithDefault<CodegenTypes.Float, 0>;
  preferredHeight?: CodegenTypes.WithDefault<CodegenTypes.Float, 0>;
  preferredCommitStyle?: CodegenTypes.WithDefault<'pop' | 'dismiss', 'pop'>;
  isResizeAnimated?: CodegenTypes.WithDefault<boolean, true>;
}

export default codegenNativeComponent<NativeProps>('ContextMenuPreviewView');
