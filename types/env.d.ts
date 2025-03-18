declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      LINE_CHANNEL_ACCESS_TOKEN: string;
      LINE_USER_ID: string;
      NEXT_PUBLIC_LINE_CHANNEL_ID: string;
      LINE_CHANNEL_SECRET: string;
      LINE_LIFF_ID: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}