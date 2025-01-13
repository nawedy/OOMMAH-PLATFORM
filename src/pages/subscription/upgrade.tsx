import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function upgradeSubscription(plan: string) {
  const response = await fetch('/api/subscription/upgrade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  });

  if (!response.ok) {
    throw new Error('Failed to upgrade subscription');
  }

  return response.json();
}

export default function UpgradeSubscriptionPage() {
  const router = useRouter();
  const mutation = useMutation(upgradeSubscription);

  const handleUpgrade = (plan: string) => {
    mutation.mutate(plan, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upgrade Your Subscription</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">$9.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>Ad-free experience</li>
              <li>Basic analytics</li>
            </ul>
            <Button onClick={() => handleUpgrade('basic')}>Choose Basic</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">$19.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>Ad-free experience</li>
              <li>Advanced analytics</li>
              <li>Priority customer support</li>
            </ul>
            <Button onClick={() => handleUpgrade('premium')}>Choose Premium</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">$29.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>Ad-free experience</li>
              <li>Advanced analytics</li>
              <li>Priority customer support</li>
              <li>Exclusive content access</li>
              <li>Custom branding options</li>
            </ul>
            <Button onClick={() => handleUpgrade('pro')}>Choose Pro</Button>
          </CardContent>
        </Card>
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

