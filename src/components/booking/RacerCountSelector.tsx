'use client'

interface RacerCountSelectorProps {
  value: 1 | 2 | 3
  onChange: (count: 1 | 2 | 3) => void
}

export default function RacerCountSelector({ value, onChange }: RacerCountSelectorProps) {
  const options: { count: 1 | 2 | 3; label: string; description: string }[] = [
    { count: 1, label: '1 Racer', description: 'Solo session' },
    { count: 2, label: '2 Racers', description: 'Bring a friend' },
    { count: 3, label: '3 Racers', description: 'Full grid' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="racing-headline text-xl text-grid-white">
        How Many <span className="text-apex-red">Racers?</span>
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.count}
            type="button"
            onClick={() => onChange(option.count)}
            className={`p-4 border transition-all text-center ${
              value === option.count
                ? 'border-apex-red bg-apex-red/10'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="racing-headline text-3xl text-grid-white mb-1">
              {option.count}
            </div>
            <div className="telemetry-text text-sm text-pit-gray">
              {option.description}
            </div>
          </button>
        ))}
      </div>
      <p className="telemetry-text text-xs text-pit-gray">
        <span className="text-telemetry-cyan">Note:</span> Price is per session, not per person.
        Everyone races together!
      </p>
    </div>
  )
}
