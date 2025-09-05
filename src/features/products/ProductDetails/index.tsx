import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useProductQuery } from '../ProductService';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export function ProductDetails({ route, navigation }: Props) {
  const { id, title } = route.params;
  const { data, isLoading, isError, error, refetch } = useProductQuery(id);

  useLayoutEffect(() => {
    const newTitle = data?.title || title;
    if (newTitle) {
      navigation.setOptions({ title: newTitle });
    }
  }, [navigation, title, data?.title]);

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
    </ScrollView>
  );
}
