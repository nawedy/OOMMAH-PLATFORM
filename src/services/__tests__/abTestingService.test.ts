import { assignUserToTestGroup, trackRecommendationPerformance, getABTestResults } from '../abTestingService';
import { prisma } from '../../lib/prisma';

jest.mock('../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    abTestResult: {
      create: jest.fn(),
      groupBy: jest.fn(),
    },
    abTestSummary: {
      findMany: jest.fn(),
    },
  },
}));

describe('A/B Testing Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('assignUserToTestGroup assigns a new group if user has none', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1', abTestGroup: null });
    (prisma.user.update as jest.Mock).mockResolvedValue({ id: '1', abTestGroup: 'CONTENT_BASED' });

    const result = await assignUserToTestGroup('1');
    expect(result).toBe('CONTENT_BASED');
    expect(prisma.user.update).toHaveBeenCalled();
  });

  test('trackRecommendationPerformance creates a new ABTestResult', async () => {
    await trackRecommendationPerformance('1', 'rec1', true, 60);
    expect(prisma.abTestResult.create).toHaveBeenCalledWith({
      data: {
        userId: '1',
        recommendationId: 'rec1',
        clicked: true,
        timeSpent: 60,
      },
    });
  });

  test('getABTestResults returns formatted results', async () => {
    (prisma.abTestResult.groupBy as jest.Mock).mockResolvedValue([
      { abTestGroup: 'CONTENT_BASED', _count: { _all: 100, clicked: 20 }, _avg: { timeSpent: 30 } },
    ]);
    (prisma.abTestSummary.findMany as jest.Mock).mockResolvedValue([
      { date: new Date(), results: JSON.stringify({ CONTENT_BASED: { clickThroughRate: 0.2 } }) },
    ]);

    const results = await getABTestResults();
    expect(results).toHaveProperty('overall');
    expect(results).toHaveProperty('trend');
    expect(results.overall[0]).toHaveProperty('clickThroughRate');
    expect(results.trend[0]).toHaveProperty('CONTENT_BASED');
  });
});

