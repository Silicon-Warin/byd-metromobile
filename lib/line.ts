// LINE Login and Messaging utilities

// Generate LINE Login URL
export function generateLineLoginUrl(redirectUri: string, state: string) {
  const lineChannelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;
  const scope = 'profile openid email';
  
  const url = new URL('https://access.line.me/oauth2/v2.1/authorize');
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('client_id', lineChannelId!);
  url.searchParams.append('redirect_uri', redirectUri);
  url.searchParams.append('state', state);
  url.searchParams.append('scope', scope);
  
  return url.toString();
}

// Exchange authorization code for access token
export async function getLineAccessToken(code: string, redirectUri: string) {
  const lineChannelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;
  const lineChannelSecret = process.env.LINE_CHANNEL_SECRET;
  
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('client_id', lineChannelId!);
  params.append('client_secret', lineChannelSecret!);
  
  const response = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
  
  if (!response.ok) {
    throw new Error('Failed to get LINE access token');
  }
  
  return await response.json();
}

// Get user profile with access token
export async function getLineUserProfile(accessToken: string) {
  const response = await fetch('https://api.line.me/v2/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to get LINE user profile');
  }
  
  return await response.json();
}