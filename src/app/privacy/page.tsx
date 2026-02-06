'use client'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-carbon-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="racing-headline text-4xl text-grid-white mb-8">
          Privacy <span className="text-telemetry-cyan">Policy</span>
        </h1>

        <div className="bg-asphalt-dark border border-white/10 p-8 space-y-6 telemetry-text text-pit-gray">
          <p className="text-sm text-pit-gray">Last Updated: February 5, 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">1. Information We Collect</h2>
            <p>
              When you book a session or check in at MC Racing Sim, we collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Date of birth</li>
              <li>How you heard about us (optional)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Process and confirm your bookings</li>
              <li>Send booking confirmations and reminders via SMS</li>
              <li>Contact you about your scheduled sessions</li>
              <li>Maintain records for liability waiver purposes</li>
              <li>Send promotional updates (only if you opt in)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">3. SMS Messaging</h2>
            <p>
              By providing your phone number during booking, you consent to receive transactional
              SMS messages including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Booking confirmations</li>
              <li>Session reminders (24 hours before your booking)</li>
              <li>Check-in links for additional racers in your group</li>
              <li>Cancellation notices</li>
            </ul>
            <p>
              Message frequency varies based on your bookings. Message and data rates may apply.
              Reply STOP to any message to unsubscribe from SMS notifications. Reply HELP for assistance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information only with:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Service providers who assist in our operations (SMS delivery, payment processing)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">6. Data Retention</h2>
            <p>
              We retain your booking information and waiver records for a minimum of 3 years
              for legal and operational purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal retention requirements)</li>
              <li>Opt out of promotional communications</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your personal information, contact us:
            </p>
            <div className="ml-4 space-y-1">
              <p><span className="text-grid-white">Phone:</span> (808) 220-2600</p>
              <p><span className="text-grid-white">Address:</span> 1205 W Main St, Fort Wayne, IN</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date.
            </p>
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
