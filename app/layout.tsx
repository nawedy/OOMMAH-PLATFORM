import { Inter } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { Providers } from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Oommah Platform',
  description: 'A comprehensive social platform for communities',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.oommah.com/',
    siteName: 'Oommah Platform',
    images: [
      {
        url: 'https://www.oommah.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oommah Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oommah',
    creator: '@oommah',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <main id="main-content" className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'