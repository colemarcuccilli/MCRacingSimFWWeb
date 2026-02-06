'use client'

interface DurationSelectorProps {
  value: 1 | 2 | 3
  onChange: (duration: 1 | 2 | 3) => void
}

export default function DurationSelector({ value, onChange }: DurationSelectorProps) {
  const options: { duration: 1 | 2 | 3; label: string; description: string }[] = [
    { duration: 1, label: '1 Hour', description: 'Quick session' },
    { duration: 2, label: '2 Hours', description: 'Standard session' },
    { duration: 3, label: '3 Hours', description: 'Extended session' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="racing-headline text-xl text-grid-white">
        Session <span className="text-telemetry-cyan">Length</span>
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.duration}
            type="button"
            onClick={() => onChange(option.duration)}
            className={`p-4 border transition-all text-center ${
              value === option.duration
                ? 'border-telemetry-cyan bg-telemetry-cyan/10'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="racing-headline text-2xl text-grid-white mb-1">
              {option.label}
            </div>
            <div className="telemetry-text text-sm text-pit-gray">
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
