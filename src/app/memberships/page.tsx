import { Metadata } from 'next'
import MembershipsClient from './MembershipsClient'

export const metadata: Metadata = {
  title: 'Memberships - Unlimited Racing Plans',
  description: 'MC Racing Sim Fort Wayne monthly memberships. Rookie ($200), Pro ($250), Elite ($300), or Duo ($375). Unlimited solo racing plus bring friends. All tiers include unlimited hours.',
  keywords: [
    'sim racing membership Fort Wayne',
    'monthly racing membership',
    'racing simulator subscription',
    'unlimited sim racing',
    'Fort Wayne racing membership',
  ],
  openGraph: {
    title: 'Memberships | MC Racing Sim Fort Wayne',
    description: 'Monthly memberships starting at $200. Unlimited solo racing plus bring friends to race with you.',
    url: 'https://mcracingfortwayne.com/memberships',
    images: ['/assets/SimRacer.webp'],
  },
  alternates: {
    canonical: 'https://mcracingfortwayne.com/memberships',
  },
}

export default function MembershipsPage() {
  return <MembershipsClient />
}
