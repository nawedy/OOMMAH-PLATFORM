import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { validateInput } from '@/middleware/inputValidation';
import { csrfProtection } from '@/middleware/csrfProtection';
import { secureHeaders } from '@/middleware/secureHeaders';
import { z } from 'zod';
import logger from '@/lib/logger';
import Prisma from '@prisma/client'

const postSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  secureHeaders(req, res, async () => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      logger.warn('Unauthorized access attempt', { path: req.url });
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
      const cacheKey = `posts:${req.query.page || 1}:${req.query.limit || 20}`;
      const cachedPosts = await redis.get(cacheKey);

      if (cachedPosts) {
        return res.status(200).json(JSON.parse(cachedPosts));
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      try {
        const [posts, total] = await prisma.$transaction([
          prisma.post.findMany({
            select: {
              id: true,
              title: true,
              createdAt: true,
              author: {
                select: { name: true, image: true },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: skip,
          }),
          prisma.post.count(),
        ]);

        const result = {
          posts,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };

        await redis.set(cacheKey, JSON.stringify(result), 'EX', 60 * 5); // Cache for 5 minutes

        res.status(200).json(result);
      } catch (error) {
        logger.error('Error fetching posts', { error });
        res.status(500).json({ message: 'Error fetching posts' });
      }
    } else if (req.method === 'POST') {
      await csrfProtection(req, res);
      await validateInput(postSchema)(req, res, async () => {
        const { title, content } = req.body;
        try {
          const newPost = await prisma.post.create({
            data: {
              title,
              content,
              authorId: session.user.id,
            },
          });
          logger.info('New post created', { postId: newPost.id, userId: session.user.id });
          res.status(201).json(newPost);
        } catch (error) {
          logger.error('Error creating post', { error, userId: session.user.id });
          res.status(500).json({ message: 'Error creating post' });
        }
      });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}

