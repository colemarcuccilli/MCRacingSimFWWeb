import { NextResponse } from 'next/server'
import {
  sendConfirmationSMS,
  sendOwnerNotification,
  sendRacerInviteSMS,
  type BookingDetails,
} from '@/lib/twilio'

interface IncomingBookingData {
  bookingId: string
  customerPhone?: string
  primaryPhone?: string
  customerName?: string
  primaryName?: string
  date: string
  startTime: string
  endTime: string
  racerCount: number
  price: number
  duration?: number
  additionalRacers?: Array<{
    name: string
    phone: string
    email: string
  }>
}

export async function POST(request: Request) {
  try {
    const incoming: IncomingBookingData = await request.json()

    // Map incoming fields to expected format (handle both naming conventions)
    const booking: BookingDetails = {
      bookingId: incoming.bookingId,
      date: incoming.date,
      startTime: incoming.startTime,
      endTime: incoming.endTime,
      duration: incoming.duration || 1,
      racerCount: incoming.racerCount,
      price: incoming.price,
      primaryName: incoming.primaryName || incoming.customerName || 'Guest',
      primaryPhone: incoming.primaryPhone || incoming.customerPhone || '',
      primaryEmail: '',
      additionalRacers: incoming.additionalRacers,
    }

    console.log('Processing SMS for booking:', booking.bookingId)
    console.log('Primary phone:', booking.primaryPhone)
    console.log('Additional racers:', booking.additionalRacers?.length || 0)

    // Validate required fields
    if (!booking.primaryPhone || !booking.date || !booking.startTime) {
      console.error('Missing required fields:', {
        hasPhone: !!booking.primaryPhone,
        hasDate: !!booking.date,
        hasStartTime: !!booking.startTime,
      })
      return NextResponse.json(
        { error: 'Missing required booking details', received: incoming },
        { status: 400 }
      )
    }

    const results: {
      confirmationSid?: string | null
      confirmationError?: string
      ownerSid?: string | null
      ownerError?: string
      racerInvites?: (string | null)[]
      racerErrors?: string[]
    } = {}

    // Send confirmation to primary booker
    try {
      results.confirmationSid = await sendConfirmationSMS(booking)
      console.log('Confirmation SMS sent:', results.confirmationSid)
    } catch (err) {
      console.error('Failed to send confirmation SMS:', err)
      results.confirmationError = String(err)
    }

    // Send notification to owner
    try {
      results.ownerSid = await sendOwnerNotification(booking)
      console.log('Owner notification sent:', results.ownerSid)
    } catch (err) {
      console.error('Failed to send owner notification:', err)
      results.ownerError = String(err)
    }

    // Send invites to additional racers
    if (booking.additionalRacers && booking.additionalRacers.length > 0) {
      results.racerInvites = []
      results.racerErrors = []
      for (let i = 0; i < booking.additionalRacers.length; i++) {
        const racer = booking.additionalRacers[i]
        const slot = i + 2 // Slot 2 or 3
        try {
          const sid = await sendRacerInviteSMS(
            racer.name,
            racer.phone,
            booking.primaryName,
            booking.bookingId,
            slot,
            booking.date,
            booking.startTime
          )
          results.racerInvites.push(sid)
          console.log(`Racer ${slot} invite sent:`, sid)
        } catch (err) {
          console.error(`Failed to send racer ${slot} invite:`, err)
          results.racerInvites.push(null)
          results.racerErrors.push(String(err))
        }
      }
    }

    return NextResponse.json({
      success: true,
      ...results,
    })
  } catch (error) {
    console.error('SMS send error:', error)
    return NextResponse.json(
      { error: 'Failed to send SMS', details: String(error) },
      { status: 500 }
    )
  }
}
