
import React from 'react';
import { Chip } from '../Chip/Chip';
import { styles } from './styles';
import { ScrollView, Text, View } from 'react-native';
import { OrderType, SortByType } from '../../../types';
import { Category } from '../../../ui-types';

type ProductListHeaderProps = {
  categories: Category[],
  category?: string,
  sortBy?: SortByType,
  order: OrderType,
  onCategoryPress: (cat?: string) => void,
  onSortByPress: (sort?: SortByType) => void,
  onOrderPress: (order: OrderType) => void
}

export const ProductListHeader = React.memo(({ categories, category, sortBy, order,
  onCategoryPress, onSortByPress, onOrderPress }: ProductListHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        <Chip
          label="All"
          active={!category}
          onPress={() => onCategoryPress(undefined)} />
        {(categories || []).map((cat) => (
          <Chip
            key={cat.id}
            label={cat.displayName}
            active={category === cat.name}
            onPress={() => onCategoryPress(cat.name)} />
        ))}
      </ScrollView>
      <View>
        <Text style={styles.headerTitle}>Sort</Text>
        <View style={styles.sortRow}>
          <Chip
            label="Price"
            active={sortBy === 'price'}
            onPress={() => onSortByPress(sortBy === 'price' ? undefined : 'price')}
          />
          <Chip
            label="Rating"
            active={sortBy === 'rating'}
            onPress={() => onSortByPress(sortBy === 'rating' ? undefined : 'rating')}
          />
          <Chip
            label="Title"
            active={sortBy === 'title'}
            onPress={() => onSortByPress(sortBy === 'title' ? undefined : 'title')}
          />
          <Chip
            label={order === 'asc' ? 'Asc' : 'Desc'}
            onPress={() => onOrderPress(order === 'asc' ? 'desc' : 'asc')}
          />
        </View>
      </View>
    </View>
  )
})
