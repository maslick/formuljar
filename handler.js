'use strict';
const {CAPTCHA_PUBLIC} = require("./config");
const {
  verifyCaptchaToken,
  sendTelegramMessage,
  sendMessageToSheets,
  successHtml,
  errorHtml
} = require("./helper");

const fs = require('fs');
const path = require('path');
const querystring = require('querystring')

const headers = {"Content-Type": "text/html"};

module.exports.form = async event => {
  const body = querystring.decode(event.body);
  console.log(body);
  const captcha = body["g-recaptcha-response"];
  console.log(captcha);
  const result = await verifyCaptchaToken(captcha);
  const name = body["name"];
  console.log(`captcha: ${result}`);

  if (!result) return {
    statusCode: 200,
    headers,
    body: errorHtml()
  }; else {
    const message = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message
    };

    await sendTelegramMessage(message);
    await sendMessageToSheets(message);

    return {
      statusCode: 200,
      headers,
      body: successHtml(name)
    };
  }
};