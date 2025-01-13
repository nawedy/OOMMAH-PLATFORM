import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PromotedListings } from '@/components/PromotedListings';

async function fetchListings(): Promise<Listing[]> {
  const response = await fetch('/api/listings');
  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }
  return response.json();
}

export default function MarketplacePage() {
  const { data: listings, isLoading, error } = useQuery<Listing[]>(['listings'], fetchListings);

  if (isLoading) return <div>Loading listings...</div>;
  if (error) return <div>Error loading listings: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <PromotedListings />
      <h2 className="text-2xl font-bold mt-8 mb-4">All Listings</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{listing.description}</p>
              <p className="text-lg font-bold mt-2">${listing.price.toFixed(2)}</p>
              <p className="text-xs text-gray-400 mt-1">
                *Price includes 5% transaction fee
              </p>
              <Button className="mt-4">View Listing</Button>
            </CardContent>
          </Card>
        ))}
      </div>
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

