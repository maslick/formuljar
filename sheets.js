const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');
const {GOOGLE_CREDENTIALS} = require('./config');

function getAuthConfig() {
  const client = google.auth.fromJSON(getAuthJson());
  client.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
  return client;
}

async function getSpreadSheet({spreadsheetId}) {
  const sheets = google.sheets({version: 'v4', auth: getAuthConfig()});
  return await sheets.spreadsheets.get({
    spreadsheetId
  });
}

async function getSpreadSheetValues({spreadsheetId, sheetName}) {
  const sheets = google.sheets({version: 'v4', auth: getAuthConfig()});
  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetName
  });
}

async function addEntry({spreadsheetId, sheetName, data}) {
  const sheets = google.sheets({version: 'v4', auth: getAuthConfig()});
  sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data],
    }
  })
}

function getAuthJson() {
  return JSON.parse(GOOGLE_CREDENTIALS);
}

module.exports = {
  getSpreadSheet,
  getSpreadSheetValues,
  addEntry
}
