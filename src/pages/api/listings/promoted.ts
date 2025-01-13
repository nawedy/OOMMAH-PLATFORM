import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const promotedListings = await prisma.listing.findMany({
        where: { promoted: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      });

      res.status(200).json(promotedListings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching promoted listings' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

