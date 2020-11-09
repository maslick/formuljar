'use strict';
const {verifyCaptchaToken, sendTelegramMessage, sendMessageToSheets} = require("./helper");
const aws = require("aws-sdk");

const sqs = new aws.SQS({apiVersion: '2012-11-05'});

module.exports.form = async (event) => {
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUp - Lambda is warm!');
    return 'Lambda is warm!';
  }
  const body = JSON.parse(event.body);
  console.log("event body: " + JSON.stringify(body));
  const captcha = body["g-recaptcha-response"];
  console.log(captcha);
  const result = await verifyCaptchaToken(captcha);
  const name = body["name"];
  console.log(`captcha: ${result}`);

  const headers = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"};
  if (!result) return {
    statusCode: 403,
    headers,
    body: JSON.stringify({message: "An error occurred!"})
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
      body: JSON.stringify(message)
    }
  } catch (err) {
    console.log(err, err.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({message: "An error occurred!", details: err})
    };
  }
};

module.exports.worker = async event => {
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUp - Lambda is warm!');
    return 'Lambda is warm!';
  }
  console.log("number of messages: " + event.Records.length);
  for (const value of event.Records) {
    const mes = JSON.parse(value.body);
    console.log(mes);
    await sendTelegramMessage(mes);
    await sendMessageToSheets(mes);
  }
};