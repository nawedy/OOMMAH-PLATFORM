import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Forum } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function fetchForums(groupId: string): Promise<Forum[]> {
  const response = await fetch(`/api/groups/${groupId}/forums`);
  if (!response.ok) {
    throw new Error('Failed to fetch forums');
  }
  return response.json();
}

interface ForumListProps {
  groupId: string;
}

export function ForumList({ groupId }: ForumListProps) {
  const { data: forums, isLoading, error } = useQuery<Forum[]>(['forums', groupId], () => fetchForums(groupId));

  if (isLoading) return <div>Loading forums...</div>;
  if (error) return <div>Error loading forums: {(error as Error).message}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forums?.map((forum) => (
        <Card key={forum.id}>
          <CardHeader>
            <CardTitle>{forum.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{forum.description}</p>
            <Link href={`/forums/${forum.id}`} passHref>
              <Button className="mt-4">View Forum</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

