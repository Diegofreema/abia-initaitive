import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import './globals.css';
import { ConvexClientProvider } from '@/features/provider/convec-client-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'ABIA Youth Leadership Academy',
  description: 'Empowering the next generation of leaders in Abia State',
  keywords: 'youth, leadership, academy, abia, nigeria, development, training',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
