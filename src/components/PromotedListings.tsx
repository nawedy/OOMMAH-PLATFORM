import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function fetchPromotedListings(): Promise<Listing[]> {
  const response = await fetch('/api/listings/promoted');
  if (!response.ok) {
    throw new Error('Failed to fetch promoted listings');
  }
  return response.json();
}

export function PromotedListings() {
  const { data: promotedListings, isLoading, error } = useQuery<Listing[]>(['promotedListings'], fetchPromotedListings);

  if (isLoading) return <div>Loading promoted listings...</div>;
  if (error) return <div>Error loading promoted listings: {(error as Error).message}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {promotedListings?.map((listing) => (
        <Card key={listing.id}>
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{listing.description}</p>
            <p className="text-lg font-bold mt-2">${listing.price.toFixed(2)}</p>
            <Button className="mt-4">View Listing</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

