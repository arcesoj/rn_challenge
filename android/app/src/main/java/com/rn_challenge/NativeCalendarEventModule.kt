package com.rn_challenge

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class NativeCalendarEventModule(reactContext: ReactApplicationContext)
  : NativeCalendarEventSpec(reactContext) {
  override fun getName() = NAME

  // Sync method: return value, not Promise
  override fun addEvent(): Boolean = false

  companion object {
    const val NAME = "NativeCalendarEvent"
  }
}
