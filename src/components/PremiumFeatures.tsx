import React from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export function PremiumFeatures() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/subscription/upgrade');
  };

  if (session?.user?.subscription?.plan === 'premium') {
    return (
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Premium Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Ad-free experience</li>
          <li>Priority customer support</li>
          <li>Exclusive content access</li>
          <li>Advanced analytics</li>
        </ul>
        <p className="text-sm">You're enjoying all premium features!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Upgrade to Premium</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Ad-free experience</li>
        <li>Priority customer support</li>
        <li>Exclusive content access</li>
        <li>Advanced analytics</li>
      </ul>
      <Button onClick={handleUpgrade}>Upgrade Now</Button>
    </div>
  );
}

