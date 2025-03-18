// LINE Login and Messaging utilities

// Generate LINE Login URL
export function generateLineLoginUrl(redirectUri: string, state: string) {
  // ใช้ค่า hardcoded เป็น fallback
  const lineLoginChannelId = process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID || "2007079049";
  
  const scope = "profile openid email";
  const url = new URL("https://access.line.me/oauth2/v2.1/authorize");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", lineLoginChannelId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("state", state);
  url.searchParams.append("scope", scope);

  return url.toString();
}

// Exchange authorization code for access token
export async function getLineAccessToken(code: string, redirectUri: string) {
  // สำหรับ server-side API ให้ใช้ API /api/line-login ดีกว่า
  const response = await fetch('/api/line-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code, redirectUri })
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