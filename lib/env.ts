export function validateEnv() {
  const required = [
    'LINE_MSG_CHANNEL_ACCESS_TOKEN',
    'LINE_USER_ID',
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_LINE_CHANNEL_ID',
    'LINE_CHANNEL_SECRET',
    'LINE_LIFF_ID'
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}