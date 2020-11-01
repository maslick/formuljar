const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require("./config");
const formHandler = require("./helper");

const app = express();
app.use(express.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  let content = fs.readFileSync(path.join(__dirname + '/index.html'), 'utf8');
  res.send(content.replace("%PUBLIC_KEY%", config.CAPTCHA_PUBLIC));
});

app.post('/form', formHandler);

app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Starting server on port: ${config.PORT}`);
});
