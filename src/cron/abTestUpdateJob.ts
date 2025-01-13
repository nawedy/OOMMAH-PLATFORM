import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { getABTestResults } from '../services/abTestingService';

export const startABTestUpdateJob = () => {
  // Run every day at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('Running A/B test update job');
    try {
      const results = await getABTestResults();
      
      // Store the results in the database
      await prisma.aBTestSummary.create({
        data: {
          date: new Date(),
          results: JSON.stringify(results),
        },
      });

      console.log('A/B test results updated successfully');
    } catch (error) {
      console.error('Error updating A/B test results:', error);
    }
  });
};

