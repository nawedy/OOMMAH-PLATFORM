import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { GroupList } from '@/components/GroupList';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function GroupsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Groups</h1>
      <Button onClick={() => router.push('/groups/create')} className="mb-6">
        Create New Group
      </Button>
      <GroupList />
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

