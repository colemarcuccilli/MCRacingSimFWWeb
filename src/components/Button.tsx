'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const glow = glowRef.current

    if (!button || !glow) return

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent
      const rect = button.getBoundingClientRect()
      const x = mouseEvent.clientX - rect.left
      const y = mouseEvent.clientY - rect.top

      gsap.to(glow, {
        x: x - 75,
        y: y - 75,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      })
      gsap.to(button, {
        scale: 1.02,
        duration: 0.2,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
      })
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const baseStyles = `
    relative overflow-hidden inline-flex items-center justify-center
    font-bold uppercase tracking-wider
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `

  const variants = {
    primary: `
      bg-apex-red text-white
      hover:bg-apex-red-glow hover:shadow-lg hover:shadow-apex-red/50
      active:scale-95
    `,
    secondary: `
      bg-transparent border-2 border-telemetry-cyan text-telemetry-cyan
      hover:bg-telemetry-cyan hover:text-asphalt-dark
    `,
    ghost: `
      bg-transparent text-grid-white
      hover:text-apex-red
    `,
  }

  const sizes = {
    sm: 'py-2 px-4 text-xs',
    md: 'py-3 px-6 text-sm',
    lg: 'py-4 px-8 text-base',
  }

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  const innerContent = (
    <>
      <span
        ref={glowRef}
        className="absolute w-[150px] h-[150px] rounded-full pointer-events-none opacity-0"
        style={{
          background: variant === 'primary'
            ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,174,239,0.3) 0%, transparent 70%)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        className={combinedClassName}
        style={{
          clipPath: variant === 'primary' ? 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' : undefined,
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        {innerContent}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={combinedClassName}
      style={{
        clipPath: variant === 'primary' ? 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' : undefined,
        fontFamily: "'Oswald', sans-serif",
      }}
    >
      {innerContent}
    </button>
  )
}
