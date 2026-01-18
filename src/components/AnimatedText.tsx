'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  text: string
  className?: string
  animation?: 'reveal' | 'color-cycle' | 'typewriter' | 'scramble'
  colors?: string[]
  delay?: number
  stagger?: number
  scrollTrigger?: boolean
}

export default function AnimatedText({
  text,
  className = '',
  animation = 'reveal',
  colors = ['#E62322', '#00AEEF', '#F5F5F5'],
  delay = 0,
  stagger = 0.03,
  scrollTrigger = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = charsRef.current

      if (animation === 'reveal') {
        const tl = gsap.timeline({
          scrollTrigger: scrollTrigger
            ? {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            : undefined,
        })

        tl.from(chars, {
          opacity: 0,
          y: 20,
          rotateX: -90,
          stagger: stagger,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: delay,
        })
      }

      if (animation === 'color-cycle') {
        gsap.to(chars, {
          color: gsap.utils.wrap(colors),
          duration: 1,
          stagger: {
            each: 0.1,
            repeat: -1,
            yoyo: true,
          },
          ease: 'power2.inOut',
          delay: delay,
        })
      }

      if (animation === 'typewriter') {
        const tl = gsap.timeline({
          scrollTrigger: scrollTrigger
            ? {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            : undefined,
        })

        tl.from(chars, {
          opacity: 0,
          stagger: 0.05,
          duration: 0.01,
          delay: delay,
        })
      }

      if (animation === 'scramble') {
        const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

        chars.forEach((char, i) => {
          const originalChar = char.innerText
          let iterations = 0

          const tl = gsap.timeline({
            scrollTrigger: scrollTrigger
              ? {
                  trigger: containerRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                }
              : undefined,
            delay: delay + i * stagger,
          })

          tl.to(char, {
            duration: 0.4,
            onUpdate: function () {
              iterations++
              if (iterations < 8) {
                char.innerText = scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
              } else {
                char.innerText = originalChar
              }
            },
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [animation, colors, delay, stagger, scrollTrigger, text])

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex
            return (
              <span
                key={`${wordIndex}-${charIndex}`}
                ref={(el) => {
                  if (el) charsRef.current[globalIndex] = el
                }}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
