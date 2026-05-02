#import "ContextMenuView.h"

#import <react/renderer/components/ContextMenuViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/ContextMenuViewSpec/EventEmitters.h>
#import <react/renderer/components/ContextMenuViewSpec/Props.h>
#import <react/renderer/components/ContextMenuViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@implementation ContextMenuView {
  UIContextMenuInteraction *_interaction;
  std::vector<ContextMenuViewMenuItemsStruct> _menuItems;
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
  [super updateProps:props oldProps:oldProps];
}

#pragma mark - UIContextMenuInteractionDelegate

- (UIContextMenuConfiguration *)contextMenuInteraction:(UIContextMenuInteraction *)interaction
                       configurationForMenuAtLocation:(CGPoint)location
{
  __weak ContextMenuView *weakSelf = self;
  std::vector<ContextMenuViewMenuItemsStruct> itemsCopy = _menuItems;

  return [UIContextMenuConfiguration configurationWithIdentifier:nil
                                                 previewProvider:nil
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

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willDisplayMenuForConfiguration:(UIContextMenuConfiguration *)configuration
                         animator:(id<UIContextMenuInteractionAnimating>)animator
{
}

- (void)contextMenuInteraction:(UIContextMenuInteraction *)interaction
       willEndForConfiguration:(UIContextMenuConfiguration *)configuration
                      animator:(id<UIContextMenuInteractionAnimating>)animator
{
}

@end

Class<RCTComponentViewProtocol> ContextMenuViewCls(void)
{
  return ContextMenuView.class;
}
