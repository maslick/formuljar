const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const publicKey = process.env.CAPTCHA_PUBLIC || "6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo";
const secretKey = process.env.CAPTCHA_SECRET || "6LeqCNkZAAAAAPv_lhQTbsA1sH6vI3ovFgVojoaF";

const token = process.env.BOT_TOKEN || "1318860812:AAHRlDHw4hzLKq382OnhCSOVxKxGKB1lMY4";
const chatId = process.env.CHAT_ID || "-445121005";

const app = express();
app.use(express.urlencoded({
  extended: true
}))
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  let content = fs.readFileSync(path.join(__dirname + '/index.html'), 'utf8');
  res.send(content.replace("%PUBLIC_KEY%", publicKey));
});

app.post('/form', async function (req, res) {
  const captcha = req.body["g-recaptcha-response"];
  const result = await verifyToken(captcha);
  const name = req.body["name"];
  if (!result)
    res.send("<div>An error occurred! <a href='/'>Try again</a></div>");
  else {
    res.send(`<div>Thank you, ${name}, for your request. We will contact you. <a href='/'>Back</a></div></div><br>`);
    await sendTelegramMessage({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message
    });
  }
});

async function verifyToken(token) {
  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', params);
    return response.data.success;
  } catch (error) {
    console.log(error.response.body);
    return false;
  }
}

async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const options = {
    headers: {
      "content-type": "application/json"
    }
  };

  const mess = {
    chat_id: chatId,
    text: JSON.stringify(message, null, 4)
  };

  try {
    await axios.post(url, mess, options);
  } catch (error) {
    console.log(error);
    console.log(error.response.body);
  }
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Starting server on port: ${port}`);
});
