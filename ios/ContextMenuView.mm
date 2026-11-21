#import "ContextMenuView.h"
#import "ContextMenuPreviewView.h"

#import <react/renderer/components/ContextMenuViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/ContextMenuViewSpec/EventEmitters.h>
#import <react/renderer/components/ContextMenuViewSpec/Props.h>
#import <react/renderer/components/ContextMenuViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@implementation ContextMenuView {
  UIContextMenuInteraction *_interaction;
  std::vector<ContextMenuViewMenuItemsStruct> _menuItems;
  BOOL _hasPreview;
  ContextMenuPreviewView *_previewView;
  UIViewController *_previewController;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<ContextMenuViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const ContextMenuViewProps>();
    _props = defaultProps;
    _interaction = [[UIContextMenuInteraction alloc] initWithDelegate:self];
    [self addInteraction:_interaction];
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &newProps = *std::static_pointer_cast<ContextMenuViewProps const>(props);
  _menuItems = newProps.menuItems;
  _hasPreview = newProps.hasPreview;
  [super updateProps:props oldProps:oldProps];
}

- (void)prepareForRecycle
{
  [super prepareForRecycle];
  _hasPreview = NO;
  _previewView = nil;
  _previewController = nil;
}

#pragma mark - Preview hosting

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  if (![childComponentView isKindOfClass:ContextMenuPreviewView.class]) {
    [super mountChildComponentView:childComponentView index:index];
    return;
  }

  __weak ContextMenuView *weakSelf = self;
  _previewView = (ContextMenuPreviewView *)childComponentView;
  _previewView.onPreferredSizeChange = ^{
    [weakSelf syncPreviewController];
  };
  [self syncPreviewController];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  if (childComponentView != _previewView) {
    [super unmountChildComponentView:childComponentView index:index];
    return;
  }

  [_previewView removeFromSuperview];
  _previewView.onPreferredSizeChange = nil;
  _previewView = nil;
}

- (void)syncPreviewController
{
  if (!_previewController || !_previewView) return;

  if (_previewView.superview != _previewController.view) {
    [_previewController.view addSubview:_previewView];
  }

  CGSize size = _previewView.preferredSize;
  if (size.width <= 0 || size.height <= 0) return;

  void (^applySize)(void) = ^{
    self->_previewController.preferredContentSize = size;
  };

  if (_previewView.isResizeAnimated) {
    applySize();
  } else {
    [UIView performWithoutAnimation:applySize];
  }
}

- (UIViewController *)makePreviewController
{
  UIViewController *controller = [[UIViewController alloc] init];
  controller.view.backgroundColor = UIColor.clearColor;
  controller.view.clipsToBounds = YES;
  _previewController = controller;
  [self syncPreviewController];
  return controller;
}

#pragma mark - Events

- (std::shared_ptr<const ContextMenuViewEventEmitter>)typedEventEmitter
{
  return std::dynamic_pointer_cast<const ContextMenuViewEventEmitter>(_eventEmitter);
}

#pragma mark - UIContextMenuInteractionDelegate

- (UIContextMenuConfiguration *)contextMenuInteraction:(UIContextMenuInteraction *)interaction
                       configurationForMenuAtLocation:(CGPoint)location
{
  __weak ContextMenuView *weakSelf = self;
  std::vector<ContextMenuViewMenuItemsStruct> itemsCopy = _menuItems;

  if (auto eventEmitter = [self typedEventEmitter]) {
    eventEmitter->onMenuWillCreate({});
  }

  UIContextMenuContentPreviewProvider previewProvider = nil;
  if (_hasPreview) {
    previewProvider = ^UIViewController * _Nullable {
      return [weakSelf makePreviewController];
    };
  }

  return [UIContextMenuConfiguration configurationWithIdentifier:nil
                                                 previewProvider:previewProvider
                                                  actionProvider:^UIMenu * _Nullable(NSArray<UIMenuElement *> * _Nonnull suggestedActions) {
    NSMutableArray<UIAction *> *actions = [NSMutableArray array];

    for (const auto &item : itemsCopy) {
      NSString *itemId = [NSString stringWithUTF8String:item.id.c_str()];
      NSString *title = [NSString stringWithUTF8String:item.title.c_str()];
      NSString *systemImageName = [NSString stringWithUTF8String:item.systemImage.c_str()];

      UIImage *image = systemImageName.length > 0
        ? [UIImage systemImageNamed:systemImageName]
        : nil;

      UIMenuElementAttributes attributes = 0;
      if (item.destructive) attributes |= UIMenuElementAttributesDestructive;
      if (item.disabled) attributes |= UIMenuElementAttributesDisabled;

      UIAction *action = [UIAction actionWithTitle:title
                                            image:image
                                       identifier:nil
                                          handler:^(__kindof UIAction * _Nonnull a) {
        ContextMenuView *strongSelf = weakSelf;
        if (!strongSelf) return;
        if (auto eventEmitter = [strongSelf typedEventEmitter]) {
          ContextMenuViewEventEmitter::OnMenuItemPress event;
          event.id = std::string([itemId UTF8String]);
          eventEmitter->onMenuItemPress(event);
        }
      }];
      action.attributes = attributes;
      [actions addObject:action];
    }

    return [UIMenu menuWithTitle:@"" children:actions];
  }];
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willDisplayMenuForConfiguration:(UIContextMenuConfiguration *)configuration
                         animator:(id<UIContextMenuInteractionAnimating>)animator
{
  if (auto eventEmitter = [self typedEventEmitter]) {
    eventEmitter->onMenuWillShow({});
  }
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willEndForConfiguration:(UIContextMenuConfiguration *)configuration
                      animator:(id<UIContextMenuInteractionAnimating>)animator
{
  if (auto eventEmitter = [self typedEventEmitter]) {
    eventEmitter->onMenuWillHide({});
  }

  __weak ContextMenuView *weakSelf = self;
  [animator addCompletion:^{
    ContextMenuView *strongSelf = weakSelf;
    if (!strongSelf) return;
    strongSelf->_previewController = nil;
    [strongSelf->_previewView removeFromSuperview];
    if (auto eventEmitter = [strongSelf typedEventEmitter]) {
      eventEmitter->onMenuDidHide({});
    }
  }];
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willPerformPreviewActionForMenuWithConfiguration:(UIContextMenuConfiguration *)configuration
                         animator:(id<UIContextMenuInteractionCommitAnimating>)animator
{
  if (_previewView) {
    animator.preferredCommitStyle = _previewView.preferredCommitStyle;
  }

  if (auto eventEmitter = [self typedEventEmitter]) {
    eventEmitter->onPreviewPress({});
  }
}

@end

Class<RCTComponentViewProtocol> ContextMenuViewCls(void)
{
  return ContextMenuView.class;
}
