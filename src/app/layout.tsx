import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

const siteUrl = 'https://mcracingfortwayne.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MC Racing Sim Fort Wayne | Professional Sim Racing & RC Track',
    template: '%s | MC Racing Sim Fort Wayne',
  },
  description: 'Fort Wayne\'s only professional-grade Sim Racing & RC Lounge. Experience real physics with no consequences on our $15k simulator rigs. Located at 1205 W Main St, Fort Wayne, IN 46808. Call 1(808) 220-2600 to book.',
  keywords: [
    'sim racing Fort Wayne',
    'racing simulator Indiana',
    'RC track Fort Wayne',
    'iRacing',
    'racing simulator',
    'birthday party Fort Wayne',
    'corporate events Fort Wayne',
    'team building Fort Wayne',
    'sim racing near me',
    'professional racing simulator',
    'RC car racing',
    'indoor RC track',
    'Fort Wayne entertainment',
    'Fort Wayne activities',
    'racing experience',
  ],
  authors: [{ name: 'MC Racing Sim Fort Wayne' }],
  creator: 'MC Racing Sim Fort Wayne',
  publisher: 'MC Racing Sim Fort Wayne',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'MC Racing Sim Fort Wayne | Real Physics. No Consequences.',
    description: 'Fort Wayne\'s premier sim racing destination. Professional-grade simulators, indoor RC track, birthday parties & corporate events. Call 1(808) 220-2600.',
    url: siteUrl,
    siteName: 'MC Racing Sim Fort Wayne',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MC Racing Sim Fort Wayne - Professional Racing Simulators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MC Racing Sim Fort Wayne',
    description: 'Real Physics. No Consequences. Fort Wayne\'s premier sim racing destination.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'entertainment',
}

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
}

// JSON-LD structured data for local business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AmusementPark',
  name: 'MC Racing Sim Fort Wayne',
  description: 'Professional-grade sim racing and RC track lounge in Fort Wayne, Indiana.',
  url: siteUrl,
  telephone: '+1-808-220-2600',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1205 W Main St',
    addressLocality: 'Fort Wayne',
    addressRegion: 'IN',
    postalCode: '46808',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.0793,
    longitude: -85.1494,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '12:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '12:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [
    'https://www.facebook.com/mcracingsim',
    'https://www.instagram.com/mcracingsim',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Racing Sessions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sprint Session (1 Hour)',
          description: 'One hour of professional sim racing',
        },
        price: '55.00',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Grand Prix Session (2 Hours)',
          description: 'Two hours of professional sim racing',
        },
        price: '90.00',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Endurance Session (3 Hours)',
          description: 'Three hours of professional sim racing',
        },
        price: '130.00',
        priceCurrency: 'USD',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-asphalt text-grid-white antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
