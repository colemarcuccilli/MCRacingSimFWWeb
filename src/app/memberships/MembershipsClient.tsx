'use client'

import Button from '@/components/Button'
import SectionDivider from '@/components/SectionDivider'

export default function MembershipsClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-asphalt-dark overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">
            // Commit to Speed
          </span>
          <h1 className="racing-headline text-5xl md:text-6xl text-grid-white mb-6">
            Monthly
            <span className="text-apex-red"> Memberships</span>
          </h1>
          <p className="telemetry-text text-lg text-pit-gray max-w-2xl mx-auto">
            Lock in your track time. Save on every session. Whether you're training for competition
            or just love to race, there's a membership tier for you.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Individual Memberships */}
      <section className="py-16 bg-asphalt">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block telemetry-text text-sm text-telemetry-cyan uppercase tracking-widest mb-4">
              // Solo Drivers
            </span>
            <h2 className="racing-headline text-4xl text-grid-white">
              Individual <span className="text-telemetry-cyan">Memberships</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-asphalt-dark border border-white/10 p-8 relative overflow-hidden hover:border-telemetry-cyan/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-telemetry-cyan/50" />
              <div className="text-center mb-6">
                <h3 className="racing-headline text-2xl text-grid-white mb-2">Starter</h3>
                <div className="racing-headline text-5xl text-telemetry-cyan">$100</div>
                <div className="telemetry-text text-pit-gray text-sm">per month</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Hours</span>
                  <span className="telemetry-text text-grid-white font-bold">4 hrs/month</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Commitment</span>
                  <span className="telemetry-text text-grid-white font-bold">3 Months</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Overage Rate</span>
                  <span className="telemetry-text text-telemetry-cyan font-bold">$40/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="telemetry-text text-pit-gray">Savings</span>
                  <span className="telemetry-text text-apex-red font-bold">10% Off</span>
                </div>
              </div>

              <div className="text-center">
                <Button href="/garage#booking" variant="secondary" fullWidth>
                  Get Started
                </Button>
              </div>
            </div>

            {/* Plus */}
            <div className="bg-asphalt-dark border border-white/10 p-8 relative overflow-hidden hover:border-telemetry-cyan/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-telemetry-cyan/50" />
              <div className="text-center mb-6">
                <h3 className="racing-headline text-2xl text-grid-white mb-2">Plus</h3>
                <div className="racing-headline text-5xl text-telemetry-cyan">$175</div>
                <div className="telemetry-text text-pit-gray text-sm">per month</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Hours</span>
                  <span className="telemetry-text text-grid-white font-bold">8 hrs/month</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Commitment</span>
                  <span className="telemetry-text text-grid-white font-bold">Monthly</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Overage Rate</span>
                  <span className="telemetry-text text-telemetry-cyan font-bold">$38/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="telemetry-text text-pit-gray">Savings</span>
                  <span className="telemetry-text text-apex-red font-bold">15% Off</span>
                </div>
              </div>

              <div className="text-center">
                <Button href="/garage#booking" variant="secondary" fullWidth>
                  Get Started
                </Button>
              </div>
            </div>

            {/* Unlimited */}
            <div className="bg-asphalt-dark border-2 border-apex-red p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-apex-red" />
              <div className="absolute top-4 right-4">
                <span className="bg-apex-red text-white telemetry-text text-xs uppercase tracking-wider px-3 py-1">
                  Best Value
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="racing-headline text-2xl text-grid-white mb-2">Unlimited</h3>
                <div className="racing-headline text-5xl text-apex-red">$250</div>
                <div className="telemetry-text text-pit-gray text-sm">per month</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Hours</span>
                  <span className="telemetry-text text-apex-red font-bold">Unlimited</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Commitment</span>
                  <span className="telemetry-text text-grid-white font-bold">Monthly</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Overage Rate</span>
                  <span className="telemetry-text text-pit-gray">N/A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="telemetry-text text-pit-gray">Access</span>
                  <span className="telemetry-text text-apex-red font-bold">All Hours</span>
                </div>
              </div>

              <div className="text-center">
                <Button href="/garage#booking" fullWidth>
                  Go Unlimited
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Duo Membership */}
      <section className="py-16 bg-asphalt-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">
              // Race Together
            </span>
            <h2 className="racing-headline text-4xl text-grid-white">
              Duo <span className="text-apex-red">Membership</span>
            </h2>
            <p className="telemetry-text text-pit-gray mt-4">
              Split your hours with a friend, family member, or teammate.
            </p>
          </div>

          <div className="bg-asphalt border-2 border-apex-red/50 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-apex-red to-telemetry-cyan" />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="racing-headline text-3xl text-grid-white mb-2">Duo</h3>
                <div className="racing-headline text-6xl text-apex-red">$150</div>
                <div className="telemetry-text text-pit-gray">per month</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Members</span>
                  <span className="telemetry-text text-grid-white font-bold">2 People</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Hours</span>
                  <span className="telemetry-text text-grid-white font-bold">6 hrs shared</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="telemetry-text text-pit-gray">Commitment</span>
                  <span className="telemetry-text text-grid-white font-bold">3 Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="telemetry-text text-pit-gray">Overage Rate</span>
                  <span className="telemetry-text text-telemetry-cyan font-bold">$40/hr each</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button href="/garage#booking" size="lg">
                Sign Up as Duo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="checkered" />

      {/* How It Works */}
      <section className="py-16 bg-asphalt">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block telemetry-text text-sm text-telemetry-cyan uppercase tracking-widest mb-4">
              // The Details
            </span>
            <h2 className="racing-headline text-4xl text-grid-white">
              How It <span className="text-telemetry-cyan">Works</span>
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h3 className="racing-headline text-xl text-grid-white mb-3">
                <span className="text-telemetry-cyan">01 // </span>Monthly Hours
              </h3>
              <p className="telemetry-text text-pit-gray">
                Your membership includes a set number of sim hours per month. Use them whenever you want
                during operating hours — no scheduling restrictions. Hours reset at the start of each billing cycle.
              </p>
            </div>

            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h3 className="racing-headline text-xl text-grid-white mb-3">
                <span className="text-telemetry-cyan">02 // </span>Overage Rates
              </h3>
              <p className="telemetry-text text-pit-gray">
                Used all your hours? No problem. Keep racing at your discounted overage rate.
                Starter members pay $40/hr (10% off), Plus members pay $38/hr (15% off).
                Regular rate is $55/hr, so you save every time.
              </p>
            </div>

            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h3 className="racing-headline text-xl text-grid-white mb-3">
                <span className="text-telemetry-cyan">03 // </span>Commitment Terms
              </h3>
              <p className="telemetry-text text-pit-gray">
                Starter and Duo memberships require a 3-month minimum commitment.
                Plus and Unlimited are month-to-month — cancel anytime with 30 days notice.
              </p>
            </div>

            <div className="bg-asphalt-dark p-6 border border-white/10">
              <h3 className="racing-headline text-xl text-grid-white mb-3">
                <span className="text-telemetry-cyan">04 // </span>Duo Membership
              </h3>
              <p className="telemetry-text text-pit-gray">
                The Duo membership is for two named drivers who share 6 hours per month.
                Split it however you want — 3 and 3, or 5 and 1. Both drivers must be registered
                at signup. Perfect for couples, friends, or parent/child combos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Comparison Table */}
      <section className="py-16 bg-asphalt-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">
              // Compare
            </span>
            <h2 className="racing-headline text-4xl text-grid-white">
              Membership <span className="text-apex-red">Comparison</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left telemetry-text text-pit-gray uppercase tracking-wider py-4 px-4">Feature</th>
                  <th className="text-center telemetry-text text-telemetry-cyan uppercase tracking-wider py-4 px-4">Starter</th>
                  <th className="text-center telemetry-text text-telemetry-cyan uppercase tracking-wider py-4 px-4">Plus</th>
                  <th className="text-center telemetry-text text-apex-red uppercase tracking-wider py-4 px-4">Unlimited</th>
                  <th className="text-center telemetry-text text-apex-red uppercase tracking-wider py-4 px-4">Duo</th>
                </tr>
              </thead>
              <tbody className="telemetry-text">
                <tr className="border-b border-white/10">
                  <td className="text-pit-gray py-4 px-4">Price</td>
                  <td className="text-center text-grid-white py-4 px-4">$100/mo</td>
                  <td className="text-center text-grid-white py-4 px-4">$175/mo</td>
                  <td className="text-center text-grid-white py-4 px-4">$250/mo</td>
                  <td className="text-center text-grid-white py-4 px-4">$150/mo</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-pit-gray py-4 px-4">Hours</td>
                  <td className="text-center text-grid-white py-4 px-4">4 hrs</td>
                  <td className="text-center text-grid-white py-4 px-4">8 hrs</td>
                  <td className="text-center text-apex-red font-bold py-4 px-4">Unlimited</td>
                  <td className="text-center text-grid-white py-4 px-4">6 hrs</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-pit-gray py-4 px-4">Drivers</td>
                  <td className="text-center text-grid-white py-4 px-4">1</td>
                  <td className="text-center text-grid-white py-4 px-4">1</td>
                  <td className="text-center text-grid-white py-4 px-4">1</td>
                  <td className="text-center text-grid-white py-4 px-4">2</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="text-pit-gray py-4 px-4">Overage</td>
                  <td className="text-center text-telemetry-cyan py-4 px-4">$40/hr</td>
                  <td className="text-center text-telemetry-cyan py-4 px-4">$38/hr</td>
                  <td className="text-center text-pit-gray py-4 px-4">—</td>
                  <td className="text-center text-telemetry-cyan py-4 px-4">$40/hr</td>
                </tr>
                <tr>
                  <td className="text-pit-gray py-4 px-4">Commitment</td>
                  <td className="text-center text-grid-white py-4 px-4">3 mo</td>
                  <td className="text-center text-grid-white py-4 px-4">Monthly</td>
                  <td className="text-center text-grid-white py-4 px-4">Monthly</td>
                  <td className="text-center text-grid-white py-4 px-4">3 mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-asphalt">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="racing-headline text-3xl text-grid-white mb-4">
            Ready to <span className="text-apex-red">Commit?</span>
          </h2>
          <p className="telemetry-text text-pit-gray mb-8">
            Call us or stop by to set up your membership. We'll get you on the grid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="tel:+18082202600" size="lg">
              Call 1(808) 220-2600
            </Button>
            <Button href="/location" variant="secondary" size="lg">
              Visit Us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
