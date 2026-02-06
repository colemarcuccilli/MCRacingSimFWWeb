import { NextResponse } from 'next/server'
import { sendReminderSMS } from '@/lib/twilio'

interface ReminderRequest {
  phone: string
  date: string
  time: string
  racerCount: number
  duration: number
}

export async function POST(request: Request) {
  try {
    const data: ReminderRequest = await request.json()

    if (!data.phone || !data.date || !data.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const sid = await sendReminderSMS(
      data.phone,
      data.date,
      data.time,
      data.racerCount,
      data.duration
    )

    return NextResponse.json({
      success: true,
      sid,
    })
  } catch (error) {
    console.error('Reminder SMS error:', error)
    return NextResponse.json(
      { error: 'Failed to send reminder', details: String(error) },
      { status: 500 }
    )
  }
}
