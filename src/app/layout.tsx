import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EVA SYNC — Pilot Dashboard',
  description: 'NGE-styled health command center · Oura Ring integration',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}