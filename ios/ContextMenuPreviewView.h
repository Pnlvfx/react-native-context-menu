#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ContextMenuPreviewView : RCTViewComponentView

@property (nonatomic, readonly) CGSize preferredSize;
@property (nonatomic, readonly) BOOL isResizeAnimated;
@property (nonatomic, readonly) UIContextMenuInteractionCommitStyle preferredCommitStyle;
@property (nonatomic, copy, nullable) void (^onPreferredSizeChange)(void);

@end

NS_ASSUME_NONNULL_END
