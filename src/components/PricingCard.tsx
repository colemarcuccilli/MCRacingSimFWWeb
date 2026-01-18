'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface PricingCardProps {
  name: string
  duration: string
  soloPrice: number
  groupPrice: number
  perDriver: number
  features: string[]
  popular?: boolean
  color: 'red' | 'cyan'
  isSelected?: boolean
  onSelect?: () => void
  className?: string
}

export default function PricingCard({
  name,
  duration,
  soloPrice,
  groupPrice,
  perDriver,
  features,
  popular = false,
  color,
  isSelected = false,
  onSelect,
  className = '',
}: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent
      const rect = card.getBoundingClientRect()
      const x = mouseEvent.clientX - rect.left
      const y = mouseEvent.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleSelectClick = () => {
    // Call the onSelect handler if provided
    if (onSelect) {
      onSelect()
    }

    // Scroll to booking/phone section
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const colorClasses = {
    red: {
      border: 'border-apex-red',
      bg: 'bg-apex-red/10',
      text: 'text-apex-red',
      glow: 'shadow-apex-red/20',
    },
    cyan: {
      border: 'border-telemetry-cyan',
      bg: 'bg-telemetry-cyan/10',
      text: 'text-telemetry-cyan',
      glow: 'shadow-telemetry-cyan/20',
    },
  }

  const colors = colorClasses[color]

  return (
    <div
      ref={cardRef}
      className={`
        relative p-6 bg-asphalt-dark border transition-all duration-300
        ${isSelected || popular ? colors.border : 'border-white/10'}
        ${isSelected ? `shadow-lg ${colors.glow}` : ''}
        hover:border-white/30 hover:shadow-lg
        ${className}
      `}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={`inline-block px-4 py-1 text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 pt-2">
        <h3 className={`racing-headline text-2xl mb-1 ${colors.text}`}>{name}</h3>
        <p className="telemetry-text text-sm text-pit-gray">{duration}</p>
      </div>

      {/* Pricing */}
      <div className="space-y-4 mb-6">
        {/* Solo price */}
        <div className="text-center p-4 bg-asphalt border border-white/5">
          <p className="telemetry-text text-xs text-pit-gray uppercase mb-1">Solo Driver</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-telemetry-cyan text-lg">$</span>
            <span className="racing-headline text-4xl text-grid-white">{soloPrice}</span>
          </div>
        </div>

        {/* Group price */}
        <div className={`text-center p-4 ${colors.bg} border ${colors.border}`}>
          <p className="telemetry-text text-xs text-pit-gray uppercase mb-1">Team Entry (3 Drivers)</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-lg ${colors.text}`}>$</span>
            <span className={`racing-headline text-4xl ${colors.text}`}>{groupPrice}</span>
          </div>
          <p className="telemetry-text text-xs text-pit-gray mt-1">
            ${perDriver}/driver
          </p>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 telemetry-text text-sm text-grid-white">
            <svg className={`w-4 h-4 ${colors.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={handleSelectClick}
        className={`
          w-full relative overflow-hidden inline-flex items-center justify-center
          font-bold uppercase tracking-wider py-3 px-6 text-sm
          transition-all duration-300 ease-out
          ${popular
            ? 'bg-apex-red text-white hover:bg-apex-red-glow hover:shadow-lg hover:shadow-apex-red/50'
            : 'bg-transparent border-2 border-telemetry-cyan text-telemetry-cyan hover:bg-telemetry-cyan hover:text-asphalt-dark'
          }
        `}
        style={{
          clipPath: popular ? 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' : undefined,
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        Select {name}
      </button>

      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-4 h-1 ${popular ? 'bg-apex-red' : 'bg-white/20'}`} />
      <div className={`absolute top-0 left-0 w-1 h-4 ${popular ? 'bg-apex-red' : 'bg-white/20'}`} />
      <div className={`absolute bottom-0 right-0 w-4 h-1 ${popular ? 'bg-telemetry-cyan' : 'bg-white/20'}`} />
      <div className={`absolute bottom-0 right-0 w-1 h-4 ${popular ? 'bg-telemetry-cyan' : 'bg-white/20'}`} />
    </div>
  )
}
