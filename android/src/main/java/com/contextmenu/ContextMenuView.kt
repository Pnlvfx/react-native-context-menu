package com.contextmenu

import android.content.Context
import android.util.AttributeSet
import android.widget.FrameLayout

internal class ContextMenuView : FrameLayout {
  constructor(context: Context) : super(context)
  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
    context,
    attrs,
    defStyleAttr
  )
}
