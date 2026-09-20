#import "ContextMenuView.h"

#import <react/renderer/components/ContextMenuViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/ContextMenuViewSpec/EventEmitters.h>
#import <react/renderer/components/ContextMenuViewSpec/Props.h>
#import <react/renderer/components/ContextMenuViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNContextMenuPreviewViewController : UIViewController
@property (nonatomic, weak) UIView *previewView;
@end

@implementation RNContextMenuPreviewViewController

- (void)viewDidLoad
{
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor clearColor];
  if (self.previewView) {
    CGRect frame = self.previewView.bounds;
    frame.origin = CGPointZero;
    self.previewView.frame = frame;
    [self.view addSubview:self.previewView];
  }
}

- (void)viewDidLayoutSubviews
{
  [super viewDidLayoutSubviews];
  CGRect frame = self.previewView.bounds;
  frame.origin = CGPointZero;
  self.previewView.frame = frame;
}

@end

@implementation ContextMenuView {
  UIContextMenuInteraction *_interaction;
  std::vector<ContextMenuViewMenuItemsStruct> _menuItems;
  CGFloat _previewBorderRadius;
  BOOL _hasPreview;
  UIView *_previewContainerView;
  UIView *_previewOriginalSuperview;
  RNContextMenuPreviewViewController *_previewViewController;
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
    _previewBorderRadius = 0;
    _hasPreview = NO;
    _interaction = [[UIContextMenuInteraction alloc] initWithDelegate:self];
    [self addInteraction:_interaction];
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &newProps = *std::static_pointer_cast<ContextMenuViewProps const>(props);
  _menuItems = newProps.menuItems;
  _previewBorderRadius = (CGFloat)newProps.previewBorderRadius;
  _hasPreview = newProps.hasPreview;
  [super updateProps:props oldProps:oldProps];
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [super mountChildComponentView:childComponentView index:index];

  if (_hasPreview && _previewContainerView == nil) {
    _previewContainerView = [self findPreviewContainer];
  }
}

- (UIView *)findPreviewContainer
{
  for (UIView *subview in self.subviews) {
    if ([subview.accessibilityIdentifier isEqualToString:@"ContextMenuPreview"]) {
      return subview;
    }
  }
  return nil;
}

#pragma mark - UIContextMenuInteractionDelegate

- (UIContextMenuConfiguration *)contextMenuInteraction:(UIContextMenuInteraction *)interaction
                       configurationForMenuAtLocation:(CGPoint)location
{
  __weak ContextMenuView *weakSelf = self;
  std::vector<ContextMenuViewMenuItemsStruct> itemsCopy = _menuItems;

  UIContextMenuContentPreviewProvider previewProvider = nil;

  if (_hasPreview) {
    UIView *previewView = [self findPreviewContainer];
    if (previewView != nil) {
      __weak UIView *weakPreviewView = previewView;
      previewProvider = ^UIViewController * _Nullable {
        ContextMenuView *strongSelf = weakSelf;
        UIView *strongPreviewView = weakPreviewView;
        if (!strongSelf || !strongPreviewView) return nil;

        RNContextMenuPreviewViewController *vc = [[RNContextMenuPreviewViewController alloc] init];
        vc.previewView = strongPreviewView;

        CGSize size = strongPreviewView.bounds.size;
        if (size.width <= 0 || size.height <= 0) {
          size = strongPreviewView.intrinsicContentSize;
        }
        if (size.width <= 0 || size.height <= 0) {
          size = CGSizeMake(UIScreen.mainScreen.bounds.size.width - 40, 200);
        }
        vc.preferredContentSize = size;

        if (strongSelf->_previewBorderRadius > 0) {
          vc.view.layer.cornerRadius = strongSelf->_previewBorderRadius;
          vc.view.layer.masksToBounds = YES;
        }

        strongSelf->_previewViewController = vc;
        strongSelf->_previewOriginalSuperview = strongPreviewView.superview;
        return vc;
      };
    }
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
        auto eventEmitter = std::dynamic_pointer_cast<const ContextMenuViewEventEmitter>(strongSelf->_eventEmitter);
        if (eventEmitter) {
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

- (UITargetedPreview *)contextMenuInteraction:(UIContextMenuInteraction *)interaction
    previewForHighlightingMenuWithConfiguration:(UIContextMenuConfiguration *)configuration
{
  UIPreviewParameters *params = [[UIPreviewParameters alloc] init];
  if (_previewBorderRadius > 0) {
    UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:self.bounds
                                                   cornerRadius:_previewBorderRadius];
    params.visiblePath = path;
  }
  params.backgroundColor = [UIColor clearColor];
  return [[UITargetedPreview alloc] initWithView:self parameters:params];
}

- (UITargetedPreview *)contextMenuInteraction:(UIContextMenuInteraction *)interaction
    previewForDismissingMenuWithConfiguration:(UIContextMenuConfiguration *)configuration
{
  UIPreviewParameters *params = [[UIPreviewParameters alloc] init];
  if (_previewBorderRadius > 0) {
    UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:self.bounds
                                                   cornerRadius:_previewBorderRadius];
    params.visiblePath = path;
  }
  params.backgroundColor = [UIColor clearColor];
  return [[UITargetedPreview alloc] initWithView:self parameters:params];
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willDisplayMenuForConfiguration:(UIContextMenuConfiguration *)configuration
                         animator:(id<UIContextMenuInteractionAnimating>)animator
{
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willEndForConfiguration:(UIContextMenuConfiguration *)configuration
                      animator:(id<UIContextMenuInteractionAnimating>)animator
{
  if (_previewViewController != nil) {
    UIView *previewView = _previewViewController.previewView;
    UIView *originalSuperview = _previewOriginalSuperview;
    [animator addCompletion:^{
      if (previewView && originalSuperview) {
        [originalSuperview addSubview:previewView];
      }
    }];
    _previewViewController = nil;
    _previewOriginalSuperview = nil;
  }
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
    willPerformPreviewActionForMenuWith:(UIContextMenuConfiguration *)configuration
                              animator:(id<UIContextMenuInteractionCommitAnimating>)animator
{
  __weak ContextMenuView *weakSelf = self;
  [animator addAnimations:^{}];
  [animator addCompletion:^{
    ContextMenuView *strongSelf = weakSelf;
    if (!strongSelf) return;
    auto eventEmitter = std::dynamic_pointer_cast<const ContextMenuViewEventEmitter>(strongSelf->_eventEmitter);
    if (eventEmitter) {
      ContextMenuViewEventEmitter::OnPreviewPress event;
      event.id = std::string("");
      eventEmitter->onPreviewPress(event);
    }
  }];
}

@end

Class<RCTComponentViewProtocol> ContextMenuViewCls(void)
{
  return ContextMenuView.class;
}
