import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/lib/providers';
import { Sidebar } from '@/components/layout/sidebar';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mom`s Restaurant',
  description: 'Manage orders, reservations, and more',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers >
          <div className="restaurant-gradient min-h-screen">
            <div className="restaurant-pattern min-h-screen">
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 ml-64 p-6">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}