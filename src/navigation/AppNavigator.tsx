import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProductsList } from '../features/products/ProductList';
import { ProductDetails } from '../features/products/ProductDetails';

export type RootStackParamList = {
  Products: undefined;
  ProductDetails: { id: number; title?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = React.memo(() => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductsList} options={{ title: 'Products' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Details' }} />
    </Stack.Navigator>
  </NavigationContainer>
))

AppNavigator.displayName = 'AppNavigator';