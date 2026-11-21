package com.contextmenu

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.ContextMenuPreviewViewManagerDelegate
import com.facebook.react.viewmanagers.ContextMenuPreviewViewManagerInterface

@ReactModule(name = ContextMenuPreviewViewManager.NAME)
internal class ContextMenuPreviewViewManager : SimpleViewManager<ContextMenuPreviewView>(),
  ContextMenuPreviewViewManagerInterface<ContextMenuPreviewView> {

  private val mDelegate: ViewManagerDelegate<ContextMenuPreviewView> = ContextMenuPreviewViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<ContextMenuPreviewView> = mDelegate

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): ContextMenuPreviewView =
    ContextMenuPreviewView(context)

  override fun setPreferredWidth(view: ContextMenuPreviewView?, value: Float) = Unit

  override fun setPreferredHeight(view: ContextMenuPreviewView?, value: Float) = Unit

  override fun setPreferredCommitStyle(view: ContextMenuPreviewView?, value: String?) = Unit

  override fun setIsResizeAnimated(view: ContextMenuPreviewView?, value: Boolean) = Unit

  companion object {
    const val NAME = "ContextMenuPreviewView"
  }
}
