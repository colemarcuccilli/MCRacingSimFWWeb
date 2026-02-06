'use client'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-carbon-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="racing-headline text-4xl text-grid-white mb-8">
          Terms & <span className="text-telemetry-cyan">Conditions</span>
        </h1>

        <div className="bg-asphalt-dark border border-white/10 p-8 space-y-6 telemetry-text text-pit-gray">
          <p className="text-sm text-pit-gray">Last Updated: February 5, 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">1. Acceptance of Terms</h2>
            <p>
              By booking a session, checking in, or using the services of MC Racing Sim, you agree
              to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">2. Booking and Payment</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All bookings are subject to availability</li>
              <li>Payment is collected in person after your session</li>
              <li>We accept cash, credit cards, and debit cards</li>
              <li>Prices are subject to change without notice</li>
              <li>Group bookings require all participants to complete waivers before racing</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">3. Cancellation Policy</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Cancellations made 24+ hours in advance: No charge</li>
              <li>Cancellations made less than 24 hours in advance: Subject to a cancellation fee</li>
              <li>No-shows may be charged the full session price</li>
              <li>To cancel, call us at (808) 220-2600</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">4. Arrival and Check-in</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Please arrive 10 minutes before your scheduled session</li>
              <li>All participants must complete a liability waiver before racing</li>
              <li>Late arrivals may result in reduced session time</li>
              <li>We reserve the right to refuse service to anyone who appears intoxicated</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">5. Liability Waiver</h2>
            <p>
              All participants must sign a liability waiver before using our simulators.
              By signing the waiver, you acknowledge:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Sim racing may cause motion sickness in some individuals</li>
              <li>You assume all risks associated with using the equipment</li>
              <li>MC Racing Sim is not liable for any injuries or damages</li>
              <li>Participants under 18 must have a parent/guardian sign on their behalf</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">6. Equipment and Conduct</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Treat all equipment with care and respect</li>
              <li>Report any equipment issues to staff immediately</li>
              <li>No food or drinks near the simulators</li>
              <li>Damage caused by misuse may result in repair charges</li>
              <li>We reserve the right to end a session for inappropriate behavior</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">7. SMS Communications</h2>
            <p>
              By providing your phone number during booking, you consent to receive SMS messages
              from MC Racing Sim including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Booking confirmations</li>
              <li>Session reminders</li>
              <li>Check-in links for group members</li>
              <li>Cancellation notices</li>
            </ul>
            <p className="mt-2">
              <span className="text-grid-white">Message frequency:</span> Varies based on your bookings<br />
              <span className="text-grid-white">Message and data rates:</span> May apply<br />
              <span className="text-grid-white">To opt out:</span> Reply STOP to any message<br />
              <span className="text-grid-white">For help:</span> Reply HELP or call (808) 220-2600
            </p>
            <p className="mt-2">
              Supported carriers include AT&T, Verizon, T-Mobile, Sprint, and most major US carriers.
              Carriers are not liable for delayed or undelivered messages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">8. Age Requirements</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Minimum age to use simulators: 10 years old</li>
              <li>Participants under 18 must have a parent/guardian present or sign the waiver</li>
              <li>Staff may request ID to verify age</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">9. Hours of Operation</h2>
            <p>
              <span className="text-grid-white">Tuesday - Sunday:</span> 12:00 PM - 2:00 AM<br />
              <span className="text-grid-white">Monday:</span> Closed
            </p>
            <p className="mt-2">
              Hours may vary on holidays. Check our website or call for current hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">10. Limitation of Liability</h2>
            <p>
              MC Racing Sim and its owners, employees, and affiliates shall not be liable for any
              direct, indirect, incidental, or consequential damages arising from your use of our
              services or equipment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will
              be posted on this page with an updated revision date. Continued use of our services
              constitutes acceptance of any changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">12. Contact Us</h2>
            <p>
              Questions about these Terms and Conditions? Contact us:
            </p>
            <div className="ml-4 space-y-1">
              <p><span className="text-grid-white">Phone:</span> (808) 220-2600</p>
              <p><span className="text-grid-white">Address:</span> 1205 W Main St, Fort Wayne, IN</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="telemetry-text text-telemetry-cyan hover:text-white transition-colors"
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
