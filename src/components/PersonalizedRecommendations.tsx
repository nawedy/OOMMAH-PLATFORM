import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPersonalizedRecommendations } from '../store/recommendationsSlice';
import { RootState } from '../store';
import RecommendationItem from './RecommendationItem';

const PersonalizedRecommendations: React.FC = () => {
  const dispatch = useDispatch();
  const { items: recommendations, loading, error } = useSelector((state: RootState) => state.recommendations);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPersonalizedRecommendations());
    }
  }, [dispatch, userId]);

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userId) return <div>Please log in to see personalized recommendations.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recommended for You</h2>
      {recommendations.map((recommendation) => (
        <RecommendationItem key={recommendation.id} recommendation={recommendation} userId={userId} />
      ))}
    </div>
  );
};

export default PersonalizedRecommendations;

