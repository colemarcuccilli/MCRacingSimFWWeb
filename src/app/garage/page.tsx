'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Button from '@/components/Button'
import SectionDivider from '@/components/SectionDivider'
import PricingCard from '@/components/PricingCard'
import BookingWidget from '@/components/BookingWidget'
import ScrambleText from '@/components/ScrambleText'

gsap.registerPlugin(ScrollTrigger)

const pricingPlans = [
  {
    name: 'Sprint',
    duration: '1 Hour',
    soloPrice: 65,
    groupPrice: 170,
    perDriver: 57,
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
    soloPrice: 120,
    groupPrice: 330,
    perDriver: 110,
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
    soloPrice: 170,
    groupPrice: 450,
    perDriver: 150,
    features: [
      'Full simulator access',
      'All racing titles included',
      'Full telemetry analysis',
      'Complimentary refreshments',
      'Track coaching included',
      'Best value per hour',
    ],
    popular: false,
    color: 'cyan' as const,
  },
]

export default function GaragePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const ctx = gsap.context(() => {
      // Hero animation - immediate
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

      // Pricing cards - use fromTo for reliability
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

      // Grid logic section
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

      // Tech inspection cards
      gsap.fromTo('.tech-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 85%',
            once: true,
          },
        }
      )
    })

    return () => ctx.revert()
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
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&q=80"
            alt="Racing background"
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
            From quick sprints to endurance sessions. Solo or with your crew.
            Every session includes full access to our professional-grade simulators.
          </p>

          {/* Grid capacity notice */}
          <div className="inline-flex items-center gap-3 px-4 py-3 bg-apex-red/10 border border-apex-red/30">
            <svg className="w-5 h-5 text-apex-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="telemetry-text text-sm text-grid-white">
              We only have <span className="text-apex-red font-bold">3 spots</span> on the grid.
            </span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 bg-asphalt">
        <div className="max-w-7xl mx-auto px-6">
          {/* Pricing Toggle Info */}
          <div className="text-center mb-12">
            <p className="telemetry-text text-pit-gray mb-4">
              <span className="text-telemetry-cyan">TIP://</span> Book as a team of 3 and save on every session
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className="pricing-card"
                style={{ opacity: isLoaded ? undefined : 1 }}
              >
                <PricingCard
                  {...plan}
                  isSelected={selectedPlan === plan.name}
                  onSelect={() => setSelectedPlan(plan.name)}
                />
              </div>
            ))}
          </div>

          {/* Grid Logic Section */}
          <div className="grid-logic-section max-w-4xl mx-auto">
            <div className="bg-asphalt-dark border border-white/10 p-8">
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
                    <p className="telemetry-text text-grid-white mb-1">Real-Time Availability</p>
                    <p className="telemetry-text text-sm text-pit-gray">
                      See exactly which time slots are open. Limited to 3 seats per session.
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

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-asphalt-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block telemetry-text text-sm text-apex-red uppercase tracking-widest mb-4">
              // Book Your Session
            </span>
            <h2 className="racing-headline text-4xl md:text-5xl text-grid-white mb-4">
              Secure Your Spot on
              <span className="text-telemetry-cyan"> The Grid</span>
            </h2>
            <p className="telemetry-text text-pit-gray max-w-xl mx-auto">
              Select your preferred date, time, and session type. Complete your tech inspection (waiver) before arrival.
            </p>
          </div>

          <BookingWidget selectedPlan={selectedPlan} />
        </div>
      </section>

      <SectionDivider />

      {/* What to Expect Section */}
      <section className="tech-section py-20 bg-asphalt">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="racing-headline text-3xl md:text-4xl text-grid-white mb-4">
              <ScrambleText text="Tech Inspection" />
              <span className="text-apex-red"> Protocol</span>
            </h2>
            <p className="telemetry-text text-pit-gray max-w-xl mx-auto">
              What to know before your session
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🎮',
                title: 'Driving Shoes',
                description: 'Thin-soled shoes or socks required in the cockpit. No street shoes.',
              },
              {
                icon: '📋',
                title: 'Waiver Required',
                description: 'Complete your digital tech inspection before arrival to save time.',
              },
              {
                icon: '⏰',
                title: 'Arrive Early',
                description: '15 minutes early for orientation. Your session time is track time.',
              },
              {
                icon: '🏆',
                title: 'Race Ready',
                description: 'No experience needed. We will get you up to speed.',
              },
            ].map((item, i) => (
              <div key={i} className="tech-card bg-asphalt-dark p-6 border border-white/5 hover:border-apex-red/30 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="racing-headline text-lg text-grid-white mb-2">{item.title}</h3>
                <p className="telemetry-text text-sm text-pit-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
