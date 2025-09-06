package com.rn_challenge

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.time.ZonedDateTime
import java.time.ZoneId
import android.content.Intent
import android.provider.CalendarContract
import android.util.Log

class NativeCalendarEventModule(reactContext: ReactApplicationContext)
  : NativeCalendarEventSpec(reactContext) {
  override fun getName() = NAME

  // Sync method: return value, not Promise
  override fun addEvent(title: String, description: String): Boolean {
    Log.d("NativeCalendarEvent", "addEvent() called 1")
    val startMillis = ZonedDateTime.of(2025, 9, 10, 14, 0, 0, 0, ZoneId.systemDefault()).toInstant().toEpochMilli()
    val endMillis   = ZonedDateTime.of(2025, 9, 10, 15, 0, 0, 0, ZoneId.systemDefault()).toInstant().toEpochMilli()

    Log.d("NativeCalendarEvent", "addEvent() called 2")
    val intent = Intent(Intent.ACTION_INSERT).apply {
      data = CalendarContract.Events.CONTENT_URI
      putExtra(CalendarContract.Events.TITLE, title)
      putExtra(CalendarContract.Events.DESCRIPTION, description)
      putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startMillis)
      putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endMillis)
      putExtra(CalendarContract.Events.AVAILABILITY, CalendarContract.Events.AVAILABILITY_BUSY)
    }

    Log.d("NativeCalendarEvent", "addEvent() called 3")
    try {
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      reactApplicationContext.startActivity(intent)
      return true
    } catch (e: Exception) {
      Log.e("NativeCalendarEvent", "Error adding event", e)
      return false
    } finally {
      Log.d("NativeCalendarEvent", "addEvent() called 4")
    }
  }

  companion object {
    const val NAME = "NativeCalendarEvent"
  }
}
