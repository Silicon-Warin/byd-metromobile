import { NextResponse } from "next/server";
import { validateEnv } from "@/lib/env";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // Validate environment variables
    validateEnv();
    
    const channelId = process.env.LINE_LOGIN_CHANNEL_ID;
    const channelSecret = process.env.LINE_LOGIN_CHANNEL_SECRET;

    if (!channelId || !channelSecret) {
      return NextResponse.json({ error: "LINE Login credentials not configured" }, { status: 500 });
    }
    
    // Parse request body
    const body = await req.json();
    const { code, redirectUri } = body;
    
    if (!code || !redirectUri) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    
    // Exchange code for access token
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', channelId);
    params.append('client_secret', channelSecret);
    
    const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const accessToken = tokenResponse.data.access_token;
    
    if (!accessToken) {
      return NextResponse.json({ error: "Failed to get access token" }, { status: 400 });
    }
    
    // Get user profile
    const profileResponse = await axios.get('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return NextResponse.json({ 
      success: true,
      profile: profileResponse.data
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('LINE Callback Error:', errorMessage);
    
    return NextResponse.json({ 
      error: "Failed to process LINE authentication",
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { 
      status: 500 
    });
  }
}