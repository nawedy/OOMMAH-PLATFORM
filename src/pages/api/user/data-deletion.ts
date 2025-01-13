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
      // Delete user data
      await prisma.user.delete({
        where: { id: session.user.id },
      });

      // End the session
      await session.destroy();

      res.status(200).json({ message: 'User data deleted successfully' });
    } catch (error) {
      console.error('Error deleting user data:', error);
      res.status(500).json({ message: 'Error deleting user data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

