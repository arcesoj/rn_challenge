import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { styles } from './styles';
import { Product } from '../../../ui-types';

export const ProductItem = React.memo(({ item, onPress }: { item: Product; onPress: () => void }) => (
  <Pressable
    style={styles.row}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={`Open details for ${item.title}`}
  >
    <Image
      source={{ uri: item.thumbnail }}
      style={styles.thumb}
      resizeMode="cover"
      accessibilityIgnoresInvertColors={false}
      accessibilityLabel={`${item.title} thumbnail`}
    />
    <View style={styles.meta}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price}>{item.formattedPrice}</Text>
    </View>
  </Pressable>
));

ProductItem.displayName = 'ProductItem';
