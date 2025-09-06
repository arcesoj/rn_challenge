import React, { useCallback, useLayoutEffect } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useProductQuery } from '../ProductService';
import { styles } from './styles';
import { usePermissions } from '../../../hooks/usePermissions';
import CalendarEvent from '../../../../specs/NativeCalendarEvent';
import { Permission, PERMISSIONS } from 'react-native-permissions';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

// TODO: this could be generic for other permissions
const CalendarPermission = Platform.select({
  android: PERMISSIONS.ANDROID.WRITE_CALENDAR,
  ios: PERMISSIONS.IOS.CALENDARS_WRITE_ONLY
});

export function ProductDetails({ route, navigation }: Props) {
  const { id, title } = route.params;
  const { data, isLoading, isError, error, refetch } = useProductQuery(id);
  const [calendarWritePermission, requestPermission] = usePermissions(CalendarPermission as Permission);

  useLayoutEffect(() => {
    const newTitle = data?.title || title;
    if (newTitle) {
      navigation.setOptions({ title: newTitle });
    }
  }, [navigation, title, data?.title]);

  const addReminderToCalendar = useCallback(async () => {
    if (!calendarWritePermission.enabled) {
      requestPermission();
      return;
    }
    const titleEvent = "Product Purchase Reminder"
    const descriptionEvent = "You have a product purchase reminder for " + data?.title;

    const result = CalendarEvent.addEvent(titleEvent, descriptionEvent);
    console.log('result', result);
    // TODO: Show a toast message if the event was added to the calendar
  }, [calendarWritePermission, requestPermission, data]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.subtle}>Loading product…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load product</Text>
        <Text style={styles.subtle}>{(error as Error)?.message}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Retry loading product" onPress={() => refetch()}>
          <Text style={styles.link}>Tap to retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text style={styles.subtle}>No product found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {data.description ? <Text style={styles.desc}>{data.description}</Text> : null}
      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{data.formattedPrice}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Brand:</Text>
        <Text style={styles.value}>{data.brand ?? '—'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Stock:</Text>
        <Text style={styles.value}>{data.stock ?? '—'}</Text>
      </View>
      <View style={styles.row}>
        <Pressable onPress={addReminderToCalendar} style={styles.reminderButton}>
          <Text style={styles.reminderText}>Add product purchase reminder</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
