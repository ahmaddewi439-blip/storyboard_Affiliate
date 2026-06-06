import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Storyboard Generator',
  description: 'Generator storyboard dan prompt TikTok Affiliate dengan Gemini API.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
