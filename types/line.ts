/**
 * Line Profile จาก Line LIFF SDK
 */
export interface LineProfile {
  /** Line User ID */
  userId: string;
  /** ชื่อที่แสดงใน Line */
  displayName: string;
  /** URL รูปโปรไฟล์ Line */
  pictureUrl?: string;
  /** สถานะที่ตั้งค่าไว้ */
  statusMessage?: string;
}

/**
 * Line Login Response จาก API
 */
export interface LineLoginResponse {
  /** สถานะการล็อกอิน */
  success: boolean;
  /** ข้อความแสดงผลกรณีเกิดข้อผิดพลาด */
  error?: string;
}
