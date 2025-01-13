import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AdBanner } from './AdBanner';
import { PremiumFeatures } from './PremiumFeatures';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const showAds = !session?.user?.subscription || session.user.subscription.plan === 'basic';

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Oommah
          </Link>
          <div className="space-x-4">
            <Link href="/" className={router.pathname === '/' ? 'font-bold' : ''}>
              Home
            </Link>
            <Link href="/discover" className={router.pathname === '/discover' ? 'font-bold' : ''}>
              Discover
            </Link>
            <Link href="/marketplace" className={router.pathname === '/marketplace' ? 'font-bold' : ''}>
              Marketplace
            </Link>
            <Link href="/profile" className={router.pathname === '/profile' ? 'font-bold' : ''}>
              Profile
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {showAds && (
          <AdBanner
            src="/placeholder.svg?height=90&width=728"
            alt="Advertisement"
            link="https://example.com/ad"
          />
        )}
        {children}
        <PremiumFeatures />
      </main>
      <footer className="bg-gray-100 p-4 text-center">
        <p>&copy; 2023 Oommah. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

