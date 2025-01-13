import { PrismaClient } from '@prisma/client';
import { RecommendationStrategy } from '../src/services/abTestingService';

const prisma = new PrismaClient();

async function generateTestData() {
  const strategies = Object.values(RecommendationStrategy);
  const users = await prisma.user.findMany({ take: 100 });
  const recommendations = await prisma.post.findMany({ take: 50 });

  for (let i = 0; i < 1000; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];

    await prisma.aBTestResult.create({
      data: {
        userId: user.id,
        recommendationId: recommendation.id,
        clicked: Math.random() < 0.2, // 20% chance of clicking
        timeSpent: Math.random() * 300, // 0-300 seconds
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Random date within the last 30 days
      },
    });

    if (!user.abTestGroup) {
      await prisma.user.update({
        where: { id: user.id },
        data: { abTestGroup: strategy },
      });
    }
  }

  console.log('Test data generated successfully');
}

generateTestData()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

