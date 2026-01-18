'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    })

    tl.to('.loading-bar', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    })
      .to('.loading-text', {
        opacity: 0,
        duration: 0.3,
      }, '-=0.3')
      .to('.loading-screen', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      })

    return () => {
      tl.kill()
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen fixed inset-0 z-[100] bg-asphalt-dark flex flex-col items-center justify-center">
      <div className="loading-text flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-apex-red flex items-center justify-center transform -skew-x-6">
            <span className="text-white font-bold text-2xl transform skew-x-6">MC</span>
          </div>
          <div>
            <span className="racing-headline text-2xl text-grid-white">Racing Sim</span>
            <span className="block text-xs text-pit-gray telemetry-text tracking-widest">FORT WAYNE</span>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-asphalt-light overflow-hidden">
          <div className="loading-bar h-full bg-apex-red" style={{ width: '0%' }} />
        </div>

        <p className="telemetry-text text-xs text-pit-gray mt-4 uppercase tracking-widest">
          Initializing Grid...
        </p>
      </div>
    </div>
  )
}
