import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import GlobalProvider from '@/provider/provider';
import '@mdxeditor/editor/style.css';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <GlobalProvider>
          <Suspense>
            {children}
            <Toaster richColors position="top-center" />
          </Suspense>
        </GlobalProvider>
      </body>
    </html>
  );
}
