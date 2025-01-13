import React from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';
import { Text, Button } from '@/components/ui/button';

interface AdProps {
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

export default function AdComponent({ imageUrl, title, description, ctaText, ctaUrl }: AdProps) {
  const handlePress = () => {
    Linking.openURL(ctaUrl);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button onPress={handlePress}>{ctaText}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 5,
    marginBottom: 10,
  },
});

