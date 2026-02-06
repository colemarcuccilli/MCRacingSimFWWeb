'use client'

import { useState, useEffect, useMemo } from 'react'
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

  // Memoize time slots so they don't cause re-renders
  const allTimeSlots = useMemo(() => getTimeSlots(), [])

  // Generate local slots (all available)
  const generateLocalSlots = (): TimeSlot[] => {
    return allTimeSlots.map((time) => ({
      time,
      available: true,
      simsAvailable: 3,
    }))
  }

  useEffect(() => {
    if (!date) {
      setSlots([])
      return
    }

    async function fetchTimeSlots() {
      setLoading(true)

      // Generate local slots as baseline
      const localSlots = generateLocalSlots()

      try {
        const scriptUrl = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL
        if (!scriptUrl) {
          setSlots(localSlots)
          setLoading(false)
          return
        }

        const response = await fetch(
          `${scriptUrl}?action=getTimeSlots&date=${date}&duration=${duration}&racerCount=${racerCount}`
        )
        const data = await response.json()

        if (data.success && data.slots && data.slots.length > 0) {
          setSlots(data.slots)
        } else {
          // Fallback to all available
          setSlots(localSlots)
        }
      } catch (error) {
        console.error('Error fetching time slots:', error)
        // Fallback to all available
        setSlots(localSlots)
      }
      setLoading(false)
    }

    fetchTimeSlots()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, duration, racerCount])

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

  // Parse time to get hour in 24h format
  const getHour24 = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ')
    let hour = parseInt(time.split(':')[0])
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0
    return hour
  }

  // Group slots by period
  const afternoonSlots = slots.filter((s) => {
    const hour = getHour24(s.time)
    return hour >= 12 && hour < 17 // 12pm - 5pm
  })

  const eveningSlots = slots.filter((s) => {
    const hour = getHour24(s.time)
    return hour >= 17 && hour < 24 // 5pm - midnight
  })

  const lateNightSlots = slots.filter((s) => {
    const hour = getHour24(s.time)
    return hour >= 0 && hour < 2 // midnight - 2am
  })

  const renderSlotGroup = (groupSlots: TimeSlot[], label: string) => {
    if (groupSlots.length === 0) return null

    return (
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
                ${value !== slot.time && slot.available ? 'border border-white/20 hover:border-telemetry-cyan/50 text-grid-white' : ''}
                ${!slot.available ? 'border border-white/5 text-pit-gray/50 cursor-not-allowed' : ''}
              `}
            >
              {slot.time.replace(':00', '').replace(':30', ':30').replace(' ', '')}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const hasSlots = slots.length > 0

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
        ) : !hasSlots ? (
          <div className="py-8 text-center">
            <p className="telemetry-text text-pit-gray">No time slots available for this date</p>
          </div>
        ) : (
          <>
            {renderSlotGroup(afternoonSlots, 'Afternoon')}
            {renderSlotGroup(eveningSlots, 'Evening')}
            {renderSlotGroup(lateNightSlots, 'Late Night')}
          </>
        )}

        <p className="telemetry-text text-xs text-pit-gray border-t border-white/10 pt-3">
          <span className="text-apex-red">Hours:</span> Noon - 2:00 AM (Tue-Sun) • Closed Mondays
        </p>
      </div>
    </div>
  )
}
