import { Metadata } from 'next'
import LeaguesClient from './LeaguesClient'

export const metadata: Metadata = {
  title: 'Leagues - Competitive Racing',
  description: 'Join the MC Racing Sim Fort Wayne leagues. Local 3-racer heat format or Online time attack racing against drivers nationwide. 12-week seasons, prize pools, and championship finals.',
  keywords: [
    'sim racing league Fort Wayne',
    'racing league Indiana',
    'competitive sim racing',
    'online racing league',
    'local racing league',
    'sim racing championship',
    'time attack racing',
  ],
  openGraph: {
    title: 'Racing Leagues | MC Racing Sim Fort Wayne',
    description: 'Compete in 12-week seasons. Local heat racing or online time attack against drivers nationwide.',
    url: 'https://mcracingfortwayne.com/leagues',
    images: ['/assets/SimRacer.webp'],
  },
  alternates: {
    canonical: 'https://mcracingfortwayne.com/leagues',
  },
}

export default function LeaguesPage() {
  return <LeaguesClient />
}
