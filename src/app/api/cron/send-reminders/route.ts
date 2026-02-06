import { NextResponse } from 'next/server'
import { sendReminderSMS } from '@/lib/twilio'

// This endpoint is called by Vercel Cron
// It fetches tomorrow's bookings from Google Sheets and sends reminders

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get tomorrow's date in YYYY-MM-DD format
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    // Fetch bookings from Google Apps Script
    const scriptUrl = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL
    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Booking script URL not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(`${scriptUrl}?action=getBookings&date=${tomorrowStr}`)
    const data = await response.json()

    if (!data.success || !data.bookings) {
      return NextResponse.json({
        success: true,
        message: 'No bookings to remind',
        date: tomorrowStr,
      })
    }

    const results: { phone: string; success: boolean; sid?: string | null }[] = []

    for (const booking of data.bookings) {
      // Only send reminders for confirmed bookings
      if (booking.status !== 'confirmed') continue

      try {
        const sid = await sendReminderSMS(
          booking.primaryPhone,
          booking.sessionDate,
          booking.startTime,
          booking.racerCount,
          booking.duration
        )
        results.push({ phone: booking.primaryPhone, success: true, sid })
      } catch (error) {
        console.error(`Failed to send reminder to ${booking.primaryPhone}:`, error)
        results.push({ phone: booking.primaryPhone, success: false })
      }
    }

    return NextResponse.json({
      success: true,
      date: tomorrowStr,
      remindersProcessed: results.length,
      results,
    })
  } catch (error) {
    console.error('Cron reminder error:', error)
    return NextResponse.json(
      { error: 'Failed to process reminders', details: String(error) },
      { status: 500 }
    )
  }
}
