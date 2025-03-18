import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { lineProfile } = data;
    
    if (!lineProfile || !lineProfile.userId) {
      return NextResponse.json(
        { success: false, error: 'ข้อมูลโปรไฟล์ LINE ไม่ถูกต้อง' },
        { status: 400 }
      );
    }
    
    // เก็บข้อมูลที่ได้จาก Line Login ลงใน Cookie (server-side)
    const cookieStore = cookies();
    cookieStore.set('line_user_id', lineProfile.userId, { 
      maxAge: 60 * 60 * 24 * 30, // 30 วัน
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    // เก็บข้อมูลเพิ่มเติมตามต้องการ
    if (lineProfile.displayName) {
      cookieStore.set('line_display_name', lineProfile.displayName, { 
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }
    
    // เก็บ pictureUrl หากมี
    if (lineProfile.pictureUrl) {
      cookieStore.set('line_picture_url', lineProfile.pictureUrl, { 
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Line login error:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
} 