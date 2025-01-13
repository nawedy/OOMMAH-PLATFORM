import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductListing({ id, name, description, price, imageUrl }: ProductProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, quantity: 1 }));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Button onPress={handleAddToCart}>Add to Cart</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 5,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

