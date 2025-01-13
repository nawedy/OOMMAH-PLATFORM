import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Group } from '@prisma/client';
import { ForumList } from '@/components/ForumList';
import { Button } from '@/components/ui/button';

async function fetchGroup(groupId: string): Promise<Group> {
  const response = await fetch(`/api/groups/${groupId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch group');
  }
  return response.json();
}

export default function GroupPage() {
  const router = useRouter();
  const { groupId } = router.query;

  const { data: group, isLoading, error } = useQuery<Group>(['group', groupId], () => fetchGroup(groupId as string), {
    enabled: !!groupId,
  });

  if (isLoading) return <div>Loading group...</div>;
  if (error) return <div>Error loading group: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{group?.name}</h1>
      <p className="text-gray-600 mb-6">{group?.description}</p>
      <Button onClick={() => router.push(`/groups/${groupId}/forums/create`)} className="mb-6">
        Create New Forum
      </Button>
      <h2 className="text-2xl font-bold mb-4">Forums</h2>
      <ForumList groupId={groupId as string} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

