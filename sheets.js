const {google} = require('googleapis');
const {GOOGLE_CREDENTIALS} = require('./config');

const client = google.auth.fromJSON(JSON.parse(GOOGLE_CREDENTIALS));
client.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const sheets = google.sheets({version: 'v4', auth: client});

async function addEntry({spreadsheetId, sheetName, data}) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data],
    }
  })
}

module.exports = {addEntry}
