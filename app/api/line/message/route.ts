import { NextResponse } from "next/server";
import { validateEnv } from "@/lib/env";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // Validate environment variables
    validateEnv();
    
    // Parse request body
    const body = await req.json();
    const { userId, modelName, modelId, price } = body;
    
    if (!userId || !modelName) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    
    // Create welcome message
    const welcomeMessage = `
สวัสดีครับ ขอบคุณที่สนใจรถยนต์ BYD ${modelName}

🚗 ข้อมูลรถที่คุณสนใจ:
- รุ่น: ${modelName}
- ราคาเริ่มต้น: ${price.toLocaleString()} บาท

ทางเราจะติดต่อกลับเพื่อให้ข้อมูลเพิ่มเติมโดยเร็วที่สุด
หากมีข้อสงสัยเพิ่มเติม สามารถสอบถามได้ที่นี่ครับ
    `.trim();

    // Send message to user
    await axios({
      method: 'post',
      url: 'https://api.line.me/v2/bot/message/push',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      data: {
        to: userId,
        messages: [{
          type: 'text',
          text: welcomeMessage
        }]
      },
      timeout: 10000 // 10 second timeout
    });
    
    // Also notify admin
    await axios({
      method: 'post',
      url: 'https://api.line.me/v2/bot/message/push',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      data: {
        to: process.env.LINE_USER_ID,
        messages: [{
          type: 'text',
          text: `🔔 มีลูกค้าสนใจรถ ${modelName} ผ่านระบบ LINE Login\nLINE ID: ${userId}`
        }]
      }
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('LINE Message Error:', errorMessage);
    
    return NextResponse.json({ 
      error: "Failed to send LINE message",
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { 
      status: 500 
    });
  }
}