const axios = require('axios');
const config = require("./config");
const {addEntry} = require('./sheets');


async function verifyCaptchaToken(token) {
  try {
    const params = new URLSearchParams();
    params.append('secret', config.CAPTCHA_SECRET);
    params.append('response', token);
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', params);
    return response.data.success;
  } catch (error) {
    console.log(error.response.body);
    return false;
  }
}

async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const options = {
    headers: {
      "content-type": "application/json"
    }
  };

  const mess = {
    chat_id: config.TELEGRAM_CHAT_ID,
    text: composeMessage(message),
    parse_mode: "markdown"
  };

  try {
    await axios.post(url, mess, options);
  } catch (error) {
    console.log(error);
    console.log(error.response.body);
  }
}

function composeMessage(message) {
  return `*From:* ${message.name}
*Email:* ${message.email}
*Phone:* ${message.phone}
*Message:* ${message.message}
*Affiliate:* ${message.affiliateId}`;
}

async function sendMessageToSheets(message) {
  const spreadsheetId = config.SPREADSHEET_ID;
  const sheetName = config.SHEET_NAME;

  const data = [message.name, message.email, message.phone, message.message, currentTime(), message.affiliateId];
  await addEntry({spreadsheetId, sheetName, data});
}

function currentTime() {
  let now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  if (month  < 10) { month  = "0" + month;  }
  if (date   < 10) { date   = "0" + date;   }
  if (hour   < 10) { hour   = "0" + hour;   }
  if (minute < 10) { minute = "0" + minute; }
  if (second < 10) { second = "0" + second; }

  let datetime = date + "/"
    + month + "/"
    + year + " "
    + hour + ":"
    + minute + ":"
    + second;

  let offset = -now.getTimezoneOffset() / 60;
  if (offset >= 0) offset = `+${offset}`;
  datetime += ` GMT${offset}`;
  return datetime;
}

module.exports = {
  verifyCaptchaToken,
  sendTelegramMessage,
  sendMessageToSheets,
};