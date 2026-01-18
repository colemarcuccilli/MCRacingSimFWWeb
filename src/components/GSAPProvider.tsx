'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP(callback: () => void | (() => void), deps: any[] = []) {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback)
    return () => ctx.revert()
  }, deps)
}

export function useScrollReveal(ref: React.RefObject<HTMLElement>, options?: gsap.TweenVars) {
  useGSAP(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale')

    elements.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        ...options,
      })
    })
  }, [ref])
}

export function initTextReveal(element: HTMLElement | null) {
  if (!element) return

  const text = element.innerText
  element.innerHTML = ''

  text.split('').forEach((char, i) => {
    const span = document.createElement('span')
    span.innerText = char === ' ' ? '\u00A0' : char
    span.style.opacity = '0'
    span.style.display = 'inline-block'
    element.appendChild(span)

    gsap.to(span, {
      opacity: 1,
      duration: 0.05,
      delay: i * 0.03,
      ease: 'power2.out',
    })
  })
}

export function createTextColorAnimation(element: HTMLElement | null, colors: string[]) {
  if (!element) return

  const chars = element.querySelectorAll('span')

  return gsap.to(chars, {
    color: gsap.utils.wrap(colors),
    duration: 0.5,
    stagger: 0.02,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
  })
}

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
