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
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events' });
    }
  } else if (req.method === 'POST') {
    const { title, description, startDate, endDate, location } = req.body;

    try {
      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          startDate,
          endDate,
          location,
          creatorId: session.user.id,
        },
      });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: 'Error creating event' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

