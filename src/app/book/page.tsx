import { Metadata } from 'next'
import BookingFlow from '@/components/booking/BookingFlow'

export const metadata: Metadata = {
  title: 'Book Your Session | MC Racing Sim',
  description: 'Book your sim racing session at MC Racing Sim in Fort Wayne. Choose your date, time, and number of racers.',
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-carbon-black pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="racing-headline text-4xl md:text-5xl text-grid-white mb-4">
            Book Your <span className="text-apex-red">Session</span>
          </h1>
          <p className="telemetry-text text-pit-gray max-w-xl mx-auto">
            Reserve your spot on the grid. Choose your racers, duration, and preferred time slot.
          </p>
        </div>

        {/* Booking Flow */}
        <BookingFlow />
      </div>
    </main>
  )
}
