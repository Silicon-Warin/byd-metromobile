import { NextResponse } from "next/server";
import { validateEnv } from "@/lib/env";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // Validate environment variables
    validateEnv();
    
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
    params.append('client_id', process.env.NEXT_PUBLIC_LINE_CHANNEL_ID);
    params.append('client_secret', process.env.LINE_CHANNEL_SECRET);
    
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