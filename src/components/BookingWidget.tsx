'use client'

import { useState, useEffect } from 'react'
import Button from './Button'

interface BookingWidgetProps {
  selectedPlan?: string | null
}

const timeSlots = [
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
]

const sessionTypes = [
  { id: 'sprint', name: 'Sprint', duration: '1 Hour', price: 55 },
  { id: 'grandprix', name: 'Grand Prix', duration: '2 Hours', price: 99 },
  { id: 'endurance', name: 'Endurance', duration: '3 Hours', price: 135 },
]

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Simulate some slots being taken
const bookedSlots: Record<string, string[]> = {
  '2026-01-20': ['6:00 PM', '7:00 PM'],
  '2026-01-21': ['5:00 PM'],
  '2026-01-22': ['7:00 PM', '8:00 PM', '9:00 PM'],
  '2026-02-14': ['6:00 PM', '7:00 PM', '8:00 PM'],
  '2026-02-15': ['5:00 PM', '6:00 PM'],
}

export default function BookingWidget({ selectedPlan }: BookingWidgetProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<string>('grandprix')
  const [driverCount, setDriverCount] = useState(1)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Update session when selectedPlan changes from pricing cards
  useEffect(() => {
    if (selectedPlan) {
      const planId = selectedPlan.toLowerCase().replace(' ', '')
      if (sessionTypes.some(s => s.id === planId)) {
        setSelectedSession(planId)
      }
    }
  }, [selectedPlan])

  // Generate dates for selected month
  const generateDatesForMonth = () => {
    const dates = []
    const today = new Date()
    const firstDay = new Date(selectedYear, selectedMonth, 1)
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0)

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(selectedYear, selectedMonth, day)
      // Only show dates from today onwards
      if (date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        dates.push({
          dateStr: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNum: date.getDate(),
          monthName: date.toLocaleDateString('en-US', { month: 'short' }),
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
        })
      }
    }
    return dates
  }

  const dates = generateDatesForMonth()

  const getAvailableSlots = (date: string) => {
    const booked = bookedSlots[date] || []
    return timeSlots.map((slot) => ({
      time: slot,
      available: !booked.includes(slot),
      spotsLeft: booked.includes(slot) ? 0 : Math.floor(Math.random() * 3) + 1,
    }))
  }

  const selectedSessionData = sessionTypes.find((s) => s.id === selectedSession)

  const calculateTotal = () => {
    if (!selectedSessionData) return 0
    if (driverCount === 3) {
      // Group pricing for 3 people
      const groupPrices: Record<string, number> = {
        sprint: 135,
        grandprix: 245,
        endurance: 325,
      }
      return groupPrices[selectedSession] || selectedSessionData.price * 3
    }
    if (driverCount === 2) {
      // Pricing for 2 people
      const twoPeoplePrices: Record<string, number> = {
        sprint: 99,
        grandprix: 165,
        endurance: 225,
      }
      return twoPeoplePrices[selectedSession] || selectedSessionData.price * 2
    }
    return selectedSessionData.price
  }

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
        setSelectedYear(selectedYear + 1)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    } else {
      const today = new Date()
      // Don't go before current month
      if (selectedYear === today.getFullYear() && selectedMonth === today.getMonth()) {
        return
      }
      if (selectedMonth === 0) {
        setSelectedMonth(11)
        setSelectedYear(selectedYear - 1)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const canGoPrev = () => {
    const today = new Date()
    return !(selectedYear === today.getFullYear() && selectedMonth === today.getMonth())
  }

  return (
    <div className="bg-asphalt border border-white/10">
      {/* Progress indicator */}
      <div className="flex border-b border-white/10">
        {['Session', 'Date & Time', 'Details'].map((label, i) => (
          <div
            key={label}
            className={`flex-1 py-4 text-center transition-colors ${
              step === i + 1
                ? 'bg-apex-red/10 border-b-2 border-apex-red'
                : step > i + 1
                ? 'bg-asphalt-dark'
                : ''
            }`}
          >
            <span
              className={`telemetry-text text-sm ${
                step === i + 1 ? 'text-apex-red' : 'text-pit-gray'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="p-6">
        {/* Step 1: Session Type */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="racing-headline text-xl text-grid-white mb-4">
              Select Your Session Type
            </h3>

            <div className="grid gap-4">
              {sessionTypes.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`p-4 border text-left transition-all ${
                    selectedSession === session.id
                      ? 'border-apex-red bg-apex-red/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="racing-headline text-lg text-grid-white">
                        {session.name}
                      </p>
                      <p className="telemetry-text text-sm text-pit-gray">
                        {session.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="telemetry-text text-xl text-telemetry-cyan">
                        ${session.price}
                      </p>
                      <p className="telemetry-text text-xs text-pit-gray">per driver</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Driver count */}
            <div className="mt-6">
              <p className="telemetry-text text-sm text-pit-gray mb-3">
                Number of Drivers
              </p>
              <div className="flex gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => setDriverCount(count)}
                    className={`flex-1 py-3 text-center transition-all ${
                      driverCount === count
                        ? 'bg-telemetry-cyan text-asphalt-dark'
                        : 'border border-white/20 text-grid-white hover:border-telemetry-cyan'
                    }`}
                  >
                    <span className="racing-headline text-lg">{count}</span>
                    {count === 3 && (
                      <span className="block telemetry-text text-xs mt-1">
                        Team Rate!
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Driver Requirements Notice */}
            <div className="mt-6 p-4 bg-asphalt-dark border border-white/10">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-telemetry-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="telemetry-text text-sm text-grid-white mb-2">
                    Driver Requirements
                  </p>
                  <ul className="space-y-1 telemetry-text text-xs text-pit-gray">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-telemetry-cyan rounded-full" />
                      Minimum age: <span className="text-grid-white">12 years old</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-telemetry-cyan rounded-full" />
                      Minimum height: <span className="text-grid-white">42 inches (3'6")</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-telemetry-cyan rounded-full" />
                      All drivers must complete waiver before session
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button onClick={() => setStep(2)}>
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="racing-headline text-xl text-grid-white mb-4">
              Select Date & Time
            </h3>

            {/* Month Selector */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleMonthChange('prev')}
                disabled={!canGoPrev()}
                className={`p-2 border transition-all ${
                  canGoPrev()
                    ? 'border-white/20 hover:border-apex-red text-grid-white'
                    : 'border-white/10 text-pit-gray cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(parseInt(e.target.value))
                    setSelectedDate(null)
                    setSelectedTime(null)
                  }}
                  className="bg-asphalt-dark border border-white/20 px-4 py-2 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none"
                >
                  {months.map((month, i) => {
                    const today = new Date()
                    // Disable past months
                    if (selectedYear === today.getFullYear() && i < today.getMonth()) {
                      return null
                    }
                    return (
                      <option key={month} value={i}>
                        {month}
                      </option>
                    )
                  })}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(parseInt(e.target.value))
                    setSelectedDate(null)
                    setSelectedTime(null)
                  }}
                  className="bg-asphalt-dark border border-white/20 px-4 py-2 text-grid-white telemetry-text focus:border-telemetry-cyan focus:outline-none"
                >
                  {[2026, 2027].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleMonthChange('next')}
                className="p-2 border border-white/20 hover:border-apex-red text-grid-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Date selector */}
            <div>
              <p className="telemetry-text text-sm text-pit-gray mb-3">Choose a Date</p>
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2">
                    <span className="telemetry-text text-xs text-pit-gray">{day}</span>
                  </div>
                ))}

                {/* Empty cells for days before first of month */}
                {dates.length > 0 && (() => {
                  const firstDate = new Date(dates[0].dateStr)
                  const emptyCells = []
                  for (let i = 0; i < firstDate.getDay(); i++) {
                    emptyCells.push(<div key={`empty-${i}`} className="aspect-square" />)
                  }
                  return emptyCells
                })()}

                {/* Date cells */}
                {dates.map((date) => (
                  <button
                    key={date.dateStr}
                    onClick={() => {
                      setSelectedDate(date.dateStr)
                      setSelectedTime(null)
                    }}
                    className={`aspect-square flex items-center justify-center transition-all ${
                      selectedDate === date.dateStr
                        ? 'bg-apex-red text-white'
                        : date.isWeekend
                        ? 'border border-telemetry-cyan/30 text-telemetry-cyan hover:border-telemetry-cyan'
                        : 'border border-white/10 text-grid-white hover:border-white/30'
                    }`}
                  >
                    <span className="racing-headline text-sm">{date.dayNum}</span>
                  </button>
                ))}
              </div>
              {dates.length === 0 && (
                <p className="telemetry-text text-sm text-pit-gray text-center py-8">
                  No available dates in this month. Please select a future month.
                </p>
              )}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <p className="telemetry-text text-sm text-pit-gray mb-3">
                  Available Times for {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {getAvailableSlots(selectedDate).map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 text-center transition-all relative ${
                        !slot.available
                          ? 'bg-asphalt-dark text-pit-gray cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-telemetry-cyan text-asphalt-dark'
                          : 'border border-white/20 text-grid-white hover:border-telemetry-cyan'
                      }`}
                    >
                      <span className="telemetry-text text-sm">{slot.time}</span>
                      {slot.available && slot.spotsLeft <= 2 && (
                        <span className="block telemetry-text text-xs text-apex-red mt-1">
                          {slot.spotsLeft} left!
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}>
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="racing-headline text-xl text-grid-white mb-4">
              Confirm Your Booking
            </h3>

            {/* Summary */}
            <div className="bg-asphalt-dark p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="telemetry-text text-pit-gray">Session</span>
                  <span className="racing-headline text-grid-white">
                    {selectedSessionData?.name} ({selectedSessionData?.duration})
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="telemetry-text text-pit-gray">Date</span>
                  <span className="telemetry-text text-grid-white">
                    {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="telemetry-text text-pit-gray">Time</span>
                  <span className="telemetry-text text-grid-white">{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="telemetry-text text-pit-gray">Drivers</span>
                  <span className="telemetry-text text-grid-white">
                    {driverCount} {driverCount === 3 && '(Team Rate)'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="racing-headline text-lg text-grid-white">Total</span>
                  <span className="racing-headline text-2xl text-telemetry-cyan">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>
            </div>

            {/* Driver Requirements Reminder */}
            <div className="p-4 bg-telemetry-cyan/10 border border-telemetry-cyan/30">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-telemetry-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="telemetry-text text-sm text-grid-white mb-1">
                    Confirm All Drivers Meet Requirements
                  </p>
                  <p className="telemetry-text text-xs text-pit-gray">
                    All drivers must be at least 12 years old and 42 inches tall.
                  </p>
                </div>
              </div>
            </div>

            {/* Waiver notice */}
            <div className="flex items-start gap-3 p-4 bg-apex-red/10 border border-apex-red/30">
              <svg className="w-5 h-5 text-apex-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="telemetry-text text-sm text-grid-white mb-1">
                  Tech Inspection Required
                </p>
                <p className="telemetry-text text-xs text-pit-gray">
                  All drivers must complete the digital waiver before arrival.
                  You will receive a link after booking.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep(2)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Button>
              <Button size="lg">
                Complete Booking
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
