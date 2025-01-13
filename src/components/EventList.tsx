import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Event } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function fetchEvents(): Promise<Event[]> {
  const response = await fetch('/api/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

export function EventList() {
  const { data: events, isLoading, error } = useQuery<Event[]>(['events'], fetchEvents);

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {(error as Error).message}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events?.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.startDate).toLocaleString()} - {event.endDate ? new Date(event.endDate).toLocaleString() : 'TBD'}
            </p>
            <Link href={`/events/${event.id}`} passHref>
              <Button className="mt-4">View Event</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

