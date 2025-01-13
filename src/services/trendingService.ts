import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

const CACHE_KEY = 'trending_topics';
const CACHE_TTL = 3600; // 1 hour

export async function getTrendingTopics() {
  // Try to get trending topics from cache
  const cachedTopics = await redis.get(CACHE_KEY);
  if (cachedTopics) {
    return JSON.parse(cachedTopics);
  }

  // If not in cache, fetch from database
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const trendingTags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          createdAt: {
            gte: oneWeekAgo,
          },
        },
      },
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    take: 10,
  });

  const formattedTrendingTopics = trendingTags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    count: tag._count.posts,
  }));

  // Store in cache
  await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(formattedTrendingTopics));

  return formattedTrendingTopics;
}

