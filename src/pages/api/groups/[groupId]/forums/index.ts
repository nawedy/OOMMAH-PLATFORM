import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { groupId } = req.query;

  if (req.method === 'GET') {
    try {
      const forums = await prisma.forum.findMany({
        where: { groupId: groupId as string },
      });
      res.status(200).json(forums);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching forums' });
    }
  } else if (req.method === 'POST') {
    const { name, description } = req.body;

    try {
      const newForum = await prisma.forum.create({
        data: {
          name,
          description,
          groupId: groupId as string,
        },
      });
      res.status(201).json(newForum);
    } catch (error) {
      res.status(500).json({ message: 'Error creating forum' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

