import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { addSubscriber } from '@/services/emailMarketingService';
import { PrivacySettings } from '@/components/PrivacySettings';

async function getUserSettings() {
  const response = await fetch('/api/user/settings');
  if (!response.ok) {
    throw new Error('Failed to fetch user settings');
  }
  return response.json();
}

async function updateUserSettings(data: any) {
  const response = await fetch('/api/user/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update user settings');
  }
  return response.json();
}

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useQuery(['userSettings'], getUserSettings);
  const mutation = useMutation(updateUserSettings);

  const handleNewsletterToggle = async (checked: boolean) => {
    try {
      await mutation.mutateAsync({ receiveNewsletter: checked });
      if (checked) {
        await addSubscriber({ email: settings.email, name: settings.name });
      }
    } catch (error) {
      console.error('Failed to update newsletter settings:', error);
    }
  };

  if (isLoading) return <div>Loading settings...</div>;
  if (error) return <div>Error loading settings: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Receive newsletter</span>
              <Switch
                checked={settings.receiveNewsletter}
                onCheckedChange={handleNewsletterToggle}
              />
            </div>
          </CardContent>
        </Card>
        <PrivacySettings />
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

