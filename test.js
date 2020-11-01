const assert = require('assert');
const {google} = require('googleapis');
const fs = require('fs');

const {
  getSpreadSheet,
  getSpreadSheetValues,
  addEntry
} = require('./sheets');

describe("Google spreadsheets", () => {
  const spreadsheetId = "1uhxQsJ_wzxVbBTwteXH7kaS5IE9LGjw9-KNVZCImdX4";
  const sheetName = "Sheet1";

  it("should fetch spreadsheet name", async () => {
    const sheet = await getSpreadSheet({spreadsheetId});
    let speadsheetName = sheet.data.properties['title'];
    assert.strictEqual(speadsheetName, "formuljar");
  });

  it("should fetch values", async () => {
    const vals = await getSpreadSheetValues({spreadsheetId, sheetName});
    console.log(vals.data.values);
  });

  it("should add entry", async () => {
    data = ["Nazar", "Ukraine", 37];
    const vals = await addEntry({spreadsheetId, sheetName, data});
    console.log(vals);
  });
});