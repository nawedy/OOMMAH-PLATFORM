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
      const groups = await prisma.group.findMany();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching groups' });
    }
  } else if (req.method === 'POST') {
    const { name, description } = req.body;

    try {
      const newGroup = await prisma.group.create({
        data: {
          name,
          description,
          creatorId: session.user.id,
        },
      });
      res.status(201).json(newGroup);
    } catch (error) {
      res.status(500).json({ message: 'Error creating group' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

