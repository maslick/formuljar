const assert = require('assert');
const {google} = require('googleapis');
const fs = require('fs');
const {addEntry} = require('./sheets');

describe("Google spreadsheets", () => {
  const spreadsheetId = "1uhxQsJ_wzxVbBTwteXH7kaS5IE9LGjw9-KNVZCImdX4";
  const sheetName = "Sheet1";
  const data = ["Nazar", "Ukraine", 37];

  it("should add entry", async () => {
    const vals = await addEntry({spreadsheetId, sheetName, data});
    console.log(vals);
  });
});