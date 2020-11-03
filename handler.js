'use strict';
const {verifyCaptchaToken, sendTelegramMessage, sendMessageToSheets, successHtml, errorHtml} = require("./helper");
const querystring = require('querystring');
const aws = require("aws-sdk");

const headers = {"Content-Type": "text/html"};
const sqs = new aws.SQS({apiVersion: '2012-11-05'});

module.exports.form = async (event) => {
  const body = querystring.decode(event.body);
  console.log("event body: " + JSON.stringify(body));
  const captcha = body["g-recaptcha-response"];
  console.log(captcha);
  const result = await verifyCaptchaToken(captcha);
  const name = body["name"];
  console.log(`captcha: ${result}`);

  if (!result) return {
    statusCode: 200,
    headers,
    body: errorHtml()
  };

  const message = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    message: body.message
  };

  console.log("Queue url: " + process.env.QUEUE_URL);

  try {
    await sqs.sendMessage({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify(message),
      DelaySeconds: 0,
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: successHtml(name)
    };
  } catch (err) {
    console.log(err, err.stack);
    return {
      statusCode: 500,
      headers,
      body: err
    };
  }
};

module.exports.worker = async event => {
  console.log("number of messages: " + event.Records.length);
  for (const value of event.Records) {
    const mes = JSON.parse(value.body);
    console.log(mes);
    await sendTelegramMessage(mes);
    await sendMessageToSheets(mes);
  }
};