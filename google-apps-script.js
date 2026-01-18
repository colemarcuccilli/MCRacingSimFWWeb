/**
 * MC Racing Sim Fort Wayne - Waiver Form Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet with these columns:
 *    A: Timestamp | B: First Name | C: Last Name | D: Birthday | E: Phone | F: Email | G: How did you hear about us? | H: Signed Waiver?
 *
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire script
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 * 6. Set "Execute as" to your account
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the Web App URL
 * 9. Add the URL to your website's environment variable: NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Format the timestamp
    const timestamp = new Date(data.timestamp).toLocaleString('en-US', {
      timeZone: 'America/Indiana/Indianapolis',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Append the row to the sheet
    // Columns: Timestamp | First Name | Last Name | Birthday | Phone | Email | How did you hear about us? | Signed Waiver?
    sheet.appendRow([
      timestamp,
      data.firstName,
      data.lastName,
      data.birthday,
      data.phone,
      data.email,
      data.howDidYouHear,
      data.signedWaiver
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      message: 'MC Racing Sim Waiver Form API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify sheet access
function testSheetAccess() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Sheet has ' + sheet.getLastRow() + ' rows');
}
