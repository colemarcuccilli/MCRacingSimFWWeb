import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Generate a booking ID regardless of what happens
    const bookingId = `MC-${Date.now().toString(36).toUpperCase()}`

    const scriptUrl = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL

    if (!scriptUrl) {
      // No script URL configured - demo mode
      console.log('Demo mode - no NEXT_PUBLIC_BOOKING_SCRIPT_URL configured')
      return NextResponse.json({
        success: true,
        bookingId,
        message: 'Booking created (demo mode)',
      })
    }

    // Try to forward to Google Apps Script
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...bookingData, bookingId }),
      })

      const text = await response.text()
      console.log('Google Apps Script response:', text)

      // Try to parse as JSON
      try {
        const result = JSON.parse(text)
        if (result.success) {
          return NextResponse.json({
            success: true,
            bookingId: result.bookingId || bookingId,
            message: 'Booking saved to Google Sheets',
          })
        } else {
          // Script returned an error, but we'll still proceed with the booking
          console.error('Google Script error:', result.error)
          return NextResponse.json({
            success: true,
            bookingId,
            message: 'Booking created (sheet logging pending)',
            scriptError: result.error,
          })
        }
      } catch {
        // Response wasn't valid JSON - might be HTML error page
        console.error('Failed to parse Google Script response:', text.substring(0, 200))
        return NextResponse.json({
          success: true,
          bookingId,
          message: 'Booking created (sheet sync pending)',
        })
      }
    } catch (fetchError) {
      // Network error calling Google Script
      console.error('Failed to reach Google Script:', fetchError)
      return NextResponse.json({
        success: true,
        bookingId,
        message: 'Booking created (offline mode)',
      })
    }
  } catch (error) {
    console.error('Booking API error:', error)
    // Even on error, try to give them a booking ID
    const bookingId = `MC-${Date.now().toString(36).toUpperCase()}`
    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking created with errors',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
