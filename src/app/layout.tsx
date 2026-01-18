import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'MC Racing Sim Fort Wayne | Professional Sim Racing & RC Track',
  description: 'Fort Wayne\'s only professional-grade Sim Racing & RC Lounge. Experience real physics with no consequences on our $15k simulator rigs. Book your session today.',
  keywords: 'sim racing, RC track, Fort Wayne, racing simulator, iRacing, RC cars, birthday parties, corporate events',
  openGraph: {
    title: 'MC Racing Sim Fort Wayne',
    description: 'Real Physics. No Consequences. Fort Wayne\'s premier sim racing destination.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-asphalt text-grid-white antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
