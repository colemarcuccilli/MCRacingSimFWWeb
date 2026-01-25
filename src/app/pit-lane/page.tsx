import { Metadata } from 'next'
import PitLaneClient from './PitLaneClient'

export const metadata: Metadata = {
  title: 'Birthday Parties & Corporate Events',
  description: 'Host the ultimate birthday party or corporate event at MC Racing Sim Fort Wayne. $500 birthday package for up to 10 racers with 3 hours of exclusive access. Corporate team building starting at $450. Call 1(808) 220-2600.',
  keywords: [
    'birthday party Fort Wayne',
    'kids birthday party ideas Fort Wayne',
    'racing birthday party Indiana',
    'corporate team building Fort Wayne',
    'corporate events Fort Wayne',
    'unique birthday party venue',
    'sim racing party',
    'group events Fort Wayne',
  ],
  openGraph: {
    title: 'Birthday Parties & Corporate Events | MC Racing Sim Fort Wayne',
    description: 'Epic birthday parties for up to 10 racers. Corporate team building that brings people together through competition.',
    url: 'https://mcracingfortwayne.com/pit-lane',
    images: ['/assets/GroupParty.webp'],
  },
  alternates: {
    canonical: 'https://mcracingfortwayne.com/pit-lane',
  },
}

export default function PitLanePage() {
  return <PitLaneClient />
}
