import { createMocks } from 'node-mocks-http';
import handleRecommendations from '../../pages/api/recommendations/personalized';
import { prisma } from '../../lib/prisma';
import { getServerSession } from 'next-auth/next';

jest.mock('../../lib/prisma');
jest.mock('next-auth/next');

describe('/api/recommendations/personalized', () => {
  it('returns 401 for unauthenticated requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    (getServerSession as jest.Mock).mockResolvedValue(null);

    await handleRecommendations(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Unauthorized' });
  });

  it('returns personalized recommendations for authenticated users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    (getServerSession as jest.Mock).mockResolvedValue({ user: { id: 'user123' } });

    const mockRecommendations = [
      { id: 'post1', title: 'Recommendation 1' },
      { id: 'post2', title: 'Recommendation 2' },
    ];

    (prisma.post.findMany as jest.Mock).mockResolvedValue(mockRecommendations);

    await handleRecommendations(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockRecommendations);
  });
});

