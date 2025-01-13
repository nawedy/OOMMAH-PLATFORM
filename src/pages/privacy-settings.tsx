import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function PrivacySettings() {
  const { data: session } = useSession();
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [dataExportRequested, setDataExportRequested] = useState(false);

  const handleMarketingConsentChange = async () => {
    // Update user's marketing consent in the database
    await fetch('/api/user/marketing-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: !marketingConsent }),
    });
    setMarketingConsent(!marketingConsent);
  };

  const handleDataExportRequest = async () => {
    // Request user data export
    await fetch('/api/user/data-export', { method: 'POST' });
    setDataExportRequested(true);
  };

  if (!session) return <div>Please sign in to access privacy settings.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={handleMarketingConsentChange}
              className="mr-2"
            />
            Receive marketing communications
          </label>
        </div>
        <div>
          <Button onClick={handleDataExportRequest} disabled={dataExportRequested}>
            {dataExportRequested ? 'Data export requested' : 'Request data export'}
          </Button>
        </div>
      </div>
    </div>
  );
}

