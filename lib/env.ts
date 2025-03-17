export function validateEnv() {
  const required = [
    'LINE_CHANNEL_ACCESS_TOKEN',
    'LINE_USER_ID',
    'NEXT_PUBLIC_API_URL'
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}