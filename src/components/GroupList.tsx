import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Group } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function fetchGroups(): Promise<Group[]> {
  const response = await fetch('/api/groups');
  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }
  return response.json();
}

export function GroupList() {
  const { data: groups, isLoading, error } = useQuery<Group[]>(['groups'], fetchGroups);

  if (isLoading) return <div>Loading groups...</div>;
  if (error) return <div>Error loading groups: {(error as Error).message}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups?.map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{group.description}</p>
            <Link href={`/groups/${group.id}`} passHref>
              <Button className="mt-4">View Group</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

