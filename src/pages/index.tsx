import dynamic from 'next/dynamic';

const ProfileWidget = dynamic(() => import('profile/ProfileWidget'), {
  ssr: false,
});

const MarketplaceWidget = dynamic(() => import('marketplace/MarketplaceWidget'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>Welcome to Oommah</h1>
      <ProfileWidget />
      <MarketplaceWidget />
    </div>
  );
}

