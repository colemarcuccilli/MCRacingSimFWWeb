'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import SectionDivider from '@/components/SectionDivider'
import PricingCard from '@/components/PricingCard'
import ScrambleText from '@/components/ScrambleText'
import Button from '@/components/Button'

gsap.registerPlugin(ScrollTrigger)

const pricingPlans = [
  {
    name: 'Sprint',
    duration: '1 Hour',
    soloPrice: 55,
    groupPrice: 135,
    perDriver: 45,
    features: [
      'Full simulator access',
      'Choice of racing titles',
      'Telemetry review',
      'Complimentary water',
    ],
    popular: false,
    color: 'cyan' as const,
  },
  {
    name: 'Grand Prix',
    duration: '2 Hours',
    soloPrice: 99,
    groupPrice: 245,
    perDriver: 82,
    features: [
      'Full simulator access',
      'Choice of racing titles',
      'Telemetry review',
      'Complimentary refreshments',
      'Track coaching available',
    ],
    popular: true,
    color: 'red' as const,
  },
  {
    name: 'Endurance',
    duration: '3 Hours',
    soloPrice: 135,
    groupPrice: 325,
    perDriver: 108,
    features: [
      'Full simulator access',
      'Choice of racing titles',
      'Telemetry review',
      'Complimentary refreshments',
      'Track coaching included',
      'Best value per hour',
    ],
    popular: false,
    color: 'cyan' as const,
  },
]

const techSpecs = [
  { label: 'Simulator Rigs', value: '3', unit: 'STATIONS' },
  { label: 'Force Feedback', value: '20', unit: 'NM TORQUE' },
  { label: 'Displays', value: '49"', unit: 'ULTRAWIDE' },
  { label: 'Refresh Rate', value: '240', unit: 'HZ' },
]

export default function GarageClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
      gsap.fromTo('.garage-hero-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      )

      gsap.fromTo('.pricing-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo('.tech-spec-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo('.grid-logic-item',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.grid-logic-section',
            start: 'top 85%',
            once: true,
          },
        }
      )
    })

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 bg-asphalt-dark overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-apex-red/50 to-transparent" />

        {/* Background image */}
        <div className="absolute inset-0 opacity-70">
          <Image
            src="/assets/MCRacingSignBest.webp"
            alt="MC Racing Sim Fort Wayne sign"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt-dark via-asphalt-dark/80 to-asphalt-dark" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 garage-hero-content">
          <span className="inline-block telemetry-text text-sm text-telemetry-cyan uppercase tracking-widest mb-4">
            // The Garage
          </span>
          <h1 className="racing-headline text-5xl md:text-6xl lg:text-7xl text-grid-white mb-6">
            <ScrambleText text="Choose Your" />
            <span className="text-apex-red"> Class</span>
          </h1>
          <p className="telemetry-text text-lg text-pit-gray max-w-2xl mb-8">
            From quick sprints to endurance sessions. Solo runs or full grid with your crew.
            Pick your session, we'll handle the rest.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6">
            {techSpecs.map((spec, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="racing-headline text-3xl text-telemetry-cyan">{spec.value}</span>
                <span className="telemetry-text text-xs text-pit-gray uppercase">{spec.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Book Now Section - Phone CTA */}
      <section id="booking" className="py-20 bg-asphalt-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">
              // Book Your Session
            </span>
            <h2 className="racing-headline text-4xl md:text-5xl text-grid-white mb-4">
              Ready to Hit
              <span className="text-telemetry-cyan"> The Grid?</span>
            </h2>
            <p className="telemetry-text text-pit-gray max-w-xl mx-auto mb-8">
              Call us to reserve your session. We'll get you set up with the perfect time slot.
            </p>

            {/* Phone CTA */}
            <a
              href="tel:+18082202600"
              className="inline-flex flex-col items-center gap-4 p-8 bg-asphalt border border-apex-red/30 hover:border-apex-red transition-colors group"
            >
              <div className="w-16 h-16 bg-apex-red/20 flex items-center justify-center group-hover:bg-apex-red/30 transition-colors">
                <svg className="w-8 h-8 text-apex-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="telemetry-text text-xs text-pit-gray uppercase tracking-widest mb-2">
                  Call to Book
                </p>
                <p className="racing-headline text-3xl md:text-4xl text-apex-red group-hover:text-apex-red-glow transition-colors">
                  1(808) 220-2600
                </p>
              </div>
            </a>

            {/* Driver Requirements */}
            <div className="mt-8 p-4 bg-asphalt border border-white/10 inline-block">
              <p className="telemetry-text text-xs text-pit-gray">
                <span className="text-telemetry-cyan">REQUIREMENTS://</span> Drivers must be 12+ years old and 42+ inches tall
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Two Photo Section - Racing for Everyone */}
      <section className="py-20 bg-asphalt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block telemetry-text text-sm text-telemetry-cyan uppercase tracking-widest mb-4">
              // Racing for Everyone
            </span>
            <h2 className="racing-headline text-3xl md:text-4xl text-grid-white">
              All Ages.
              <span className="text-apex-red"> All Skill Levels.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Kid Racing Photo */}
            <div className="relative aspect-[16/10] overflow-hidden group">
              <Image
                src="/assets/KidRacing.webp"
                alt="Young racer enjoying the simulator"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border border-telemetry-cyan/20 group-hover:border-telemetry-cyan/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-16 h-1 bg-telemetry-cyan" />
              <div className="absolute bottom-0 left-0 w-1 h-16 bg-telemetry-cyan" />
            </div>

            {/* Dad Racing Photo */}
            <div className="relative aspect-[16/10] overflow-hidden group">
              <Image
                src="/assets/FocusedDadRacing.webp"
                alt="Focused racer in the simulator"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border border-apex-red/20 group-hover:border-apex-red/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-16 h-1 bg-apex-red" />
              <div className="absolute bottom-0 right-0 w-1 h-16 bg-apex-red" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 bg-asphalt-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Pricing Toggle Info */}
          <div className="text-center mb-12">
            <p className="telemetry-text text-pit-gray mb-4">
              <span className="text-telemetry-cyan">TIP://</span> Book as a team of 3 and save on every session
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="pricing-card"
                style={{ opacity: isLoaded ? undefined : 1 }}
              >
                <PricingCard
                  {...plan}
                />
              </div>
            ))}
          </div>

          {/* Grid Logic Section */}
          <div className="grid-logic-section max-w-4xl mx-auto">
            <div className="bg-asphalt border border-white/10 p-8">
              <h3 className="racing-headline text-2xl text-grid-white mb-6">
                <span className="text-telemetry-cyan">// </span>
                The Grid Logic
              </h3>

              <div className="space-y-4">
                <div className="grid-logic-item flex items-start gap-4">
                  <div className="w-8 h-8 bg-apex-red/20 flex items-center justify-center flex-shrink-0">
                    <span className="racing-headline text-sm text-apex-red">01</span>
                  </div>
                  <div>
                    <p className="telemetry-text text-grid-white mb-1">Team Entry Discount</p>
                    <p className="telemetry-text text-sm text-pit-gray">
                      Book all 3 simulators as a group and get a discounted rate per driver.
                    </p>
                  </div>
                </div>

                <div className="grid-logic-item flex items-start gap-4">
                  <div className="w-8 h-8 bg-apex-red/20 flex items-center justify-center flex-shrink-0">
                    <span className="racing-headline text-sm text-apex-red">02</span>
                  </div>
                  <div>
                    <p className="telemetry-text text-grid-white mb-1">Call to Book</p>
                    <p className="telemetry-text text-sm text-pit-gray">
                      Sessions are limited to 3 seats. Call us to reserve your spot on the grid.
                    </p>
                  </div>
                </div>

                <div className="grid-logic-item flex items-start gap-4">
                  <div className="w-8 h-8 bg-apex-red/20 flex items-center justify-center flex-shrink-0">
                    <span className="racing-headline text-sm text-apex-red">03</span>
                  </div>
                  <div>
                    <p className="telemetry-text text-grid-white mb-1">Exclusive Time Block</p>
                    <p className="telemetry-text text-sm text-pit-gray">
                      Your team gets the entire facility. No strangers, just racing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What to Expect Section */}
      <section className="tech-section py-20 bg-asphalt">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block telemetry-text text-sm text-telemetry-cyan uppercase tracking-widest mb-4">
              // Tech Inspection
            </span>
            <h2 className="racing-headline text-4xl md:text-5xl text-grid-white mb-4">
              <ScrambleText text="The Protocol" />
            </h2>
            <p className="telemetry-text text-pit-gray max-w-xl mx-auto">
              Every session follows our driver briefing protocol. Here's what to expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Check-In',
                description: 'Arrive 10 minutes early. Sign the digital waiver and get your pit pass.',
                icon: '📋',
              },
              {
                step: '02',
                title: 'Driver Briefing',
                description: 'Learn the controls, safety protocols, and track selection.',
                icon: '🎓',
              },
              {
                step: '03',
                title: 'Seat Time',
                description: 'Get fitted in your rig. We adjust everything to your specs.',
                icon: '🏎️',
              },
              {
                step: '04',
                title: 'Green Flag',
                description: 'Hit the track. Your session time starts when you go green.',
                icon: '🏁',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="tech-spec-item bg-asphalt-dark p-6 border border-white/5 hover:border-telemetry-cyan/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="racing-headline text-2xl text-apex-red/50 group-hover:text-apex-red transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="racing-headline text-lg text-grid-white mb-2">
                  {item.title}
                </h3>
                <p className="telemetry-text text-sm text-pit-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <Button href="#booking" size="lg">
              Book Your Session
            </Button>
            <p className="telemetry-text text-sm text-pit-gray mt-4">
              Questions? Call us at <a href="tel:+18082202600" className="text-telemetry-cyan hover:underline">1(808) 220-2600</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
