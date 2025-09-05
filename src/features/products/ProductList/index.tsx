import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCategoriesQuery, useInfiniteProductsQuery } from '../ProductService';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { styles } from './styles';
import { OrderType, SortByType } from '../types';
import { Product } from '../ui-types';
import { ProductItem, ProductListHeader } from './components';

type Props = {
  limit?: number;
};

const ITEM_HEIGHT = 84; // row padding (10*2) + thumb height (64)

export function ProductsList({ limit = 20 }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const listRef = useRef<FlatList<Product>>(null);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortByType>(undefined);
  const [order, setOrder] = useState<OrderType>('asc');

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProductsQuery(limit, category, sortBy, order);
  const { data: categories } = useCategoriesQuery();
  const items = useMemo(() => (data ? data.pages.flatMap(p => p.products) : []), [data]);

  const navigateToProductDetail = useCallback((item: Product) => {
    navigation.navigate('ProductDetails', { id: item.id, title: item.title });
  }, [navigation]);

  const onCategoryPress = (cat?: string) => {
    setCategory(cat);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };
  const onSortByPress = (sortValue?: SortByType) => {
    setSortBy(sortValue);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };
  const onOrderPress = (value: OrderType) => {
    setOrder(value);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductItem item={item} onPress={() => navigateToProductDetail(item)} />
    ),
    [navigateToProductDetail]
  );


  const getItemLayout = useCallback(
    (_: ArrayLike<Product> | null | undefined, index: number) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }),
    []
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.subtle}>Loading products…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load products</Text>
        <Text style={styles.subtle}>{(error as Error)?.message}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Retry loading products" onPress={() => refetch()}>
          <Text style={styles.link}>Tap to retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      data={items}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      refreshing={isRefetching}
      onRefresh={refetch}
      initialNumToRender={12}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={16}
      windowSize={7}
      getItemLayout={getItemLayout}
      scrollEventThrottle={16}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <ProductListHeader
          categories={categories || []}
          onSortByPress={(value) => onSortByPress(value)}
          onCategoryPress={(cat) => onCategoryPress(cat)}
          onOrderPress={(value) => onOrderPress(value)}
          category={category}
          sortBy={sortBy}
          order={order} />
      }
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      ListEmptyComponent={
        <Text style={styles.subtle}>No products found.</Text>
      }
    />
  );
}
