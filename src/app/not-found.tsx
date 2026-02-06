import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-asphalt-dark">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* 404 Display */}
        <div className="relative mb-8">
          <span className="racing-headline text-[200px] md:text-[300px] text-asphalt-light leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="racing-headline text-4xl md:text-6xl text-apex-red">
              OFF TRACK
            </span>
          </div>
        </div>

        <h1 className="racing-headline text-3xl md:text-4xl text-grid-white mb-4">
          You've Left The
          <span className="text-telemetry-cyan"> Racing Line</span>
        </h1>

        <p className="telemetry-text text-pit-gray mb-8 max-w-md mx-auto">
          Looks like you've hit a corner we haven't mapped yet. Let's get you back
          on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary px-8 py-4"
          >
            Back to Start Line
          </Link>
          <Link
            href="/pricing"
            className="btn-secondary px-8 py-4"
          >
            Book a Session
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex items-center justify-center gap-8 text-pit-gray">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-apex-red" />
          <span className="telemetry-text text-xs uppercase tracking-widest">
            Error Code: Corner_Not_Found
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-telemetry-cyan" />
        </div>
      </div>
    </section>
  )
}
