import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import logger from '@/lib/logger';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

const postSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20', 10);
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: skip
    });
    const total = await prisma.post.count();
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const identifier = session.user.id;
  const result = await ratelimit.limit(identifier);
  if (!result.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const validatedData = postSchema.parse(body);

    const newPost = await prisma.post.create({
      data: {
        ...validatedData,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    logger.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

