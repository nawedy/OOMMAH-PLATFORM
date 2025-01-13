import { prisma } from '../lib/prisma';

export enum RecommendationStrategy {
  ContentBased = 'CONTENT_BASED',
  CollaborativeFiltering = 'COLLABORATIVE_FILTERING',
  MachineLearning = 'MACHINE_LEARNING',
}

export const assignUserToTestGroup = async (userId: string): Promise<RecommendationStrategy> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.abTestGroup) {
    return user.abTestGroup as RecommendationStrategy;
  }

  const randomGroup = Object.values(RecommendationStrategy)[Math.floor(Math.random() * 3)];

  await prisma.user.update({
    where: { id: userId },
    data: { abTestGroup: randomGroup },
  });

  return randomGroup;
};

export const trackRecommendationPerformance = async (
  userId: string,
  recommendationId: string,
  clicked: boolean,
  timeSpent: number
) => {
  await prisma.abTestResult.create({
    data: {
      userId,
      recommendationId,
      clicked,
      timeSpent,
    },
  });
};

export const getABTestResults = async (startDate?: Date, endDate?: Date) => {
  const whereClause = startDate && endDate ? {
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  } : {};

  const results = await prisma.abTestResult.groupBy({
    by: ['userId', 'abTestGroup'],
    where: whereClause,
    _count: {
      _all: true,
      clicked: true,
    },
    _avg: {
      timeSpent: true,
    },
  });

  const performanceByGroup = Object.values(RecommendationStrategy).map((strategy) => {
    const groupResults = results.filter((result) => result.abTestGroup === strategy);
    const totalImpressions = groupResults.reduce((sum, result) => sum + result._count._all, 0);
    const totalClicks = groupResults.reduce((sum, result) => sum + result._count.clicked, 0);
    const averageTimeSpent = groupResults.reduce((sum, result) => sum + (result._avg.timeSpent || 0), 0) / groupResults.length;

    return {
      strategy,
      clickThroughRate: totalClicks / totalImpressions,
      conversionRate: totalClicks / (totalImpressions * 0.1), // Assuming 10% of clicks lead to conversion
      averageTimeSpent,
      totalImpressions,
      totalClicks,
    };
  });

  // Get trend data
  const trendData = await prisma.abTestSummary.findMany({
    where: whereClause,
    orderBy: {
      date: 'asc',
    },
  });

  return {
    overall: performanceByGroup,
    trend: trendData.map(summary => ({
      date: summary.date,
      ...JSON.parse(summary.results),
    })),
  };
};

