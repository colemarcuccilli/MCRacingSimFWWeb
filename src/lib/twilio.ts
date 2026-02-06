import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhone = process.env.TWILIO_PHONE_NUMBER
const ownerPhone = process.env.OWNER_PHONE_NUMBER

if (!accountSid || !authToken || !twilioPhone) {
  console.warn('Twilio credentials not configured')
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

// Format phone number to E.164 format (+1XXXXXXXXXX)
function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // If it's 10 digits, add +1
  if (digits.length === 10) {
    return `+1${digits}`
  }

  // If it's 11 digits starting with 1, add +
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }

  // If already has +, return as-is
  if (phone.startsWith('+')) {
    return phone
  }

  // Otherwise, assume US and add +1
  return `+1${digits}`
}

export interface BookingDetails {
  bookingId: string
  date: string
  startTime: string
  endTime: string
  duration: number
  racerCount: number
  price: number
  primaryName: string
  primaryPhone: string
  primaryEmail: string
  additionalRacers?: Array<{
    name: string
    phone: string
    email: string
  }>
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(time: string): string {
  // Handle both "2:00 PM" and "14:00" formats
  if (time.includes('AM') || time.includes('PM')) {
    // Already in 12-hour format
    return time
  }
  // Convert from 24-hour format
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export async function sendConfirmationSMS(booking: BookingDetails): Promise<string | null> {
  if (!client || !twilioPhone) {
    console.warn('Twilio not configured, skipping SMS')
    return null
  }

  const formattedPhone = formatPhoneNumber(booking.primaryPhone)
  console.log('Sending confirmation to:', formattedPhone)

  const message = await client.messages.create({
    body: `MC Racing Sim: Your booking is confirmed!
Date: ${formatDate(booking.date)}
Time: ${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}
Racers: ${booking.racerCount}
Total: $${booking.price}

Arrive 10 min early.
Location: 1205 W Main St, Fort Wayne
Questions? Call (808) 220-2600`,
    from: twilioPhone,
    to: formattedPhone,
  })

  return message.sid
}

export async function sendOwnerNotification(booking: BookingDetails): Promise<string | null> {
  if (!client || !twilioPhone || !ownerPhone) {
    console.warn('Twilio not configured, skipping owner notification')
    return null
  }

  const racerNames = [booking.primaryName]
  if (booking.additionalRacers) {
    racerNames.push(...booking.additionalRacers.map(r => r.name))
  }

  const formattedOwnerPhone = formatPhoneNumber(ownerPhone)
  console.log('Sending owner notification to:', formattedOwnerPhone)

  const message = await client.messages.create({
    body: `NEW BOOKING!
${booking.primaryName} (${booking.primaryPhone})
${formatDate(booking.date)} @ ${formatTime(booking.startTime)}
${booking.duration}hr / ${booking.racerCount} racers
$${booking.price}
Group: ${racerNames.join(', ')}`,
    from: twilioPhone,
    to: formattedOwnerPhone,
  })

  return message.sid
}

export async function sendRacerInviteSMS(
  racerName: string,
  racerPhone: string,
  primaryName: string,
  bookingId: string,
  slot: number,
  date: string,
  time: string
): Promise<string | null> {
  if (!client || !twilioPhone) {
    console.warn('Twilio not configured, skipping racer invite')
    return null
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://mcracingfortwayne.com'
  const checkinUrl = `${baseUrl}/checkin?bookingId=${bookingId}&slot=${slot}`
  const formattedRacerPhone = formatPhoneNumber(racerPhone)
  console.log('Sending racer invite to:', formattedRacerPhone)

  const message = await client.messages.create({
    body: `Hi ${racerName.split(' ')[0]}! ${primaryName} booked you for sim racing at MC Racing on ${formatDate(date)} at ${formatTime(time)}.

Please complete your check-in and waiver:
${checkinUrl}

Questions? Call (808) 220-2600`,
    from: twilioPhone,
    to: formattedRacerPhone,
  })

  return message.sid
}

export async function sendReminderSMS(
  phone: string,
  date: string,
  time: string,
  racerCount: number,
  duration: number
): Promise<string | null> {
  if (!client || !twilioPhone) {
    console.warn('Twilio not configured, skipping reminder')
    return null
  }

  const formattedPhone = formatPhoneNumber(phone)

  const message = await client.messages.create({
    body: `MC Racing Reminder: Your session is tomorrow!
${formatDate(date)} @ ${formatTime(time)}
${racerCount} racer(s), ${duration} hour(s)

Arrive 10 min early!
1205 W Main St, Fort Wayne`,
    from: twilioPhone,
    to: formattedPhone,
  })

  return message.sid
}

export async function sendCancellationSMS(
  phone: string,
  date: string,
  time: string
): Promise<string | null> {
  if (!client || !twilioPhone) {
    console.warn('Twilio not configured, skipping cancellation SMS')
    return null
  }

  const formattedPhone = formatPhoneNumber(phone)

  const message = await client.messages.create({
    body: `MC Racing Sim: Your booking on ${formatDate(date)} at ${formatTime(time)} has been cancelled.

If you have questions, please call (808) 220-2600.`,
    from: twilioPhone,
    to: formattedPhone,
  })

  return message.sid
}
