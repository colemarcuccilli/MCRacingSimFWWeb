import { Metadata } from 'next'
import GarageClient from './GarageClient'

export const metadata: Metadata = {
  title: 'The Garage - Pricing & Booking',
  description: 'Book your sim racing session at MC Racing Sim Fort Wayne. Sprint (1hr $55), Grand Prix (2hr $99), or Endurance (3hr $135) sessions available. Professional-grade simulators with direct-drive wheels and triple screens. Call 1(808) 220-2600.',
  keywords: [
    'sim racing pricing Fort Wayne',
    'racing simulator booking',
    'sim racing sessions',
    'Fort Wayne racing experience',
    'professional racing simulator rental',
    'group racing Fort Wayne',
    'team building racing',
  ],
  openGraph: {
    title: 'Book Your Session | MC Racing Sim Fort Wayne',
    description: 'Sprint, Grand Prix, or Endurance sessions on professional-grade simulators. Solo or group bookings available.',
    url: 'https://mcracingfortwayne.com/garage',
    images: ['/assets/SimRacer.webp'],
  },
  alternates: {
    canonical: 'https://mcracingfortwayne.com/garage',
  },
}

export default function GaragePage() {
  return <GarageClient />
}
