export function generateLineLoginUrl(redirectUri: string, state: string) {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  
  if (!liffId) {
    throw new Error('LIFF ID is not defined');
  }
  
  // Create URL with proper encoding
  const url = new URL('https://access.line.me/oauth2/v2.1/authorize');
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('client_id', liffId.split('-')[0]);
  url.searchParams.append('redirect_uri', redirectUri);
  url.searchParams.append('state', state);
  url.searchParams.append('scope', 'profile openid email');
  
  return url.toString();
}