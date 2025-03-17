import { NextResponse } from "next/server";
import { z } from "zod";
import { headers } from 'next/headers';
import { validateEnv } from "@/lib/env";

// Rate limiting map
const requestMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // requests
const TIME_WINDOW = 60 * 1000; // 1 minute

// Schema validation
const inquirySchema = z.object({
  modelId: z.number(),
  modelName: z.string(),
  price: z.number(),
  specs: z.object({
    range: z.string(),
    acceleration: z.string(),
    power: z.string()
  })
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const userRequest = requestMap.get(ip);

    if (userRequest) {
      if (userRequest.timestamp + TIME_WINDOW > now) {
        if (userRequest.count >= RATE_LIMIT) {
          return NextResponse.json({ 
            error: "จำนวนคำขอเกินกำหนด กรุณารอสักครู่" 
          }, { 
            status: 429 
          });
        }
        userRequest.count++;
      } else {
        userRequest.count = 1;
        userRequest.timestamp = now;
      }
    } else {
      requestMap.set(ip, { count: 1, timestamp: now });
    }

    // Validate environment variables
    validateEnv();

    // Debug environment variables
    console.log('Environment Check:', {
      hasToken: !!process.env.LINE_CHANNEL_ACCESS_TOKEN?.length,
      hasUserId: !!process.env.LINE_USER_ID?.length,
      nodeEnv: process.env.NODE_ENV
    });

    // Validate request body
    const body = await req.json();
    const validatedData = inquirySchema.parse(body);

    // Verify LINE credentials
    if (!process.env.LINE_CHANNEL_ACCESS_TOKEN || !process.env.LINE_USER_ID) {
      console.error('Missing LINE credentials in production');
      return NextResponse.json({
        error: "Configuration error",
        details: process.env.NODE_ENV === 'development' 
          ? 'Missing LINE credentials' 
          : undefined
      }, { status: 503 });
    }

    // Create LINE message with security measures
    const message = `
🚗 แจ้งเตือน: ลูกค้าสนใจสั่งจองรถ

รุ่น: ${validatedData.modelName}
ราคา: ${validatedData.price.toLocaleString()} บาท

📋 ข้อมูลรถ:
▪️ ระยะทางวิ่ง: ${validatedData.specs.range}
▪️ อัตราเร่ง: ${validatedData.specs.acceleration}
▪️ กำลังสูงสุด: ${validatedData.specs.power}

⏰ เวลา: ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}
📱 ที่มา: เว็บไซต์ BYD Metromobile
`.trim();

    // Send to LINE with secure headers
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        "X-Line-Retry-Key": crypto.randomUUID()
      },
      body: JSON.stringify({
        to: process.env.LINE_USER_ID,
        messages: [{
          type: "text",
          text: message
        }]
      })
    });

    const responseData = await response.text();
    
    if (!response.ok) {
      console.error('LINE API Response:', {
        status: response.status,
        data: responseData
      });
      throw new Error(`LINE API Error: ${responseData}`);
    }

    return NextResponse.json({ 
      success: true 
    });

  } catch (error: any) {
    // Log detailed error for debugging
    console.error('API Error:', {
      message: error.message,
      stack: error.stack,
      env: process.env.NODE_ENV
    });
    
    return NextResponse.json({ 
      error: "Service temporarily unavailable" 
    }, { 
      status: 500 
    });
  }
}