import { NextApiRequest, NextApiResponse } from 'next';
import { getTrendingTopics } from '../../../services/trendingService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const trendingTopics = await getTrendingTopics();
    res.status(200).json(trendingTopics);
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

