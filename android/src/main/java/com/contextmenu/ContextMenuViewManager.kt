package com.contextmenu

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.ContextMenuViewManagerInterface
import com.facebook.react.viewmanagers.ContextMenuViewManagerDelegate

@ReactModule(name = ContextMenuViewManager.NAME)
class ContextMenuViewManager : SimpleViewManager<ContextMenuView>(),
  ContextMenuViewManagerInterface<ContextMenuView> {
  private val mDelegate: ViewManagerDelegate<ContextMenuView>

  init {
    mDelegate = ContextMenuViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<ContextMenuView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ContextMenuView {
    return ContextMenuView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: ContextMenuView?, color: Int?) {
    view?.setBackgroundColor(color ?: Color.TRANSPARENT)
  }

  companion object {
    const val NAME = "ContextMenuView"
  }
}
