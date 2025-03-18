import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // ตรวจสอบว่ามี lineProfile หรือ code
    if (data.lineProfile) {
      // กรณีที่ส่ง lineProfile มาโดยตรง (จาก LIFF)
      const { lineProfile } = data;
      
      if (!lineProfile || !lineProfile.userId) {
        return NextResponse.json(
          { success: false, error: 'ข้อมูลโปรไฟล์ LINE ไม่ถูกต้อง' },
          { status: 400 }
        );
      }
      
      // สร้าง response object พร้อม cookies
      return createResponseWithCookies(lineProfile);
    } 
    else if (data.code) {
      // กรณีที่ส่ง code มา (จาก LINE Login)
      const { code } = data;
      
      // ตรวจสอบว่ามี LINE_LOGIN_CHANNEL_ID และ LINE_LOGIN_CHANNEL_SECRET
      const channelId = process.env.LINE_LOGIN_CHANNEL_ID;
      const channelSecret = process.env.LINE_LOGIN_CHANNEL_SECRET;
      
      if (!channelId || !channelSecret) {
        console.error('LINE Login credentials not configured');
        return NextResponse.json(
          { success: false, error: 'LINE Login credentials not configured' },
          { status: 500 }
        );
      }
      
      // ใช้ redirect URI ที่คงที่ตรงกับที่ลงทะเบียนไว้ใน LINE Developer Console
      const redirectUri = "https://www.bydmetromobile.com/promotions";
      
      // แลกเปลี่ยน code เป็น access token
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      params.append('client_id', channelId);
      params.append('client_secret', channelSecret);
      
      const tokenResponse = await axios.post(
        'https://api.line.me/oauth2/v2.1/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      const accessToken = tokenResponse.data.access_token;
      
      if (!accessToken) {
        return NextResponse.json(
          { success: false, error: 'Failed to get access token' },
          { status: 400 }
        );
      }
      
      // ดึงข้อมูลโปรไฟล์ผู้ใช้
      const profileResponse = await axios.get(
        'https://api.line.me/v2/profile',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      
      const lineProfile = profileResponse.data;
      
      // สร้าง response object พร้อม cookies
      const response = createResponseWithCookies(lineProfile);
      
      // ส่งข้อมูลโปรไฟล์กลับไปด้วย
      return NextResponse.json({
        success: true,
        profile: lineProfile
      }, {
        headers: response.headers
      });
    }
    else {
      return NextResponse.json(
        { success: false, error: 'ข้อมูลไม่ถูกต้อง กรุณาระบุ lineProfile หรือ code' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Line login error:', error);
    const errorMessage = error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสำหรับสร้าง response พร้อม cookies
function createResponseWithCookies(lineProfile: any) {
  // สร้าง response object
  const response = NextResponse.json({ success: true, profile: lineProfile });
  
  // เก็บข้อมูลที่ได้จาก Line Login ลงใน Cookie (response cookies)
  response.cookies.set('line_user_id', lineProfile.userId, { 
    maxAge: 60 * 60 * 24 * 30, // 30 วัน
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  // เก็บข้อมูลเพิ่มเติมตามต้องการ
  if (lineProfile.displayName) {
    response.cookies.set('line_display_name', lineProfile.displayName, { 
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }
  
  // เก็บ pictureUrl หากมี
  if (lineProfile.pictureUrl) {
    response.cookies.set('line_picture_url', lineProfile.pictureUrl, { 
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }
  
  return response;
} 