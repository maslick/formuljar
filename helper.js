const axios = require('axios');
const config = require("./config");
const fs = require('fs');
const path = require('path');
const {addEntry} = require('./sheets');

async function formHandler(req, res) {
  const captcha = req.body["g-recaptcha-response"];
  const result = await verifyCaptchaToken(captcha);
  const name = req.body["name"];
  console.log(`captcha: ${result}`);
  if (!result) res.send(errorHtml());
  else {
    res.send(successHtml(name));

    const message = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message
    };

    await sendTelegramMessage(message);
    await sendMessageToSheets(message);
  }
}

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
*Message:* ${message.message}`;
}

async function sendMessageToSheets(message) {
  const spreadsheetId = "1jrUOrCJtJ-L46P0VjMjN9QK8NPMyU3vGUerGgEacsaE";
  const sheetName = "Sheet1";

  const data = [message.name, message.email, message.phone, message.message, currentTime()];
  await addEntry({spreadsheetId, sheetName, data});
}

function successHtml(name) {
  let success = fs.readFileSync(path.join(__dirname + '/templates/success.html'), 'utf8');
  success = success.replace("%NAME%", name);
  return success.replace("%HOME_URL%", config.HOME_URL);
}

function errorHtml() {
  let error = fs.readFileSync(path.join(__dirname + '/templates/error.html'), 'utf8');
  return error.replace("%HOME_URL%", config.HOME_URL);
}

function currentTime() {
  const currentdate = new Date();
  let datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  let offset = -currentdate.getTimezoneOffset() / 60;
  if (offset >= 0) offset = `+${offset}`;
  datetime += ` GMT${offset}`;
  return datetime;
}

module.exports = {
  formHandler,
  verifyCaptchaToken,
  sendTelegramMessage,
  sendMessageToSheets,
  successHtml,
  errorHtml,
};