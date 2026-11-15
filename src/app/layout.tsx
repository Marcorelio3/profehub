import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Providers } from './providers';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ProfeLab - Plataforma Educacional para Professores',
    template: '%s | ProfeLab',
  },
  description:
    'Crie, compartilhe e colabore em atividades educacionais de qualidade profissional. Editor A4, biblioteca colaborativa, controle de direitos autorais.',
  keywords: ['educação', 'professores', 'atividades', 'editor', 'A4', 'colaboração', 'LGPD'],
  authors: [{ name: 'ProfeLab Team' }],
  creator: 'ProfeLab',
  publisher: 'ProfeLab',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://profelab.com',
    siteName: 'ProfeLab',
    title: 'ProfeLab - Plataforma Educacional para Professores',
    description:
      'Crie, compartilhe e colabore em atividades educacionais de qualidade profissional.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProfeLab - Editor de Atividades A4',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProfeLab - Plataforma Educacional para Professores',
    description:
      'Crie, compartilhe e colabore em atividades educacionais de qualidade profissional.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
