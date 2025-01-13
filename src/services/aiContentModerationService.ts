import axios from 'axios';

const AI_MODERATION_API_URL = process.env.AI_MODERATION_API_URL;
const AI_MODERATION_API_KEY = process.env.AI_MODERATION_API_KEY;

interface ModerationResult {
  isApproved: boolean;
  confidenceScore: number;
  flaggedCategories: string[];
}

export async function moderateContent(content: string): Promise<ModerationResult> {
  try {
    const response = await axios.post(
      AI_MODERATION_API_URL!,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_MODERATION_API_KEY}`,
        },
      }
    );

    const { isApproved, confidenceScore, flaggedCategories } = response.data;

    return {
      isApproved,
      confidenceScore,
      flaggedCategories,
    };
  } catch (error) {
    console.error('Error calling AI moderation API:', error);
    throw new Error('Failed to moderate content');
  }
}

