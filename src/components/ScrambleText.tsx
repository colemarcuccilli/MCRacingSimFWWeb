'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  revealDelay?: number
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}/'

export default function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 30,
  revealDelay = 50,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            startScramble()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [text])

  const startScramble = () => {
    setIsScrambling(true)
    let iteration = 0
    const totalIterations = text.length

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= totalIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }

      iteration += 1 / 3
    }, scrambleSpeed)
  }

  return (
    <span
      ref={elementRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => {
        if (!isScrambling) {
          hasAnimated.current = false
          startScramble()
        }
      }}
    >
      {displayText}
    </span>
  )
}
