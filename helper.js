const axios = require('axios');
const config = require("./config");
const fs = require('fs');
const path = require('path');

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
  const mes = `*From:* ${message.name}
*Email:* ${message.email}
*Phone:* ${message.phone}
*Message:* ${message.message}`;
  return mes;
}

function successHtml(name) {
  let success = fs.readFileSync(path.join(__dirname + '/templates/success.html'), 'utf8');
  return success.replace("%NAME%", name);
}

function errorHtml() {
  return fs.readFileSync(path.join(__dirname + '/templates/error.html'), 'utf8');
}

module.exports = formHandler;