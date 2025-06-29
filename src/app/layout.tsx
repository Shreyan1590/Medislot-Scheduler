
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BookingProvider } from '@/context/BookingContext';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DR Medlab',
  description: 'Precision Diagnostics, Unmatched Care. Book your medical appointments with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-sans antialiased', inter.variable)}>
        <BookingProvider>
          <main className="min-h-screen bg-background flex flex-col items-center">
            {children}
          </main>
          <Toaster />
        </BookingProvider>
      </body>
    </html>
  );
}
