import { Providers } from '@/components/Providers';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/features/ErrorBoundary';
import '@/styles/globals.css';

export const metadata = {
  title: 'Oommah Platform',
  description: 'A comprehensive social platform for communities',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <Providers>
            <Navigation />
            <main className="min-h-screen bg-background">
              {children}
            </main>
            <Toaster />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}

