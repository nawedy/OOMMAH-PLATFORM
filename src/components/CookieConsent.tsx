import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-md">
      <p className="mb-2">
        We use cookies to improve your experience on our site. By continuing to use our site, you agree to our use of cookies.
      </p>
      <div className="flex space-x-4">
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleDecline} variant="outline">Decline</Button>
      </div>
    </div>
  );
}

