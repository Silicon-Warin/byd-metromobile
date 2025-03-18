import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const cookieStore = cookies();
    const lineUserId = cookieStore.get('line_user_id')?.value;
    
    if (!lineUserId) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบข้อมูลผู้ใช้ Line' },
        { status: 400 }
      );
    }
    
    // สร้างข้อความที่จะส่งไปยัง Line
    const messageText = createMessageText(data);
    
    const message = {
      to: lineUserId,
      messages: [
        {
          type: 'text',
          text: messageText
        }
      ]
    };
    
    // ส่งข้อความไปยัง Line Messaging API
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify(message)
    });
    
    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const lineResponse = await response.json();
      return NextResponse.json(
        { success: false, error: lineResponse },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Send Line message error:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการส่งข้อความ' },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสร้างข้อความสำหรับส่งไปยัง Line
function createMessageText(data: any): string {
  let message = '🚗 ขอบคุณสำหรับความสนใจในรถยนต์ BYD\n\n';
  
  if (data.modelName) {
    message += `📋 รุ่นที่สนใจ: ${data.modelName}\n`;
  }
  
  if (data.price) {
    message += `💰 ราคา: ${data.price.toLocaleString()} บาท\n`;
  }
  
  // ข้อมูลลูกค้า
  if (data.customer) {
    message += '\n📞 ข้อมูลการติดต่อ:\n';
    if (data.customer.name) message += `ชื่อ: ${data.customer.name}\n`;
    if (data.customer.phone) message += `เบอร์โทร: ${data.customer.phone}\n`;
    if (data.customer.email) message += `อีเมล: ${data.customer.email}\n`;
    if (data.customer.preferredContact) message += `ช่องทางติดต่อที่ต้องการ: ${data.customer.preferredContact}\n`;
  }
  
  // ข้อมูลความสนใจ
  if (data.interest) {
    message += '\n🔍 ความสนใจ:\n';
    if (data.interest.testDrive) message += '✅ สนใจทดลองขับ\n';
    if (data.interest.financing) message += '✅ สนใจสอบถามไฟแนนซ์\n';
    if (data.interest.tradeIn) message += '✅ สนใจเทิร์นรถ\n';
    if (data.interest.color) message += `สีที่สนใจ: ${data.interest.color}\n`;
    if (data.interest.comments) message += `หมายเหตุ: ${data.interest.comments}\n`;
  }
  
  message += '\nเจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด';
  
  return message;
} 