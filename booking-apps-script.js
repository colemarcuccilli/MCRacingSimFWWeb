// ============================================
// MC RACING SIM - BOOKING SYSTEM APPS SCRIPT
// ============================================
// Deploy this as a Web App in Google Apps Script
// Spreadsheet should have tabs: Bookings, BlockedTimes

// Configuration
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your spreadsheet ID
var CALENDAR_ID = 'YOUR_CALENDAR_ID_HERE'; // Replace with your Google Calendar ID
var TIMEZONE = 'America/Indiana/Indianapolis';

// Operating hours
var OPEN_TIME = 12; // noon (12:00)
var CLOSE_TIME = 26; // 2am next day (represented as 26:00)
var CLOSED_DAY = 1; // Monday (0=Sunday, 1=Monday, etc.)

// Sim capacity
var TOTAL_SIMS = 3;

// ============================================
// MAIN ENTRY POINTS
// ============================================

function doGet(e) {
  var action = e.parameter.action;

  try {
    switch(action) {
      case 'getAvailability':
        return handleGetAvailability(e);
      case 'getBookings':
        return handleGetBookings(e);
      default:
        return createJsonResponse({ status: 'active', message: 'MC Racing Booking API' });
    }
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action || 'booking';

    switch(action) {
      case 'booking':
        return handleBooking(data);
      case 'cancel':
        return handleCancel(data);
      case 'blockTime':
        return handleBlockTime(data);
      default:
        return createJsonResponse({ success: false, error: 'Unknown action' });
    }
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

// ============================================
// AVAILABILITY CHECKING
// ============================================

function handleGetAvailability(e) {
  var date = e.parameter.date;
  var duration = parseInt(e.parameter.duration) || 1;
  var racerCount = parseInt(e.parameter.racerCount) || 1;
  var month = e.parameter.month; // YYYY-MM format for month view

  if (month) {
    // Return availability for entire month
    var availability = getMonthAvailability(month, duration, racerCount);
    return createJsonResponse({ success: true, month: month, availability: availability });
  } else if (date) {
    // Return available time slots for specific date
    var slots = getDateAvailability(date, duration, racerCount);
    return createJsonResponse({ success: true, date: date, slots: slots });
  } else {
    return createJsonResponse({ success: false, error: 'Date or month required' });
  }
}

function getMonthAvailability(month, duration, racerCount) {
  var year = parseInt(month.split('-')[0]);
  var monthNum = parseInt(month.split('-')[1]) - 1;
  var daysInMonth = new Date(year, monthNum + 1, 0).getDate();

  var availability = [];

  for (var day = 1; day <= daysInMonth; day++) {
    var dateStr = month + '-' + String(day).padStart(2, '0');
    var dateObj = new Date(year, monthNum, day);
    var dayOfWeek = dateObj.getDay();

    // Check if closed (Monday)
    if (dayOfWeek === CLOSED_DAY) {
      availability.push({ date: dateStr, available: false, reason: 'closed' });
      continue;
    }

    // Check if any slots available
    var slots = getDateAvailability(dateStr, duration, racerCount);
    var hasAvailability = slots.some(function(slot) { return slot.available; });

    availability.push({
      date: dateStr,
      available: hasAvailability,
      isWeekend: dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6,
      slotsAvailable: slots.filter(function(s) { return s.available; }).length
    });
  }

  return availability;
}

function getDateAvailability(date, duration, racerCount) {
  var dateObj = new Date(date + 'T12:00:00');
  var dayOfWeek = dateObj.getDay();

  // Check if closed
  if (dayOfWeek === CLOSED_DAY) {
    return [];
  }

  // Check blocked times
  var blockedSlots = getBlockedSlots(date);

  // Get existing bookings for this date
  var bookedSlots = getBookedSlots(date);

  // Generate all possible start times (30-min increments)
  var slots = [];

  for (var hour = OPEN_TIME; hour < CLOSE_TIME; hour += 0.5) {
    var displayHour = hour >= 24 ? hour - 24 : hour;
    var timeStr = formatTimeFromHour(displayHour);

    // Check if this start time + duration fits in operating hours
    var endHour = hour + duration;
    if (endHour > CLOSE_TIME) {
      continue; // Session would extend past closing
    }

    // Check availability for all 30-min blocks in this session
    var isAvailable = true;
    var simsAvailable = TOTAL_SIMS;

    for (var checkHour = hour; checkHour < endHour; checkHour += 0.5) {
      var checkTimeStr = formatTimeFromHour(checkHour >= 24 ? checkHour - 24 : checkHour);

      // Check if blocked
      if (blockedSlots.indexOf(checkTimeStr) >= 0) {
        isAvailable = false;
        simsAvailable = 0;
        break;
      }

      // Count booked sims at this time
      var bookedCount = bookedSlots[checkTimeStr] || 0;
      var available = TOTAL_SIMS - bookedCount;

      if (available < simsAvailable) {
        simsAvailable = available;
      }
    }

    // Check if enough sims available for requested racer count
    if (simsAvailable < racerCount) {
      isAvailable = false;
    }

    slots.push({
      time: timeStr,
      available: isAvailable,
      simsAvailable: simsAvailable
    });
  }

  return slots;
}

function getBookedSlots(date) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Bookings');
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var dateCol = headers.indexOf('Session Date');
  var startCol = headers.indexOf('Start Time');
  var durationCol = headers.indexOf('Duration');
  var racersCol = headers.indexOf('Racers');
  var statusCol = headers.indexOf('Status');

  var bookedSlots = {};

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowDate = formatDateForComparison(row[dateCol]);
    var status = row[statusCol];

    // Only count confirmed bookings
    if (rowDate !== date || status !== 'confirmed') {
      continue;
    }

    var startTime = row[startCol];
    var duration = parseInt(row[durationCol]) || 1;
    var racers = parseInt(row[racersCol]) || 1;

    // Mark all 30-min slots for this booking
    var startHour = parseTimeToHour(startTime);
    for (var h = startHour; h < startHour + duration; h += 0.5) {
      var slotTime = formatTimeFromHour(h >= 24 ? h - 24 : h);
      bookedSlots[slotTime] = (bookedSlots[slotTime] || 0) + racers;
    }
  }

  return bookedSlots;
}

function getBlockedSlots(date) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('BlockedTimes');
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var dateCol = headers.indexOf('Date');
  var startCol = headers.indexOf('Start Time');
  var endCol = headers.indexOf('End Time');

  var blockedSlots = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowDate = formatDateForComparison(row[dateCol]);

    if (rowDate !== date) continue;

    var startTime = row[startCol];
    var endTime = row[endCol];

    // If no start/end time, entire day is blocked
    if (!startTime || !endTime) {
      // Block all slots
      for (var h = OPEN_TIME; h < CLOSE_TIME; h += 0.5) {
        blockedSlots.push(formatTimeFromHour(h >= 24 ? h - 24 : h));
      }
    } else {
      // Block specific time range
      var startHour = parseTimeToHour(startTime);
      var endHour = parseTimeToHour(endTime);
      for (var h = startHour; h < endHour; h += 0.5) {
        blockedSlots.push(formatTimeFromHour(h >= 24 ? h - 24 : h));
      }
    }
  }

  return blockedSlots;
}

// ============================================
// BOOKING CREATION
// ============================================

function handleBooking(data) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Bookings');

  // Generate booking ID
  var bookingId = 'MC-' + generateId(6);

  // Calculate end time
  var startHour = parseTimeToHour(data.startTime);
  var endHour = startHour + parseInt(data.duration);
  var endTime = formatTimeFromHour(endHour >= 24 ? endHour - 24 : endHour);

  // Determine day type
  var dateObj = new Date(data.sessionDate + 'T12:00:00');
  var dayOfWeek = dateObj.getDay();
  var dayType = (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) ? 'Weekend' : 'Weekday';

  // Format timestamp
  var now = new Date();
  var timestamp = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');

  // Build row data
  var rowData = [
    bookingId,                          // BookingID
    timestamp,                          // Booking Created
    data.sessionDate,                   // Session Date
    data.startTime,                     // Start Time
    endTime,                            // End Time
    data.duration,                      // Duration
    data.numberOfRacers,                // Racers
    dayType,                            // Day Type
    data.price,                         // Price Due
    'confirmed',                        // Status
    data.firstName + ' ' + data.lastName, // Primary Name
    data.email,                         // Primary Email
    data.birthday,                      // Primary Birthday
    data.phone,                         // Primary Phone
    data.email,                         // Primary Email (duplicate in sheet)
    data.howDidYouHear,                 // Primary How Heard
    data.signedWaiver ? 'Yes' : 'No',   // Primary Waiver
  ];

  // Add Racer 2 info if exists
  if (data.racer2) {
    rowData.push(
      data.racer2.firstName + ' ' + (data.racer2.lastName || ''), // Racer 2 Name
      data.racer2.phone || '',          // Racer 2 Phone
      data.racer2.email || '',          // Racer 2 Email
      '',                               // Racer 2 Email (duplicate)
      'No'                              // Racer 2 Waiver (pending check-in)
    );
  } else {
    rowData.push('', '', '', '', '');
  }

  // Add Racer 3 info if exists
  if (data.racer3) {
    rowData.push(
      data.racer3.firstName + ' ' + (data.racer3.lastName || ''), // Racer 3 Name
      data.racer3.phone || '',          // Racer 3 Phone
      data.racer3.email || '',          // Racer 3 Email
      'No'                              // Racer 3 Waiver (pending check-in)
    );
  } else {
    rowData.push('', '', '', '');
  }

  // Append to sheet
  sheet.appendRow(rowData);

  // Create Google Calendar event
  var calendarEventId = null;
  try {
    calendarEventId = createCalendarEvent(data, bookingId, endTime, dayType);
  } catch (error) {
    Logger.log('Calendar error: ' + error);
  }

  return createJsonResponse({
    success: true,
    bookingId: bookingId,
    calendarEventId: calendarEventId,
    endTime: endTime,
    dayType: dayType
  });
}

// ============================================
// GOOGLE CALENDAR INTEGRATION
// ============================================

function createCalendarEvent(data, bookingId, endTime, dayType) {
  var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!calendar) {
    Logger.log('Calendar not found: ' + CALENDAR_ID);
    return null;
  }

  var startDateTime = new Date(data.sessionDate + 'T' + convertTo24Hour(data.startTime));
  var endDateTime = new Date(data.sessionDate + 'T' + convertTo24Hour(endTime));

  // Handle times after midnight
  if (endDateTime < startDateTime) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  var primaryName = data.firstName + ' ' + data.lastName;
  var racerNames = [primaryName];
  if (data.racer2) racerNames.push(data.racer2.firstName + ' ' + (data.racer2.lastName || ''));
  if (data.racer3) racerNames.push(data.racer3.firstName + ' ' + (data.racer3.lastName || ''));

  var title = 'BOOKING: ' + data.numberOfRacers + ' racer' + (data.numberOfRacers > 1 ? 's' : '') + ' - ' + primaryName;

  var description = 'Booking ID: ' + bookingId + '\n\n' +
    'Contact: ' + primaryName + '\n' +
    'Phone: ' + data.phone + '\n' +
    'Email: ' + data.email + '\n\n' +
    'Racers: ' + racerNames.join(', ') + '\n' +
    'Duration: ' + data.duration + ' hour(s)\n' +
    'Price: $' + data.price + '\n' +
    'Day Type: ' + dayType;

  var event = calendar.createEvent(title, startDateTime, endDateTime, {
    description: description
  });

  // Set color based on racer count
  // 1 = Cyan (7), 2 = Orange (6), 3 = Red (11)
  var colorMap = { 1: '7', 2: '6', 3: '11' };
  event.setColor(colorMap[data.numberOfRacers] || '7');

  return event.getId();
}

// ============================================
// CANCELLATION
// ============================================

function handleCancel(data) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Bookings');
  var dataRange = sheet.getDataRange().getValues();
  var headers = dataRange[0];

  var idCol = headers.indexOf('BookingID');
  var statusCol = headers.indexOf('Status');

  for (var i = 1; i < dataRange.length; i++) {
    if (dataRange[i][idCol] === data.bookingId) {
      sheet.getRange(i + 1, statusCol + 1).setValue('cancelled');
      return createJsonResponse({ success: true, bookingId: data.bookingId });
    }
  }

  return createJsonResponse({ success: false, error: 'Booking not found' });
}

// ============================================
// GET BOOKINGS
// ============================================

function handleGetBookings(e) {
  var date = e.parameter.date;
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Bookings');
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var bookings = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowDate = formatDateForComparison(row[headers.indexOf('Session Date')]);

    if (date && rowDate !== date) continue;

    bookings.push({
      bookingId: row[headers.indexOf('BookingID')],
      sessionDate: rowDate,
      startTime: row[headers.indexOf('Start Time')],
      endTime: row[headers.indexOf('End Time')],
      duration: row[headers.indexOf('Duration')],
      racerCount: row[headers.indexOf('Racers')],
      dayType: row[headers.indexOf('Day Type')],
      price: row[headers.indexOf('Price Due')],
      status: row[headers.indexOf('Status')],
      primaryName: row[headers.indexOf('Primary Name')],
      primaryPhone: row[headers.indexOf('Primary Phone')],
      primaryEmail: row[headers.indexOf('Primary Email')]
    });
  }

  return createJsonResponse({ success: true, bookings: bookings });
}

// ============================================
// BLOCK TIME
// ============================================

function handleBlockTime(data) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('BlockedTimes');
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet('BlockedTimes');
    sheet.appendRow(['Date', 'Start Time', 'End Time', 'Reason', 'Type']);
  }

  sheet.appendRow([
    data.date,
    data.startTime || '',
    data.endTime || '',
    data.reason || '',
    data.type || 'manual'
  ]);

  return createJsonResponse({ success: true });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function generateId(length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function formatDateForComparison(date) {
  if (!date) return '';
  if (typeof date === 'string') return date;
  return Utilities.formatDate(date, TIMEZONE, 'yyyy-MM-dd');
}

function parseTimeToHour(timeStr) {
  if (!timeStr) return 12;

  // Handle various formats: "3:00 PM", "15:00", "3pm"
  var str = String(timeStr).toUpperCase().trim();
  var isPM = str.indexOf('PM') >= 0;
  var isAM = str.indexOf('AM') >= 0;

  str = str.replace(/[APM]/g, '').trim();
  var parts = str.split(':');
  var hours = parseInt(parts[0]) || 0;
  var minutes = parseInt(parts[1]) || 0;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  // Handle times after midnight (1am, 2am) for our context
  if (hours < OPEN_TIME && hours < 3) {
    hours += 24;
  }

  return hours + (minutes / 60);
}

function formatTimeFromHour(hour) {
  var h = Math.floor(hour);
  var m = Math.round((hour - h) * 60);
  var period = h >= 12 ? 'PM' : 'AM';
  var displayH = h % 12 || 12;
  return displayH + ':' + String(m).padStart(2, '0') + ' ' + period;
}

function convertTo24Hour(timeStr) {
  var str = String(timeStr).toUpperCase().trim();
  var isPM = str.indexOf('PM') >= 0;
  var isAM = str.indexOf('AM') >= 0;

  str = str.replace(/[APM]/g, '').trim();
  var parts = str.split(':');
  var hours = parseInt(parts[0]) || 0;
  var minutes = parseInt(parts[1]) || 0;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':00';
}

// ============================================
// TEST FUNCTIONS
// ============================================

function testGetAvailability() {
  var e = {
    parameter: {
      action: 'getAvailability',
      date: '2025-02-15',
      duration: '2',
      racerCount: '1'
    }
  };
  var result = handleGetAvailability(e);
  Logger.log(result.getContent());
}

function testBooking() {
  var data = {
    sessionDate: '2025-02-15',
    startTime: '3:00 PM',
    duration: 2,
    numberOfRacers: 2,
    firstName: 'John',
    lastName: 'Smith',
    birthday: '1985-03-22',
    phone: '260-555-1234',
    email: 'john@example.com',
    howDidYouHear: 'Instagram',
    signedWaiver: true,
    price: 180,
    racer2: {
      firstName: 'Mike',
      lastName: 'Smith',
      phone: '260-555-5678',
      email: 'mike@example.com'
    }
  };

  var result = handleBooking(data);
  Logger.log(result.getContent());
}
