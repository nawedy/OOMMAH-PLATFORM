import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { listingId } = req.body;

      const promotedListing = await prisma.listing.update({
        where: { id: listingId },
        data: { promoted: true },
      });

      res.status(200).json(promotedListing);
    } catch (error) {
      res.status(500).json({ message: 'Error promoting listing' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

