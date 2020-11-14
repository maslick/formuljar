const PORT = process.env.PORT || 3000;

const CAPTCHA_PUBLIC = process.env.CAPTCHA_PUBLIC || "6LeqCNkZAAAAAMeqnJ7R2UMdUADc8bdClUOOXDFo";
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "6LeqCNkZAAAAAPv_lhQTbsA1sH6vI3ovFgVojoaF";

const TELEGRAM_CHAT_ID = process.env.CHAT_ID || "-1001355312960"; // formuljar channel
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN || "1318860812:AAHRlDHw4hzLKq382OnhCSOVxKxGKB1lMY4";

const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS || `{
  "type": "service_account",
  "project_id": "formuljar-1604230016895",
  "private_key_id": "aa99c23f3da70d5501d978cc0892ff919effc493",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCG1dEO2AqJQeWi\\nB95hNC8j+Ae/kAL7DEOhg1QSkCGIehL15OxckU8yFyGXF3R5hV+TkHsRyyK8H3YD\\ndeW3c3fK8tW1aSvegohW3zEa0Lat793B3HJ++HJ9r44ZfyqncIF4khkg1AVyqLZi\\nzzVXFo/0ZEzb6dIs8q7BBFDcz+0TQjrvWGaY2U4MvwuvWeEf3kWTAvUan2myNwQO\\nRKVXhwHRSrr4SXxphfXienDf/H0bmY7KpNd2rbLe6NPRfTTtI1YijrVSEEDjSP9P\\nrklpBhuyIi+2x1hJ4EwFW8rYLMqKRai5Xm9ejwWGuMzWjbzGkXPjBNjzKpN0/5Ed\\nG+npwcPNAgMBAAECggEAE+vT0SxgtCJRDeU5OSXXYCpVZLtfgV1wwZRwb7StS6dz\\nlTJvLIcIiydJPnRH8Gtg8WGrmTeoyGAilMTOvZG5DXpe0kh5Y4zoHWOo8uQK1XyG\\nyE1sei91ZPXy2fgEoov4CQsW3NeOfYAJQGSKZjVObAaEp4oulBb/9EMRumobBhjw\\nSzv5WsmBhAqa+atbT3Y5xkBKXLZJixTlPxXLBKPkuwNYIcDsxe7bMnTwe3ThjxxI\\nqcEAceo3tGhaujMxZ2bzZwQIamBpel8PbT/zHpO/gYT7II4jUqFE7/YI+NEm0Fwy\\nEBKbBPgR+QgYmBdt4ws8E3nLJsZj8aHWcxcpUp0oSQKBgQC6fTu3yf3jdvigGF9R\\nrUvM9zZZSgr+5hAJhzyDYyJDes5oLdWZR3kCkMLITyS7kpw8AF4ZD9HTKSD6CUVb\\n1GvrjM0a4Hl1BF3ZBCz87zUPu86Cs0dw3P6D/FDdsuHzwPAYyQGvIE7tvQPZlZLk\\ntIk3o/ziS8NYn+aP+Q3LZke3OQKBgQC5F8Ux0YZE1fp6TxOLptqXACVY7mRiaBiq\\npKsocMbtY1pMquxGhSVy+9c2+XAs0ujuj0zg/8bEFbmz0IkGiSGgRREc9Fi3IqJD\\nY6Pse4nic/ATvZT3ONW11uA3XqynAuQkWIoyXunAhikbCgobO3OvmYBcvtOutoOH\\n3Iq9mgJ9NQKBgG6HqSxeOO9nZSamK2CigKnD399+BhRb0SeEkvYgfH9YOxv+Bnpp\\npSxDFl9YoSHXXGgno53hBXDNELGBay1pMmmSs0H5x6L2apUkZ3GmaWGg414N2grn\\nwKYDlv4/drJdKTDXefsNABriC3UbtMt+wVFMDacmVmqhoyqz51wli93pAoGBALT/\\naKdB5BH2SV1HbK6YuJMG4n6niGSutMhSBMmkFvNWv5vPXQPM+gUJ/rfUjnxWts9q\\nNFyl4mIneJQ9LXHFsas/Pu/YhdR4OsK5cjgzym82vqMfNcfXvSx3doTOwPkEm8Jr\\nDqEZLW5GA3Zch+t/ZK5n5h1LwkbMVa0K3mVwcFStAoGAJ+uGjBazWeXVKKipx0If\\nMyTcRd0hMhGCBi7XFW1O86ZvuOb6YT8D9FG4EaLQXmkteaf0es2ZROdObO80wUVU\\nAlFNvBm9kmD37j2MC0d7MCR8dOO4xWOVcUnyeZsMSnU131LxbW5JDnsenEWhNWl6\\nlRYGY14CzOPmsLdHwVe9X0g=\\n-----END PRIVATE KEY-----\\n",
  "client_email": "formuljar-service-account@formuljar-1604230016895.iam.gserviceaccount.com",
  "client_id": "117240024878755913942",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/formuljar-service-account%40formuljar-1604230016895.iam.gserviceaccount.com"
}`;

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "1jrUOrCJtJ-L46P0VjMjN9QK8NPMyU3vGUerGgEacsaE";
const SHEET_NAME = process.env.SHEET_NAME || "Sheet1";

module.exports = {
  PORT,
  CAPTCHA_PUBLIC, CAPTCHA_SECRET,
  TELEGRAM_CHAT_ID, TELEGRAM_BOT_TOKEN,
  GOOGLE_CREDENTIALS, SPREADSHEET_ID, SHEET_NAME
};