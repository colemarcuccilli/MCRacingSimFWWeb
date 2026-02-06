import { NextResponse } from 'next/server'
import {
  sendConfirmationSMS,
  sendOwnerNotification,
  sendRacerInviteSMS,
  type BookingDetails,
} from '@/lib/twilio'

export async function POST(request: Request) {
  try {
    const booking: BookingDetails = await request.json()

    // Validate required fields
    if (!booking.primaryPhone || !booking.date || !booking.startTime) {
      return NextResponse.json(
        { error: 'Missing required booking details' },
        { status: 400 }
      )
    }

    const results: {
      confirmationSid?: string | null
      ownerSid?: string | null
      racerInvites?: (string | null)[]
    } = {}

    // Send confirmation to primary booker
    results.confirmationSid = await sendConfirmationSMS(booking)

    // Send notification to owner
    results.ownerSid = await sendOwnerNotification(booking)

    // Send invites to additional racers
    if (booking.additionalRacers && booking.additionalRacers.length > 0) {
      results.racerInvites = []
      for (let i = 0; i < booking.additionalRacers.length; i++) {
        const racer = booking.additionalRacers[i]
        const slot = i + 2 // Slot 2 or 3
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
