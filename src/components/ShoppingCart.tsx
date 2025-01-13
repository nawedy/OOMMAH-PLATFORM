import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { RootState } from '../store';

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text>{item.name}</Text>
      <Text>${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Button onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
        <Text>{item.quantity}</Text>
        <Button onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
      </View>
      <Button onPress={() => handleRemoveItem(item.id)}>Remove</Button>
    </View>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
      <Button>Proceed to Checkout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});

