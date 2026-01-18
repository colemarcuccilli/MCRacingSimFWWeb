'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Start Line', shortLabel: 'Home' },
  { href: '/garage', label: 'The Garage', shortLabel: 'Pricing' },
  { href: '/pit-lane', label: 'The Pit Lane', shortLabel: 'Events' },
  { href: '/location', label: 'The Paddock', shortLabel: 'Location' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-asphalt-dark/95 backdrop-blur-md py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-apex-red flex items-center justify-center transform -skew-x-6 group-hover:skew-x-0 transition-transform duration-300">
              <span className="text-white font-bold text-xl transform skew-x-6 group-hover:skew-x-0 transition-transform duration-300">
                MC
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-telemetry-cyan"></div>
          </div>
          <div className="hidden sm:block">
            <span className="racing-headline text-xl text-grid-white group-hover:text-apex-red transition-colors">
              Racing Sim
            </span>
            <span className="block text-xs text-pit-gray telemetry-text tracking-widest">
              FORT WAYNE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative telemetry-text text-sm uppercase tracking-widest transition-colors duration-300 hover:text-apex-red ${
                pathname === link.href ? 'text-apex-red' : 'text-grid-white'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-apex-red"></span>
              )}
            </Link>
          ))}
          <Link href="/garage#booking" className="btn-primary text-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-grid-white transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-grid-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-grid-white transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-asphalt-dark/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`racing-headline text-2xl transition-colors ${
                pathname === link.href ? 'text-apex-red' : 'text-grid-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/garage#booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary text-center mt-4"
          >
            Book Your Session
          </Link>
        </div>
      </div>
    </nav>
  )
}
