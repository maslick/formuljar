const PORT = process.env.PORT || 3000;

const CAPTCHA_PUBLIC = process.env.CAPTCHA_PUBLIC || "";
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "";

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ""; // formuljar channel
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS || `{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ""
}`;

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "";
const SHEET_NAME = process.env.SHEET_NAME || "Sheet1";

module.exports = {
  PORT,
  CAPTCHA_PUBLIC, CAPTCHA_SECRET,
  TELEGRAM_CHAT_ID, TELEGRAM_BOT_TOKEN,
  GOOGLE_CREDENTIALS, SPREADSHEET_ID, SHEET_NAME
};