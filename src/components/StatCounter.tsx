'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export default function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: StatCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return

    const counter = { value: 0 }

    ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated) return
        setHasAnimated(true)

        gsap.to(counter, {
          value: value,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counter.value).toLocaleString()
            }
          },
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === counterRef.current) {
          trigger.kill()
        }
      })
    }
  }, [value, duration, hasAnimated])

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        {prefix && (
          <span className="stat-number text-telemetry-cyan">{prefix}</span>
        )}
        <span
          ref={counterRef}
          className="stat-number text-grid-white"
        >
          0
        </span>
        {suffix && (
          <span className="stat-number text-apex-red">{suffix}</span>
        )}
      </div>
      <p className="telemetry-text text-sm text-pit-gray mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  )
}
