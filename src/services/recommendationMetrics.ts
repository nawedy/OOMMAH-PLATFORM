import { prisma } from '@/lib/prisma';

export async function trackRecommendationEngagement(userId: string, postId: string, engaged: boolean) {
  await prisma.recommendationEngagement.create({
    data: {
      userId,
      postId,
      engaged,
    },
  });
}

export async function getRecommendationMetrics(startDate: Date, endDate: Date) {
  const totalRecommendations = await prisma.recommendationEngagement.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const engagedRecommendations = await prisma.recommendationEngagement.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      engaged: true,
    },
  });

  const engagementRate = totalRecommendations > 0 ? engagedRecommendations / totalRecommendations : 0;

  return {
    totalRecommendations,
    engagedRecommendations,
    engagementRate,
  };
}

