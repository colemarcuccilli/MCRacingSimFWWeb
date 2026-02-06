'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { formatDateLong } from '@/lib/pricing'

function ConfirmationContent() {
  const searchParams = useSearchParams()

  const bookingId = searchParams.get('bookingId') || 'MC-XXXXXX'
  const date = searchParams.get('date')
  const time = searchParams.get('time')
  const duration = searchParams.get('duration')
  const racers = searchParams.get('racers')
  const price = searchParams.get('price')
  const name = searchParams.get('name')

  return (
    <main className="min-h-screen bg-carbon-black pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-telemetry-cyan/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-telemetry-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="racing-headline text-4xl md:text-5xl text-grid-white mb-4">
            Booking <span className="text-telemetry-cyan">Confirmed!</span>
          </h1>
          <p className="telemetry-text text-pit-gray">
            Thanks{name ? `, ${name}` : ''}! Your session has been booked.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-asphalt-dark border border-telemetry-cyan/30 p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="telemetry-text text-xs text-pit-gray uppercase tracking-wider">Booking ID</p>
              <p className="racing-headline text-2xl text-telemetry-cyan">{bookingId}</p>
            </div>
            <div className="px-3 py-1 bg-telemetry-cyan/20 text-telemetry-cyan telemetry-text text-sm uppercase">
              Confirmed
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="telemetry-text text-xs text-pit-gray">Date</p>
              <p className="telemetry-text text-lg text-grid-white">
                {date ? formatDateLong(date) : '-'}
              </p>
            </div>
            <div>
              <p className="telemetry-text text-xs text-pit-gray">Time</p>
              <p className="telemetry-text text-lg text-grid-white">{time || '-'}</p>
            </div>
            <div>
              <p className="telemetry-text text-xs text-pit-gray">Duration</p>
              <p className="telemetry-text text-lg text-grid-white">
                {duration} hour{duration !== '1' ? 's' : ''}
              </p>
            </div>
            <div>
              <p className="telemetry-text text-xs text-pit-gray">Racers</p>
              <p className="telemetry-text text-lg text-grid-white">{racers}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between items-center">
              <p className="telemetry-text text-pit-gray">Total Due (pay at arrival)</p>
              <p className="racing-headline text-3xl text-apex-red">${price}</p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-asphalt-dark border border-white/10 p-6 mb-6">
          <h3 className="racing-headline text-xl text-grid-white mb-4">
            <span className="text-apex-red">Location</span>
          </h3>
          <p className="telemetry-text text-grid-white text-lg">MC Racing Sim</p>
          <p className="telemetry-text text-pit-gray">1205 W Main St</p>
          <p className="telemetry-text text-pit-gray">Fort Wayne, IN 46808</p>
          <a
            href="https://maps.google.com/?q=1205+W+Main+St,+Fort+Wayne,+IN+46808"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-telemetry-cyan telemetry-text hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>

        {/* Important Notes */}
        <div className="bg-apex-red/10 border border-apex-red/30 p-6 mb-8">
          <h3 className="racing-headline text-lg text-apex-red mb-3">Important</h3>
          <ul className="space-y-2 telemetry-text text-sm text-pit-gray">
            <li className="flex items-start gap-2">
              <span className="text-apex-red">•</span>
              Please arrive 10 minutes early for check-in
            </li>
            <li className="flex items-start gap-2">
              <span className="text-apex-red">•</span>
              Payment is collected in person after your session
            </li>
            {racers && parseInt(racers) > 1 && (
              <li className="flex items-start gap-2">
                <span className="text-apex-red">•</span>
                Additional racers will receive an SMS to complete their waivers
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-apex-red">•</span>
              Questions? Call us at{' '}
              <a href="tel:+18082202600" className="text-telemetry-cyan hover:underline">
                (808) 220-2600
              </a>
            </li>
          </ul>
        </div>

        {/* Confirmation sent notice */}
        <div className="text-center mb-8 p-4 bg-white/5 border border-white/10">
          <p className="telemetry-text text-sm text-pit-gray">
            A confirmation has been sent to your phone and email.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 border border-white/20 text-grid-white telemetry-text text-center hover:border-white/40 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/book"
            className="px-8 py-3 bg-apex-red text-white racing-headline text-center hover:bg-apex-red/90 transition-colors"
          >
            Book Another Session
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-carbon-black pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-telemetry-cyan border-t-transparent rounded-full" />
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
