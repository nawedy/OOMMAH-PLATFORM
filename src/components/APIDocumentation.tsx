import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Code } from '@/components/ui/button';

export default function APIDocumentation() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Documentation</Text>

      <View style={styles.endpoint}>
        <Text style={styles.endpointTitle}>Authentication</Text>
        <Text style={styles.endpointDescription}>
          All API requests must include an `Authorization` header with a valid API key.
        </Text>
        <Code>
          Authorization: Bearer YOUR_API_KEY
        </Code>
      </View>

      <View style={styles.endpoint}>
        <Text style={styles.endpointTitle}>GET /api/users</Text>
        <Text style={styles.endpointDescription}>
          Retrieve a list of users.
        </Text>
        <Text style={styles.subTitle}>Parameters:</Text>
        <Text>page (optional): Page number for pagination</Text>
        <Text>limit (optional): Number of results per page</Text>
        <Text style={styles.subTitle}>Response:</Text>
        <Code>
          {`
{
  "users": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    ...
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
          `}
        </Code>
      </View>

      <View style={styles.endpoint}>
        <Text style={styles.endpointTitle}>POST /api/messages</Text>
        <Text style={styles.endpointDescription}>
          Send a new message.
        </Text>
        <Text style={styles.subTitle}>Request Body:</Text>
        <Code>
          {`
{
  "recipientId": "456",
  "content": "Hello, how are you?"
}
          `}
        </Code>
        <Text style={styles.subTitle}>Response:</Text>
        <Code>
          {`
{
  "id": "789",
  "senderId": "123",
  "recipientId": "456",
  "content": "Hello, how are you?",
  "timestamp": "2023-05-15T14:30:00Z"
}
          `}
        </Code>
      </View>

      <View style={styles.endpoint}>
        <Text style={styles.endpointTitle}>GET /api/products</Text>
        <Text style={styles.endpointDescription}>
          Retrieve a list of products from the marketplace.
        </Text>
        <Text style={styles.subTitle}>Parameters:</Text>
        <Text>category (optional): Filter products by category</Text>
        <Text>minPrice (optional): Minimum price filter</Text>
        <Text>maxPrice (optional): Maximum price filter</Text>
        <Text style={styles.subTitle}>Response:</Text>
        <Code>
          {`
{
  "products": [
    {
      "id": "101",
      "name": "Smartphone",
      "description": "Latest model smartphone",
      "price": 599.99,
      "category": "Electronics"
    },
    ...
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
          `}
        </Code>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  endpoint: {
    marginBottom: 30,
  },
  endpointTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  endpointDescription: {
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

