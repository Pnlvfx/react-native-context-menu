#import "ContextMenuPreviewView.h"

#import <react/renderer/components/ContextMenuViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/ContextMenuViewSpec/EventEmitters.h>
#import <react/renderer/components/ContextMenuViewSpec/Props.h>
#import <react/renderer/components/ContextMenuViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@implementation ContextMenuPreviewView

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<ContextMenuPreviewViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const ContextMenuPreviewViewProps>();
    _props = defaultProps;
    _isResizeAnimated = YES;
    _preferredCommitStyle = UIContextMenuInteractionCommitStylePop;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &newProps = *std::static_pointer_cast<ContextMenuPreviewViewProps const>(props);

  _preferredSize = CGSizeMake(newProps.preferredWidth, newProps.preferredHeight);
  _isResizeAnimated = newProps.isResizeAnimated;
  _preferredCommitStyle = newProps.preferredCommitStyle == ContextMenuPreviewViewPreferredCommitStyle::Dismiss
    ? UIContextMenuInteractionCommitStyleDismiss
    : UIContextMenuInteractionCommitStylePop;

  [super updateProps:props oldProps:oldProps];

  if (self.onPreferredSizeChange) {
    self.onPreferredSizeChange();
  }
}

- (void)prepareForRecycle
{
  [super prepareForRecycle];
  _preferredSize = CGSizeZero;
  _isResizeAnimated = YES;
  _preferredCommitStyle = UIContextMenuInteractionCommitStylePop;
  self.onPreferredSizeChange = nil;
}

@end

Class<RCTComponentViewProtocol> ContextMenuPreviewViewCls(void)
{
  return ContextMenuPreviewView.class;
}
