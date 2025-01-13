import React from 'react';
import { useDispatch } from 'react-redux';
import { rateRecommendation } from '../store/recommendationsSlice';

interface RecommendationFeedbackProps {
  recommendationId: string;
}

const RecommendationFeedback: React.FC<RecommendationFeedbackProps> = ({ recommendationId }) => {
  const dispatch = useDispatch();

  const handleRating = (rating: number) => {
    dispatch(rateRecommendation({ recommendationId, rating }));
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Was this recommendation helpful?</span>
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
  );
};

export default RecommendationFeedback;

