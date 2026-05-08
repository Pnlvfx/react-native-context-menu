package com.contextmenu

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.ContextMenuViewManagerDelegate
import com.facebook.react.viewmanagers.ContextMenuViewManagerInterface

@ReactModule(name = ContextMenuViewManager.NAME)
internal class ContextMenuViewManager : SimpleViewManager<ContextMenuView>(),
  ContextMenuViewManagerInterface<ContextMenuView> {

  private val mDelegate: ViewManagerDelegate<ContextMenuView> = ContextMenuViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<ContextMenuView> = mDelegate

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): ContextMenuView =
    ContextMenuView(context)

  override fun setMenuItems(view: ContextMenuView?, value: ReadableArray?) = Unit

  companion object {
    const val NAME = "ContextMenuView"
  }
}
