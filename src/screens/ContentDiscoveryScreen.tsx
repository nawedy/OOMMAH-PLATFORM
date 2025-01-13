import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/button';
import AdvancedSearch from '../components/AdvancedSearch';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import TrendingTopics from '../components/TrendingTopics';

export default function ContentDiscoveryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Discover Content</Text>
      
      <AdvancedSearch />
      
      <PersonalizedRecommendations />
      
      <TrendingTopics />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
});

