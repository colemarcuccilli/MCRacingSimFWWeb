'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const obj = { value: 0 }
        gsap.to(obj, {
          value: end,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.round(obj.value))
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [end, duration])

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
