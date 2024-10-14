import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import RootWrapper from '@/components/RootWrapper';
import type React from 'react';

const suitVariable = localFont({
  src: './fonts/SUIT-Variable.woff2',
  variable: '--font-suit-variable',
});

export const metadata: Metadata = {
  title: '디미고인 백오피스',
  description: '한국디지털미디어고등학교 인트라넷, 디미고인의 백오피스',
  openGraph: {
    images: [{ url: 'https://manage.dimigo.in/images/og-image.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suitVariable.variable} antialiased`}>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
