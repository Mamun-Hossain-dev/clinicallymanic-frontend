import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Providers from './providers'
import './globals.css'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  // VERY IMPORTANT
  metadataBase: new URL('https://clinicallymanic.com'),

  title: {
    default: 'Clinically Manic - Curated Madness',
    template: '%s | Clinically Manic',
  },

  description:
    'A community based platform for those who suffer from the rare condition of content-induced mania. We tailor content throughout platform towards promoting those who choose to undertake paths out of the common norm and strive to uplift those around them.',

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'Clinically Manic - Curated Madness',
    description:
      'A community based platform for those who suffer from the rare condition of content-induced mania. We tailor content throughout platform towards promoting those who choose to undertake paths out of the common norm and strive to uplift those around them.',
    url: 'https://clinicallymanic.com',
    siteName: 'Clinically Manic',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Clinically Manic',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Clinically Manic - Curated Madness',
    description:
      'A community based platform for those who suffer from the rare condition of content-induced mania. We tailor content throughout platform towards promoting those who choose to undertake paths out of the common norm and strive to uplift those around them.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-site`}>
        <Providers>{children}</Providers>

        <Analytics />

        <Toaster
          position="top-right"
          richColors
          theme="light"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#111827',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </body>
    </html>
  )
}
