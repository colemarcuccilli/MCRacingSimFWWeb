'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RacerCountSelector from './RacerCountSelector'
import DurationSelector from './DurationSelector'
import BookingCalendar from './BookingCalendar'
import TimeSlotPicker from './TimeSlotPicker'
import CustomerInfoForm from './CustomerInfoForm'
import AdditionalRacerForm from './AdditionalRacerForm'
import WaiverSection from './WaiverSection'
import PriceSummary from './PriceSummary'
import { calculatePrice, formatDateLong } from '@/lib/pricing'

interface CustomerInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  birthday: string
  howHeard: string
}

interface AdditionalRacer {
  name: string
  phone: string
  email: string
}

type Step = 'config' | 'datetime' | 'info' | 'confirm'

export default function BookingFlow() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('config')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Booking state
  const [racerCount, setRacerCount] = useState<1 | 2 | 3>(1)
  const [duration, setDuration] = useState<1 | 2 | 3>(1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: '',
    howHeard: '',
  })
  const [additionalRacers, setAdditionalRacers] = useState<AdditionalRacer[]>([
    { name: '', phone: '', email: '' },
    { name: '', phone: '', email: '' },
  ])
  const [waiverAccepted, setWaiverAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(true)

  // Validation errors
  const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})
  const [racerErrors, setRacerErrors] = useState<{ [key: number]: Partial<Record<keyof AdditionalRacer, string>> }>({})
  const [waiverError, setWaiverError] = useState<string | undefined>()

  const validateCustomerInfo = (): boolean => {
    const errors: Partial<Record<keyof CustomerInfo, string>> = {}

    if (!customerInfo.firstName.trim()) errors.firstName = 'Required'
    if (!customerInfo.lastName.trim()) errors.lastName = 'Required'
    if (!customerInfo.phone.trim()) errors.phone = 'Required'
    if (!customerInfo.email.trim()) {
      errors.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Invalid email'
    }
    if (!customerInfo.birthday) errors.birthday = 'Required'
    if (!customerInfo.howHeard) errors.howHeard = 'Required'

    setCustomerErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateAdditionalRacers = (): boolean => {
    if (racerCount === 1) return true

    const errors: { [key: number]: Partial<Record<keyof AdditionalRacer, string>> } = {}
    const racersToValidate = racerCount - 1

    for (let i = 0; i < racersToValidate; i++) {
      const racer = additionalRacers[i]
      const racerError: Partial<Record<keyof AdditionalRacer, string>> = {}

      if (!racer.name.trim()) racerError.name = 'Required'
      if (!racer.phone.trim()) racerError.phone = 'Required'
      if (!racer.email.trim()) {
        racerError.email = 'Required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(racer.email)) {
        racerError.email = 'Invalid email'
      }

      if (Object.keys(racerError).length > 0) {
        errors[i] = racerError
      }
    }

    setRacerErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateWaiver = (): boolean => {
    if (!waiverAccepted) {
      setWaiverError('You must accept the waiver to continue')
      return false
    }
    setWaiverError(undefined)
    return true
  }

  const handleNext = () => {
    if (step === 'config') {
      setStep('datetime')
    } else if (step === 'datetime') {
      if (!selectedDate || !selectedTime) {
        setError('Please select both a date and time')
        return
      }
      setError(null)
      setStep('info')
    } else if (step === 'info') {
      const customerValid = validateCustomerInfo()
      const racersValid = validateAdditionalRacers()
      const waiverValid = validateWaiver()

      if (customerValid && racersValid && waiverValid) {
        setStep('confirm')
      }
    }
  }

  const handleBack = () => {
    if (step === 'datetime') setStep('config')
    else if (step === 'info') setStep('datetime')
    else if (step === 'confirm') setStep('info')
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL

      // Calculate end time
      const [time, period] = selectedTime!.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      let hour24 = hours
      if (period === 'PM' && hours !== 12) hour24 += 12
      if (period === 'AM' && hours === 12) hour24 = 0
      let endHour = hour24 + duration
      const endPeriod = endHour >= 12 && endHour < 24 ? 'PM' : 'AM'
      if (endHour >= 24) endHour -= 24
      const displayEndHour = endHour % 12 || 12
      const endTime = `${displayEndHour}:${String(minutes).padStart(2, '0')} ${endPeriod}`

      const { price, isWeekend } = calculatePrice(selectedDate!, duration, racerCount)

      const bookingData = {
        action: 'createBooking',
        sessionDate: selectedDate,
        startTime: selectedTime,
        endTime,
        duration,
        racerCount,
        dayType: isWeekend ? 'Weekend' : 'Weekday',
        price,
        primaryName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        primaryEmail: customerInfo.email,
        primaryPhone: customerInfo.phone,
        primaryBirthday: customerInfo.birthday,
        primaryHowHeard: customerInfo.howHeard,
        primaryWaiver: true,
        marketingOptIn,
        racer2: racerCount >= 2 ? additionalRacers[0] : null,
        racer3: racerCount >= 3 ? additionalRacers[1] : null,
      }

      if (scriptUrl) {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        })
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Booking failed')
        }

        // Send SMS notifications via our API routes
        try {
          await fetch('/api/sms/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: result.bookingId,
              customerPhone: customerInfo.phone,
              customerName: customerInfo.firstName,
              date: selectedDate,
              startTime: selectedTime,
              endTime,
              racerCount,
              price,
              additionalRacers: racerCount > 1 ? additionalRacers.slice(0, racerCount - 1) : [],
            }),
          })
        } catch (smsError) {
          console.error('SMS error:', smsError)
          // Don't fail the booking if SMS fails
        }

        // Redirect to confirmation page
        const params = new URLSearchParams({
          bookingId: result.bookingId,
          date: selectedDate!,
          time: selectedTime!,
          duration: duration.toString(),
          racers: racerCount.toString(),
          price: price.toString(),
          name: customerInfo.firstName,
        })
        router.push(`/book/confirmation?${params.toString()}`)
      } else {
        // Demo mode - no script URL
        const demoBookingId = `MC-${Date.now().toString(36).toUpperCase()}`
        const params = new URLSearchParams({
          bookingId: demoBookingId,
          date: selectedDate!,
          time: selectedTime!,
          duration: duration.toString(),
          racers: racerCount.toString(),
          price: price.toString(),
          name: customerInfo.firstName,
        })
        router.push(`/book/confirmation?${params.toString()}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const { price } = selectedDate ? calculatePrice(selectedDate, duration, racerCount) : { price: 0 }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {['config', 'datetime', 'info', 'confirm'].map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 flex items-center justify-center racing-headline ${
                step === s
                  ? 'bg-apex-red text-white'
                  : ['config', 'datetime', 'info', 'confirm'].indexOf(step) > i
                  ? 'bg-telemetry-cyan text-asphalt-dark'
                  : 'bg-white/10 text-pit-gray'
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && (
              <div
                className={`flex-1 h-0.5 ${
                  ['config', 'datetime', 'info', 'confirm'].indexOf(step) > i
                    ? 'bg-telemetry-cyan'
                    : 'bg-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mb-8 px-2">
        <span className="telemetry-text text-xs text-pit-gray">Setup</span>
        <span className="telemetry-text text-xs text-pit-gray">Date & Time</span>
        <span className="telemetry-text text-xs text-pit-gray">Details</span>
        <span className="telemetry-text text-xs text-pit-gray">Confirm</span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-apex-red/10 border border-apex-red text-apex-red telemetry-text">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Configuration */}
          {step === 'config' && (
            <>
              <RacerCountSelector value={racerCount} onChange={setRacerCount} />
              <DurationSelector value={duration} onChange={setDuration} />
            </>
          )}

          {/* Step 2: Date & Time */}
          {step === 'datetime' && (
            <>
              <BookingCalendar
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date)
                  setSelectedTime(null) // Reset time when date changes
                }}
                duration={duration}
                racerCount={racerCount}
              />
              <TimeSlotPicker
                date={selectedDate}
                duration={duration}
                racerCount={racerCount}
                value={selectedTime}
                onChange={setSelectedTime}
              />
            </>
          )}

          {/* Step 3: Info */}
          {step === 'info' && (
            <>
              <CustomerInfoForm
                value={customerInfo}
                onChange={setCustomerInfo}
                errors={customerErrors}
              />
              {racerCount > 1 && (
                <AdditionalRacerForm
                  racerCount={racerCount as 2 | 3}
                  racers={additionalRacers}
                  onChange={setAdditionalRacers}
                  errors={racerErrors}
                />
              )}
              <WaiverSection
                waiverAccepted={waiverAccepted}
                onWaiverChange={setWaiverAccepted}
                marketingOptIn={marketingOptIn}
                onMarketingChange={setMarketingOptIn}
                error={waiverError}
              />
            </>
          )}

          {/* Step 4: Confirm */}
          {step === 'confirm' && (
            <div className="space-y-6">
              <h3 className="racing-headline text-2xl text-grid-white">
                Review Your <span className="text-apex-red">Booking</span>
              </h3>

              <div className="bg-asphalt-dark border border-white/10 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="telemetry-text text-xs text-pit-gray">Date</p>
                    <p className="telemetry-text text-lg text-grid-white">
                      {selectedDate && formatDateLong(selectedDate)}
                    </p>
                  </div>
                  <div>
                    <p className="telemetry-text text-xs text-pit-gray">Time</p>
                    <p className="telemetry-text text-lg text-grid-white">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="telemetry-text text-xs text-pit-gray">Duration</p>
                    <p className="telemetry-text text-lg text-grid-white">
                      {duration} hour{duration > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="telemetry-text text-xs text-pit-gray">Racers</p>
                    <p className="telemetry-text text-lg text-grid-white">{racerCount}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="telemetry-text text-xs text-pit-gray">Primary Racer</p>
                  <p className="telemetry-text text-lg text-grid-white">
                    {customerInfo.firstName} {customerInfo.lastName}
                  </p>
                  <p className="telemetry-text text-sm text-pit-gray">
                    {customerInfo.email} • {customerInfo.phone}
                  </p>
                </div>

                {racerCount > 1 && (
                  <div className="border-t border-white/10 pt-4">
                    <p className="telemetry-text text-xs text-pit-gray mb-2">Additional Racers</p>
                    {additionalRacers.slice(0, racerCount - 1).map((racer, i) => (
                      <div key={i} className="mb-2">
                        <p className="telemetry-text text-grid-white">{racer.name}</p>
                        <p className="telemetry-text text-sm text-pit-gray">
                          {racer.email} • {racer.phone}
                        </p>
                      </div>
                    ))}
                    <p className="telemetry-text text-xs text-telemetry-cyan mt-2">
                      They will receive an SMS to complete their waiver
                    </p>
                  </div>
                )}

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="telemetry-text text-pit-gray">Total Due</p>
                    <p className="racing-headline text-4xl text-apex-red">${price}</p>
                  </div>
                  <p className="telemetry-text text-xs text-pit-gray mt-2">
                    Payment collected in person after your session
                  </p>
                </div>
              </div>

              <div className="bg-telemetry-cyan/10 border border-telemetry-cyan/30 p-4">
                <p className="telemetry-text text-sm text-telemetry-cyan">
                  <strong>Location:</strong> 1205 W Main St, Fort Wayne, IN
                </p>
                <p className="telemetry-text text-sm text-pit-gray mt-1">
                  Please arrive 10 minutes early for your session
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Price Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <PriceSummary
              date={selectedDate}
              duration={duration}
              racerCount={racerCount}
              startTime={selectedTime}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
        {step !== 'config' ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 border border-white/20 text-grid-white telemetry-text hover:border-white/40 transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step !== 'confirm' ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 bg-apex-red text-white racing-headline hover:bg-apex-red/90 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-3 bg-apex-red text-white racing-headline hover:bg-apex-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting ? (
              <>
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
