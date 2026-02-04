import { Metadata } from 'next'
import MembershipsClient from './MembershipsClient'

export const metadata: Metadata = {
  title: 'Memberships - Monthly Racing Plans',
  description: 'MC Racing Sim Fort Wayne monthly memberships. Starter ($100/4hrs), Plus ($175/8hrs), Unlimited ($250), or Duo ($150/6hrs shared). Save on sim time with discounted overage rates.',
  keywords: [
    'sim racing membership Fort Wayne',
    'monthly racing membership',
    'racing simulator subscription',
    'unlimited sim racing',
    'Fort Wayne racing membership',
  ],
  openGraph: {
    title: 'Memberships | MC Racing Sim Fort Wayne',
    description: 'Monthly memberships starting at $100. Save on hours and get discounted overage rates.',
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
