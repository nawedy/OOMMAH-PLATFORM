import React from 'react';
import AdvancedSearch from '../components/AdvancedSearch';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import TrendingTopics from '../components/TrendingTopics';

const DiscoverPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Discover Content</h1>
      <AdvancedSearch />
      <PersonalizedRecommendations />
      <TrendingTopics />
    </div>
  );
};

export default DiscoverPage;

