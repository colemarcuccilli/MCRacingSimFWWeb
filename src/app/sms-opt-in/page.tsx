import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SMS Opt-In | MC Racing Fort Wayne',
  description: 'SMS opt-in disclosure for MC Racing Fort Wayne booking notifications.',
}

export default function SmsOptInPage() {
  return (
    <main className="min-h-screen bg-carbon-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="racing-headline text-4xl text-grid-white mb-8">
          SMS <span className="text-telemetry-cyan">Opt-In Disclosure</span>
        </h1>

        <div className="bg-asphalt-dark border border-white/10 p-8 space-y-6 telemetry-text text-pit-gray">
          <div>
            <p className="text-grid-white font-bold">MC Racing Fort Wayne</p>
            <p className="text-sm text-pit-gray">Last Updated: February 14, 2026</p>
          </div>

          {/* How Consent Is Collected */}
          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">How We Collect SMS Consent</h2>
            <p>
              Customers book racing sessions through our website at{' '}
              <a href="https://mcracingfortwayne.com/book" className="text-telemetry-cyan underline hover:text-white">
                mcracingfortwayne.com/book
              </a>
              . The booking process is a multi-step form:
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li><span className="text-grid-white">Step 1 — Setup:</span> Customer selects number of racers and session duration.</li>
              <li><span className="text-grid-white">Step 2 — Date &amp; Time:</span> Customer selects their preferred date and time slot.</li>
              <li><span className="text-grid-white">Step 3 — Details:</span> Customer enters their name, phone number, email, and birthday. Below the form fields, the customer must check an SMS consent checkbox before proceeding. The checkbox is <span className="text-grid-white">unchecked by default</span> and the booking <span className="text-grid-white">cannot be submitted</span> without it.</li>
              <li><span className="text-grid-white">Step 4 — Confirm:</span> Customer reviews all details and confirms the booking.</li>
            </ol>
            <p>
              This is the <span className="text-grid-white">only method</span> by which SMS consent is collected. There is no keyword opt-in, no verbal opt-in, and no paper form opt-in. Consent is collected exclusively through the website booking form.
            </p>
          </section>

          {/* Exact Consent Language */}
          <section className="space-y-3 bg-telemetry-cyan/5 border border-telemetry-cyan/20 p-4 -mx-4 sm:mx-0">
            <h2 className="text-xl text-grid-white font-bold">Exact Opt-In Checkbox Language</h2>
            <p className="text-sm text-pit-gray">
              The following is the exact text displayed next to the SMS consent checkbox on Step 3 of the booking form:
            </p>
            <div className="bg-carbon-black border border-telemetry-cyan/30 p-4 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 border-2 border-telemetry-cyan/50 rounded-sm mt-0.5 flex-shrink-0" />
                <p className="text-sm text-grid-white">
                  I agree to receive booking confirmations, reminders, and session updates via SMS from
                  MC Racing Fort Wayne. Message frequency varies. Msg &amp; data rates may apply. Reply
                  STOP to unsubscribe, HELP for help. View our{' '}
                  <Link href="/privacy" className="text-telemetry-cyan underline hover:text-white">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms" className="text-telemetry-cyan underline hover:text-white">
                    Terms of Service
                  </Link>
                  . <span className="text-apex-red">*</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-pit-gray mt-2">
              The <span className="text-apex-red">*</span> indicates this is a required field. The booking cannot proceed without checking this box.
            </p>
          </section>

          {/* Message Details */}
          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">Messages Sent</h2>
            <p>After opting in and completing a booking, customers receive:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><span className="text-grid-white">Booking confirmation</span> — sent immediately after booking</li>
              <li><span className="text-grid-white">Session reminder</span> — sent the day before the session</li>
              <li><span className="text-grid-white">Pre-race setup instructions</span> — includes waiver link and arrival info</li>
              <li><span className="text-grid-white">Schedule change notifications</span> — only if the session is modified</li>
            </ul>
            <p>
              <span className="text-grid-white">Message frequency:</span> 1–5 messages per booking. Messages are transactional only. No marketing or promotional messages are sent through this program.
            </p>
            <p>
              <span className="text-grid-white">Message and data rates may apply</span> depending on your mobile carrier and plan.
            </p>
          </section>

          {/* Opt-Out */}
          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">How to Opt Out</h2>
            <p>
              Reply <span className="text-telemetry-cyan font-bold">STOP</span> to any message from MC Racing Fort Wayne to unsubscribe. You will receive one final confirmation message and no further SMS messages will be sent.
            </p>
            <p>
              To opt back in, reply <span className="text-telemetry-cyan font-bold">START</span> or check the SMS consent box when making a future booking.
            </p>
          </section>

          {/* Help */}
          <section className="space-y-3">
            <h2 className="text-xl text-grid-white font-bold">How to Get Help</h2>
            <p>
              Reply <span className="text-telemetry-cyan font-bold">HELP</span> to any message, or contact us:
            </p>
            <div className="ml-4 space-y-1">
              <p>Email: <a href="mailto:mcsimracing@gmail.com" className="text-telemetry-cyan underline hover:text-white">mcsimracing@gmail.com</a></p>
              <p>Phone: <a href="tel:+18082202600" className="text-telemetry-cyan underline hover:text-white">(808) 220-2600</a></p>
            </div>
          </section>

          {/* Related Policies */}
          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl text-grid-white font-bold">Related Policies</h2>
            <p>
              Full details about how we handle your information, including our SMS/Text Messaging policy, are available in our:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <Link href="/privacy" className="text-telemetry-cyan underline hover:text-white">Privacy Policy</Link>
                {' '}— includes a dedicated SMS/Text Messaging section
              </li>
              <li>
                <Link href="/terms" className="text-telemetry-cyan underline hover:text-white">Terms of Service</Link>
                {' '}— includes the full SMS Notifications Program details
              </li>
            </ul>
            <p>
              Your phone number will not be shared with third parties for marketing purposes.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl text-grid-white font-bold">Contact Us</h2>
            <div className="ml-4 space-y-1">
              <p className="text-grid-white font-bold">MC Racing Fort Wayne</p>
              <p>1205 W Main St</p>
              <p>Fort Wayne, Indiana 46808</p>
              <p><span className="text-grid-white">Email:</span>{' '}
                <a href="mailto:mcsimracing@gmail.com" className="text-telemetry-cyan underline hover:text-white">mcsimracing@gmail.com</a>
              </p>
              <p><span className="text-grid-white">Phone:</span>{' '}
                <a href="tel:+18082202600" className="text-telemetry-cyan underline hover:text-white">(808) 220-2600</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="telemetry-text text-telemetry-cyan hover:text-white transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
