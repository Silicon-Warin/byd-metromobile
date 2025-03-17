import { NextResponse } from "next/server";
import { z } from "zod";
import { headers } from 'next/headers';
import { validateEnv } from "@/lib/env";
import axios, { AxiosError } from 'axios';

// Rate limiting map
const requestMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // requests
const TIME_WINDOW = 60 * 1000; // 1 minute

// Schema validation
const inquirySchema = z.object({
  // ข้อมูลรถ
  modelId: z.number(),
  modelName: z.string(),
  price: z.number(),
  specs: z.object({
    range: z.string(),
    acceleration: z.string(),
    power: z.string()
  }).optional(),

  // ข้อมูลลูกค้า
  customer: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    preferredContact: z.enum(['phone', 'email', 'line']).optional(),
    preferredTime: z.string().optional(),
  }).optional(),

  // ข้อมูลความสนใจ
  interest: z.object({
    testDrive: z.boolean().optional(),
    financing: z.boolean().optional(),
    tradeIn: z.boolean().optional(),
    color: z.string().optional(),
    urgency: z.enum(['immediate', 'within_month', 'no_rush']).optional(),
    comments: z.string().optional()
  }).optional()
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

    // Parse request body first to catch JSON parsing errors
    let body;
    try {
      body = await req.json();
      console.log('Request body:', body);
    } catch (e: unknown) {
      console.error('JSON parsing error:', e);
      return NextResponse.json({ 
        error: "Invalid JSON in request body" 
      }, { 
        status: 400 
      });
    }

    // Validate environment variables
    try {
      validateEnv();
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      console.error('Environment validation error:', e);
      return NextResponse.json({
        error: "Server configuration error",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, { status: 500 });
    }

    // Debug environment variables
    console.log('Environment Check:', {
      hasToken: !!process.env.LINE_CHANNEL_ACCESS_TOKEN?.length,
      hasUserId: !!process.env.LINE_USER_ID?.length,
      nodeEnv: process.env.NODE_ENV
    });

    // Validate request body against schema
    let validatedData;
    try {
      validatedData = inquirySchema.parse(body);
    } catch (e: unknown) {
      const zodError = e instanceof z.ZodError ? e.errors : 'Invalid data format';
      console.error('Schema validation error:', e);
      return NextResponse.json({ 
        error: "Invalid request data",
        details: process.env.NODE_ENV === 'development' ? zodError : undefined
      }, { 
        status: 400 
      });
    }

    // Verify LINE credentials
    if (!process.env.LINE_CHANNEL_ACCESS_TOKEN || !process.env.LINE_USER_ID) {
      console.error('Missing LINE credentials in environment');
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

📌 ข้อมูลรถ
รุ่น: ${validatedData.modelName}
ราคา: ${validatedData.price.toLocaleString()} บาท
${validatedData.interest?.color ? `สี: ${validatedData.interest.color}` : ''}

${validatedData.specs ? `📋 สเปครถ
▪️ ระยะทางวิ่ง: ${validatedData.specs.range}
▪️ อัตราเร่ง: ${validatedData.specs.acceleration}
▪️ กำลังสูงสุด: ${validatedData.specs.power}` : ''}

${validatedData.customer ? `👤 ข้อมูลลูกค้า
${validatedData.customer.name ? `ชื่อ: ${validatedData.customer.name}` : ''}
${validatedData.customer.phone ? `เบอร์โทร: ${validatedData.customer.phone}` : ''}
${validatedData.customer.email ? `อีเมล: ${validatedData.customer.email}` : ''}
${validatedData.customer.preferredTime ? `เวลาที่สะดวกติดต่อ: ${validatedData.customer.preferredTime}` : ''}` : ''}

${validatedData.interest ? `📝 ความสนใจเพิ่มเติม
${validatedData.interest.testDrive ? '✓ สนใจทดลองขับ' : ''}
${validatedData.interest.financing ? '✓ สนใจสอบถามไฟแนนซ์' : ''}
${validatedData.interest.tradeIn ? '✓ สนใจเทิร์นรถ' : ''}
${validatedData.interest.comments ? `💬 หมายเหตุ: ${validatedData.interest.comments}` : ''}` : ''}

⏰ เวลา: ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}
📱 ที่มา: เว็บไซต์ BYD Metromobile
`.trim();

    // Send to LINE using axios instead of fetch
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.line.me/v2/bot/message/push',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          'X-Line-Retry-Key': crypto.randomUUID()
        },
        data: {
          to: process.env.LINE_USER_ID,
          messages: [{
            type: 'text',
            text: message
          }]
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log('LINE notification sent successfully', response.status);
      return NextResponse.json({ 
        success: true 
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('LINE API Error:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        message: axiosError.message
      });
      
      return NextResponse.json({ 
        error: "Failed to send notification",
        details: process.env.NODE_ENV === 'development' 
          ? `${axiosError.message} - ${JSON.stringify(axiosError.response?.data || {})}` 
          : undefined
      }, { 
        status: 502 
      });
    }

  } catch (error: unknown) {
    // Log detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('API Error:', {
      message: errorMessage,
      stack: errorStack,
      env: process.env.NODE_ENV
    });
    
    return NextResponse.json({ 
      error: "Service temporarily unavailable",
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { 
      status: 500 
    });
  }
}