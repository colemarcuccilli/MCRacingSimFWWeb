'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Button from '@/components/Button'
import SectionDivider from '@/components/SectionDivider'
import ScrambleText from '@/components/ScrambleText'

gsap.registerPlugin(ScrollTrigger)

const partyInclusions = [
  {
    icon: '🏎️',
    title: '3 Pro-Grade Simulators',
    description: 'Exclusive access to all rigs during your event',
  },
  {
    icon: '🛤️',
    title: 'RC Track Access',
    description: 'Head-to-head battles on the indoor dirt track',
  },
  {
    icon: '🏁',
    title: 'Race Director',
    description: 'Dedicated host to run your event seamlessly',
  },
  {
    icon: '🏆',
    title: 'Podium Ceremony',
    description: 'Trophy presentation and winner celebration',
  },
  {
    icon: '📊',
    title: 'Digital Race Results',
    description: 'Lap times and standings sent to all guests',
  },
  {
    icon: '🍕',
    title: 'Party Space',
    description: 'Dedicated area for food, cake, and gifts',
  },
]

const rotationSteps = [
  {
    time: '0:00 - 0:45',
    activity: 'Group A on Simulators',
    secondary: 'Group B on RC Track + Lounge',
  },
  {
    time: '0:45 - 1:30',
    activity: 'Group B on Simulators',
    secondary: 'Group A on RC Track + Lounge',
  },
  {
    time: '1:30 - 2:15',
    activity: 'Finals & Championship Round',
    secondary: 'All participants compete for podium',
  },
  {
    time: '2:15 - 3:00',
    activity: 'Podium Ceremony & Party Time',
    secondary: 'Cake, presents, celebration',
  },
]

export default function PitLaneClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const packageRef = useRef<HTMLDivElement>(null)
  const corporateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pitlane-hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      )

      gsap.fromTo('.inclusion-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: packageRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo('.rotation-step',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.rotation-section', start: 'top 85%', once: true },
        }
      )

      gsap.fromTo('.corporate-content',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: corporateRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo('.faq-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.faq-section', start: 'top 85%', once: true },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={heroRef} className="relative pt-32 pb-20 bg-asphalt-dark overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-apex-red/50 to-transparent" />
        <div className="absolute inset-0 opacity-90">
          <Image src="/assets/RCCarsSmallLinedUp.webp" alt="RC cars lined up at MC Racing Sim" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt-dark via-asphalt-dark/80 to-asphalt-dark" />
        </div>
        <div className="absolute top-20 right-0 w-32 h-32 checkered-pattern opacity-20 transform rotate-12" />
        <div className="absolute bottom-0 left-0 w-48 h-48 checkered-pattern opacity-10 transform -rotate-6" />
        <div className="relative max-w-6xl mx-auto px-6 pitlane-hero-content">
          <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">// The Pit Lane</span>
          <h1 className="racing-headline text-5xl md:text-6xl lg:text-7xl text-grid-white mb-6">
            <ScrambleText text="The Ultimate" />
            <span className="text-apex-red"> Birthday Grand Prix</span>
          </h1>
          <p className="telemetry-text text-lg text-pit-gray max-w-2xl mb-8">
            Epic for them. Effortless for you. You bring the crew (up to 10 racers), we provide the track, the cars, and the Race Director.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#birthday-package" size="lg">View Birthday Package</Button>
            <Button href="#corporate" variant="secondary" size="lg">Corporate Events</Button>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="birthday-package" ref={packageRef} className="py-20 bg-asphalt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-apex-red/10 border border-apex-red/30 mb-6">
              <span className="racing-headline text-3xl text-apex-red">$500</span>
              <span className="telemetry-text text-pit-gray">/ 3 HOURS</span>
            </div>
            <h2 className="racing-headline text-4xl md:text-5xl text-grid-white mb-4">
              <ScrambleText text="Birthday Race" /><span className="text-telemetry-cyan"> Package</span>
            </h2>
            <p className="telemetry-text text-pit-gray max-w-xl mx-auto">
              Up to 10 racers. 3 hours of exclusive facility access. Everything handled by our professional Race Director.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partyInclusions.map((item, i) => (
              <div key={i} className="inclusion-item bg-asphalt-dark p-6 border border-white/5 hover:border-apex-red/30 transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="racing-headline text-lg text-grid-white mb-2">{item.title}</h3>
                <p className="telemetry-text text-sm text-pit-gray">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="rotation-section max-w-4xl mx-auto">
            <div className="bg-asphalt-dark border border-white/10 p-8">
              <h3 className="racing-headline text-2xl text-grid-white mb-2 text-center">
                <span className="text-telemetry-cyan">// </span>The Grid Rotation
              </h3>
              <p className="telemetry-text text-sm text-pit-gray text-center mb-8">How 10 kids use 3 simulators: Non-stop action, zero downtime.</p>
              <div className="space-y-4">
                {rotationSteps.map((step, i) => (
                  <div key={i} className="rotation-step flex items-start gap-4 p-4 bg-asphalt border border-white/5">
                    <div className="w-24 flex-shrink-0"><span className="telemetry-text text-sm text-telemetry-cyan">{step.time}</span></div>
                    <div className="flex-grow">
                      <p className="racing-headline text-grid-white mb-1">{step.activity}</p>
                      <p className="telemetry-text text-sm text-pit-gray">{step.secondary}</p>
                    </div>
                    <div className="w-8 h-8 bg-apex-red/20 flex items-center justify-center flex-shrink-0">
                      <span className="racing-headline text-sm text-apex-red">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button href="/pricing#booking" size="lg">Book a Birthday Party</Button>
            <p className="telemetry-text text-sm text-pit-gray mt-4">Questions? Call us at <a href="tel:+18082202600" className="text-telemetry-cyan hover:underline">1(808) 220-2600</a></p>
          </div>
        </div>
      </section>

      <SectionDivider variant="gradient" />

      <section id="corporate" ref={corporateRef} className="py-20 bg-asphalt-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="corporate-content">
              <span className="inline-block telemetry-text text-sm text-telemetry-cyan uppercase tracking-widest mb-4">// Corporate Events</span>
              <h2 className="racing-headline text-4xl md:text-5xl text-grid-white mb-6">
                <ScrambleText text="Team Building" /> at<span className="text-apex-red"> 200 MPH</span>
              </h2>
              <p className="telemetry-text text-pit-gray leading-relaxed mb-8">
                Settle the office rivalry on the track. Our corporate packages deliver an unforgettable team experience that actually brings people together—through competition.
              </p>
              <ul className="space-y-4 mb-8">
                {['Private facility rental', 'Custom championship formats', 'Team standings and awards', 'Catering coordination available', 'AV setup for presentations', 'Flexible scheduling'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 telemetry-text text-grid-white">
                    <span className="w-2 h-2 bg-telemetry-cyan transform rotate-45" />{feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button href="mailto:mcsimracing@gmail.com">Request Quote</Button>
                <Button variant="secondary" href="tel:+18082202600">Call 1(808) 220-2600</Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-asphalt border border-white/10 overflow-hidden">
                <Image src="/assets/GroupParty.webp" alt="Group event at MC Racing Sim" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 border-2 border-telemetry-cyan/50 rounded-full flex items-center justify-center bg-asphalt/80">
                      <svg className="w-12 h-12 text-telemetry-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="racing-headline text-2xl text-grid-white mb-2">Groups of 6-30</p>
                    <p className="telemetry-text text-pit-gray">Custom packages available</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-asphalt p-4 border border-white/10">
                <p className="telemetry-text text-xs text-pit-gray">STARTING AT</p>
                <p className="racing-headline text-2xl text-apex-red">$450 / 2 HRS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="faq-section py-20 bg-asphalt">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="racing-headline text-3xl md:text-4xl text-grid-white mb-4">
              Frequently Asked<span className="text-telemetry-cyan"> Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What ages are appropriate for birthday parties?', a: 'Our simulators work great for ages 8 and up. The RC track is suitable for all ages with parental supervision.' },
              { q: 'Can we bring our own food and cake?', a: 'Yes! You are welcome to bring food, cake, and decorations. We have a dedicated party space with tables and chairs.' },
              { q: 'What if someone has never raced before?', a: 'No experience needed! Our Race Director will provide a full briefing and our simulators have adjustable difficulty settings.' },
              { q: 'How far in advance should we book?', a: 'We recommend booking at least 2 weeks in advance, especially for weekend parties. Popular dates fill up fast.' },
              { q: 'Is there a deposit required?', a: 'Yes, a 50% deposit is required to secure your booking. The remaining balance is due on the day of the event.' },
            ].map((faq, i) => (
              <details key={i} className="faq-item group bg-asphalt-dark border border-white/10 hover:border-white/20 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="racing-headline text-lg text-grid-white pr-4">{faq.q}</span>
                  <span className="w-6 h-6 border border-white/30 flex items-center justify-center flex-shrink-0 group-open:bg-apex-red group-open:border-apex-red transition-all">
                    <svg className="w-4 h-4 text-pit-gray group-open:text-white group-open:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6"><p className="telemetry-text text-pit-gray">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
