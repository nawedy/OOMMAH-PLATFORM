import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import type { NextApiResponseServerIO } from '@/types/next';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
      }

      const cacheKey = `analytics:${startDate}:${endDate}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      // Fetch user growth data
      const userGrowth = await prisma.$queryRaw`
        SELECT DATE_TRUNC('day', "createdAt") as date, COUNT(*) as count
        FROM "User"
        WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        GROUP BY DATE_TRUNC('day', "createdAt")
        ORDER BY date ASC
      `;

      // Fetch content distribution data
      const contentDistribution = await prisma.$queryRaw`
        SELECT 'Posts' as type, COUNT(*) as count FROM "Post" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        UNION ALL
        SELECT 'Comments' as type, COUNT(*) as count FROM "Comment" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        UNION ALL
        SELECT 'Events' as type, COUNT(*) as count FROM "Event" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        UNION ALL
        SELECT 'Listings' as type, COUNT(*) as count FROM "Listing" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
      `;

      // Fetch engagement by feature data
      const engagementByFeature = await prisma.$queryRaw`
        SELECT 'Posts' as feature, COUNT(*) as count FROM "Post" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        UNION ALL
        SELECT 'Comments' as feature, COUNT(*) as count FROM "Comment" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        UNION ALL
        SELECT 'Event Attendees' as feature, COUNT(*) as count FROM "_EventToUser" WHERE "B" IN (SELECT id FROM "Event" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date)
        UNION ALL
        SELECT 'Group Members' as feature, COUNT(*) as count FROM "_GroupToUser" WHERE "B" IN (SELECT id FROM "Group" WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date)
      `;

      // Fetch user retention data
      const userRetention = await prisma.$queryRaw`
        WITH cohort AS (
          SELECT DATE_TRUNC('week', "createdAt") as cohort_date, id
          FROM "User"
          WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        ),
        user_activity AS (
          SELECT DISTINCT u.id, DATE_TRUNC('week', p."createdAt") as activity_week
          FROM "User" u
          JOIN "Post" p ON u.id = p."authorId"
          WHERE p."createdAt" >= ${startDate}::date AND p."createdAt" <= ${endDate}::date
        )
        SELECT 
          c.cohort_date,
          COUNT(DISTINCT c.id) as cohort_size,
          COUNT(DISTINCT ua.id) as retained_users,
          COUNT(DISTINCT ua.id)::float / COUNT(DISTINCT c.id) as retention_rate
        FROM cohort c
        LEFT JOIN user_activity ua ON c.id = ua.id AND ua.activity_week >= c.cohort_date
        GROUP BY c.cohort_date
        ORDER BY c.cohort_date
      `;

      // Fetch average time spent data
      const averageTimeSpent = await prisma.$queryRaw`
        SELECT DATE_TRUNC('day', "createdAt") as date, AVG(EXTRACT(EPOCH FROM ("updatedAt" - "createdAt"))) as avg_time_spent
        FROM "Session"
        WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
        GROUP BY DATE_TRUNC('day', "createdAt")
        ORDER BY date ASC
      `;

      // Fetch conversion rates data
      const conversionRates = await prisma.$queryRaw`
        WITH total_users AS (
          SELECT DATE_TRUNC('day', "createdAt") as date, COUNT(*) as total
          FROM "User"
          WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date
          GROUP BY DATE_TRUNC('day', "createdAt")
        ),
        premium_users AS (
          SELECT DATE_TRUNC('day', "createdAt") as date, COUNT(*) as premium
          FROM "Subscription"
          WHERE "createdAt" >= ${startDate}::date AND "createdAt" <= ${endDate}::date AND "plan" = 'premium'
          GROUP BY DATE_TRUNC('day', "createdAt")
        )
        SELECT 
          tu.date,
          tu.total as total_users,
          COALESCE(pu.premium, 0) as premium_users,
          COALESCE(pu.premium::float / tu.total, 0) as conversion_rate
        FROM total_users tu
        LEFT JOIN premium_users pu ON tu.date = pu.date
        ORDER BY tu.date ASC
      `;

      const analyticsData = {
        userGrowth: {
          labels: userGrowth.map((entry: any) => entry.date.toISOString().split('T')[0]),
          datasets: [
            {
              label: 'New Users',
              data: userGrowth.map((entry: any) => entry.count),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        },
        contentDistribution: {
          labels: contentDistribution.map((entry: any) => entry.type),
          datasets: [
            {
              data: contentDistribution.map((entry: any) => entry.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
              ],
              hoverBackgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
            },
          ],
        },
        engagementByFeature: {
          labels: engagementByFeature.map((entry: any) => entry.feature),
          datasets: [
            {
              label: 'Engagement Count',
              data: engagementByFeature.map((entry: any) => entry.count),
              backgroundColor: 'rgba(153, 102, 255, 0.8)',
            },
          ],
        },
        userRetention: {
          labels: userRetention.map((entry: any) => entry.cohort_date.toISOString().split('T')[0]),
          datasets: [
            {
              label: 'Retention Rate',
              data: userRetention.map((entry: any) => entry.retention_rate),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
          ],
        },
        averageTimeSpent: {
          labels: averageTimeSpent.map((entry: any) => entry.date.toISOString().split('T')[0]),
          datasets: [
            {
              label: 'Average Time Spent (seconds)',
              data: averageTimeSpent.map((entry: any) => entry.avg_time_spent),
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
          ],
        },
        conversionRates: {
          labels: conversionRates.map((entry: any) => entry.date.toISOString().split('T')[0]),
          datasets: [
            {
              label: 'Conversion Rate',
              data: conversionRates.map((entry: any) => entry.conversion_rate),
              borderColor: 'rgb(255, 205, 86)',
              backgroundColor: 'rgba(255, 205, 86, 0.5)',
            },
          ],
        },
      };

      await redis.set(cacheKey, JSON.stringify(analyticsData), 'EX', 3600); // Cache for 1 hour

      // Emit real-time update
      if (res.socket.server.io) {
        res.socket.server.io.emit('analytics_update', analyticsData);
      }

      res.status(200).json(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      res.status(500).json({ message: 'Error fetching analytics data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

