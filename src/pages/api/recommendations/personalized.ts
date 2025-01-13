import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getPersonalizedRecommendations } from '../../../services/recommendationService';
import { trackRecommendationPerformance } from '../../../services/abTestingService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;
    const recommendations = await getPersonalizedRecommendations(userId);

    // Track impressions for A/B testing
    await Promise.all(recommendations.map(rec => 
      trackRecommendationPerformance(userId, rec.id, false)
    ));

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

