import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchQuery = req.nextUrl.searchParams.get('q');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const results = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      include: {
        author: {
          select: { name: true, image: true }
        }
      },
      take: 20,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

