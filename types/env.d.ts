declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      
      // Message API
      LINE_MSG_CHANNEL_ACCESS_TOKEN: string;
      LINE_MSG_CHANNEL_ID: string;
      LINE_MSG_CHANNEL_SECRET: string;
      
      // Line Login
      LINE_LOGIN_CHANNEL_ID: string;
      LINE_LOGIN_CHANNEL_SECRET: string;
      LINE_LIFF_ID: string;
      NEXT_PUBLIC_LINE_LIFF_ID: string;
      
      // Common
      LINE_USER_ID: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}