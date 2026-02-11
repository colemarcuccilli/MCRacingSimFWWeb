import { Metadata } from 'next'
import MembershipsClient from './MembershipsClient'

export const metadata: Metadata = {
  title: 'Memberships - Unlimited Racing Plans',
  description: 'MC Racing Sim Fort Wayne monthly memberships. Solo ($150), Crew ($200), VIP ($250), or Duo ($300). Unlimited solo racing plus bring friends. 3-month commitment required.',
  keywords: [
    'sim racing membership Fort Wayne',
    'monthly racing membership',
    'racing simulator subscription',
    'unlimited sim racing',
    'Fort Wayne racing membership',
  ],
  openGraph: {
    title: 'Memberships | MC Racing Sim Fort Wayne',
    description: 'Monthly memberships starting at $150. Unlimited solo racing plus bring friends to race with you. 3-month commitment required.',
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
