'use client'

interface SectionDividerProps {
  variant?: 'default' | 'gradient' | 'checkered'
  className?: string
}

export default function SectionDivider({
  variant = 'default',
  className = '',
}: SectionDividerProps) {
  if (variant === 'checkered') {
    return (
      <div className={`h-4 checkered-pattern ${className}`} />
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={`relative h-px ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-apex-red to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-telemetry-cyan to-transparent translate-y-1" />
      </div>
    )
  }

  return (
    <div className={`relative h-px ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-apex-red to-transparent" />
    </div>
  )
}
