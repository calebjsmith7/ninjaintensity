/**
 * Ninja Intensity contact form → "Contact Submissions" tab.
 *
 * Lives in a PRIVATE Google Sheet (not the public CMS sheet), because submissions
 * contain visitors' names, emails and phone numbers.
 *
 * One-time setup
 *  1. Create a new Google Sheet (sheets.new) and keep it private (only you).
 *  2. Extensions → Apps Script. Replace everything in Code.gs with this file. Save.
 *  3. Pick `setup` in the function dropdown → Run → approve the permissions prompt.
 *     This creates the "Contact Submissions" tab.
 *  4. Deploy → New deployment → gear icon → Web app.
 *       Execute as: Me
 *       Who has access: Anyone
 *     Deploy, then copy the Web app URL (ends in /exec).
 *  5. Put that URL in `contactEndpoint` in app/data.ts, then build and deploy the site.
 *
 * Editing this script later? Deploy → Manage deployments → edit (pencil) → Version: New version.
 * That keeps the same URL. A *new* deployment gets a new URL.
 *
 * Want an email for each submission? In the sheet: Tools → Notification settings →
 * "Any changes are made" → Notify me right away.
 */

const SHEET_NAME = "Contact Submissions";
const HEADERS = ["Submitted", "Name", "Email", "Phone", "Interested In", "Preferred Date", "Message"];
const MAX_LENGTH = 5000;

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "Bad request" });
  }

  // Spam trap: the site has a hidden "website" field that real visitors never fill in.
  if (data.website) return json({ ok: true });

  const row = {
    name: clean(data.name),
    email: clean(data.email),
    phone: clean(data.phone),
    interest: clean(data.interest),
    date: clean(data.date),
    message: clean(data.message),
  };
  if (!row.name || (!row.email && !row.phone)) {
    return json({ ok: false, error: "Name and an email or phone are required" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow([
      new Date(),
      row.name,
      row.email,
      row.phone,
      row.interest,
      row.date,
      row.message,
    ]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

/** Opening the Web app URL in a browser shows this, which is a quick way to check the deployment. */
function doGet() {
  return ContentService.createTextOutput("Ninja Intensity contact form endpoint is running.");
}

/** Run once from the editor to create the tab and approve permissions. */
function setup() {
  getSheet();
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd h:mm am/pm");
    sheet.getRange("B:G").setWrap(true).setVerticalAlignment("top");
    sheet.setColumnWidths(1, 1, 160);
    sheet.setColumnWidths(2, 3, 180);
    sheet.setColumnWidths(5, 2, 140);
    sheet.setColumnWidth(7, 420);
    // Remove the default empty tab so the submissions tab is the only one.
    const blank = ss.getSheetByName("Sheet1");
    if (blank && blank.getLastRow() === 0) ss.deleteSheet(blank);
  }
  return sheet;
}

/** Trim, cap length, and stop text like "=..." or "+1 720..." being read as a formula. */
function clean(value) {
  const text = String(value == null ? "" : value).trim().slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
