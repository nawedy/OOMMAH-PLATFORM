import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'moderator') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;
  const { action } = req.body;

  if (req.method === 'POST') {
    try {
      const updatedContent = await prisma.moderationQueue.update({
        where: { id: id as string },
        data: { status: action === 'approve' ? 'approved' : 'rejected' },
      });
      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: 'Error moderating content' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

