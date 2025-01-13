import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const listings = await prisma.listing.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching listings' });
    }
  } else if (req.method === 'POST') {
    const { title, description, price, promoted } = req.body;

    try {
      const newListing = await prisma.listing.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          sellerId: session.user.id,
          promoted: promoted || false,
        },
      });
      res.status(201).json(newListing);
    } catch (error) {
      res.status(500).json({ message: 'Error creating listing' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

