import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { EventList } from '@/components/EventList';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function EventsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <Button onClick={() => router.push('/events/create')} className="mb-6">
        Create New Event
      </Button>
      <EventList />
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

