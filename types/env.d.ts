declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      LINE_CHANNEL_ACCESS_TOKEN: string;
      LINE_USER_ID: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}