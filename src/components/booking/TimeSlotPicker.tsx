'use client'

import { useState, useEffect } from 'react'
import { getTimeSlots } from '@/lib/pricing'

interface TimeSlot {
  time: string
  available: boolean
  simsAvailable?: number
}

interface TimeSlotPickerProps {
  date: string | null
  duration: 1 | 2 | 3
  racerCount: 1 | 2 | 3
  value: string | null
  onChange: (time: string) => void
}

export default function TimeSlotPicker({
  date,
  duration,
  racerCount,
  value,
  onChange,
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)

  const allTimeSlots = getTimeSlots()

  useEffect(() => {
    if (!date) {
      setSlots([])
      return
    }

    async function fetchTimeSlots() {
      setLoading(true)
      try {
        const scriptUrl = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL
        if (!scriptUrl) {
          // Generate local availability if no script URL
          const localSlots: TimeSlot[] = allTimeSlots.map((time) => ({
            time,
            available: true,
            simsAvailable: 3,
          }))
          setSlots(localSlots)
          setLoading(false)
          return
        }

        const response = await fetch(
          `${scriptUrl}?action=getTimeSlots&date=${date}&duration=${duration}&racerCount=${racerCount}`
        )
        const data = await response.json()

        if (data.success && data.slots) {
          setSlots(data.slots)
        } else {
          // Fallback to all available
          const localSlots: TimeSlot[] = allTimeSlots.map((time) => ({
            time,
            available: true,
          }))
          setSlots(localSlots)
        }
      } catch (error) {
        console.error('Error fetching time slots:', error)
        // Fallback to all available
        const localSlots: TimeSlot[] = allTimeSlots.map((time) => ({
          time,
          available: true,
        }))
        setSlots(localSlots)
      }
      setLoading(false)
    }

    fetchTimeSlots()
  }, [date, duration, racerCount, allTimeSlots])

  if (!date) {
    return (
      <div className="space-y-4">
        <h3 className="racing-headline text-xl text-grid-white">
          Pick a <span className="text-telemetry-cyan">Time</span>
        </h3>
        <div className="bg-asphalt-dark border border-white/10 p-6">
          <p className="telemetry-text text-pit-gray text-center">
            Select a date first to see available times
          </p>
        </div>
      </div>
    )
  }

  // Group slots by period (afternoon, evening, late night)
  const afternoonSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(':')[0])
    const isPM = s.time.includes('PM')
    return isPM && hour >= 12 && hour !== 12 ? false : isPM && hour === 12 ? true : isPM && hour < 6
  }).filter((s) => {
    const hour = parseInt(s.time.split(':')[0])
    const isPM = s.time.includes('PM')
    return isPM && (hour === 12 || hour < 6)
  })

  const eveningSlots = slots.filter((s) => {
    const hour = parseInt(s.time.split(':')[0])
    const isPM = s.time.includes('PM')
    return isPM && hour >= 6 && hour !== 12
  })

  const lateNightSlots = slots.filter((s) => {
    const isAM = s.time.includes('AM')
    return isAM
  })

  const renderSlotGroup = (groupSlots: TimeSlot[], label: string) => (
    <div className="space-y-2">
      <p className="telemetry-text text-xs text-pit-gray uppercase tracking-wider">{label}</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {groupSlots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            onClick={() => slot.available && onChange(slot.time)}
            disabled={!slot.available || loading}
            className={`
              py-2 px-3 text-center transition-all telemetry-text text-sm
              ${value === slot.time ? 'bg-telemetry-cyan text-asphalt-dark font-bold' : ''}
              ${!value || value !== slot.time ? (slot.available ? 'border border-white/20 hover:border-telemetry-cyan/50 text-grid-white' : 'border border-white/5 text-pit-gray/50 cursor-not-allowed') : ''}
            `}
          >
            {slot.time.replace(':00', '').replace(' ', '')}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 className="racing-headline text-xl text-grid-white">
        Pick a <span className="text-telemetry-cyan">Time</span>
      </h3>

      <div className="bg-asphalt-dark border border-white/10 p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-telemetry-cyan border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {afternoonSlots.length > 0 && renderSlotGroup(afternoonSlots, 'Afternoon')}
            {eveningSlots.length > 0 && renderSlotGroup(eveningSlots, 'Evening')}
            {lateNightSlots.length > 0 && renderSlotGroup(lateNightSlots, 'Late Night')}
          </>
        )}

        <p className="telemetry-text text-xs text-pit-gray border-t border-white/10 pt-3">
          <span className="text-apex-red">Hours:</span> Noon - 2:00 AM (Tue-Sun) • Closed Mondays
        </p>
      </div>
    </div>
  )
}
