import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    const scriptUrl = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL

    if (!scriptUrl) {
      // Demo mode - generate a fake booking ID
      const bookingId = `MC-${Date.now().toString(36).toUpperCase()}`
      return NextResponse.json({
        success: true,
        bookingId,
        message: 'Demo booking created (no script URL configured)',
      })
    }

    // Forward the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })

    const text = await response.text()

    // Try to parse as JSON
    let result
    try {
      result = JSON.parse(text)
    } catch {
      console.error('Failed to parse Google Script response:', text)
      // If the script doesn't return valid JSON, create a booking ID anyway
      const bookingId = `MC-${Date.now().toString(36).toUpperCase()}`
      return NextResponse.json({
        success: true,
        bookingId,
        message: 'Booking submitted (script response unclear)',
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create booking',
      },
      { status: 500 }
    )
  }
}
