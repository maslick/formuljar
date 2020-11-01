const CAPTCHA_PUBLIC = process.env.CAPTCHA_PUBLIC || "6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo";
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "6LeqCNkZAAAAAPv_lhQTbsA1sH6vI3ovFgVojoaF";

const TELEGRAM_CHAT_ID = process.env.CHAT_ID || "-1001355312960"; // formuljar channel
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN || "1318860812:AAHRlDHw4hzLKq382OnhCSOVxKxGKB1lMY4";

// const chatId = process.env.CHAT_ID || "73317272";    // formuljar bot (Pavel Maslov)
// const chatId = process.env.CHAT_ID || "-445121005";  // formuljar group

const PORT = process.env.PORT || 3000;

module.exports = {
  CAPTCHA_PUBLIC, CAPTCHA_SECRET, TELEGRAM_CHAT_ID, TELEGRAM_BOT_TOKEN, PORT
}