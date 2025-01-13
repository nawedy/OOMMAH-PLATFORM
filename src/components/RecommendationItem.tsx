import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { rateRecommendation } from '../store/recommendationsSlice';
import { trackRecommendationPerformance } from '../services/abTestingService';
import { Button } from '@/components/ui/button';

interface RecommendationItemProps {
  recommendation: {
    id: string;
    title: string;
    excerpt: string;
    slug: string; // Assuming you have a slug field for your content
  };
  userId: string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ recommendation, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRating = (rating: number) => {
    dispatch(rateRecommendation({ recommendationId: recommendation.id, rating }));
  };

  const handleClick = () => {
    trackRecommendationPerformance(userId, recommendation.id, true);
    router.push(`/content/${recommendation.slug}`);
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-semibold">{recommendation.title}</h3>
      <p className="text-gray-600">{recommendation.excerpt}</p>
      <div className="mt-2">
        <Button onClick={handleClick}>Read More</Button>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <span className="text-sm text-gray-600">Was this helpful?</span>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className="text-yellow-400 hover:text-yellow-500 focus:outline-none"
            onClick={() => handleRating(rating)}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendationItem;

