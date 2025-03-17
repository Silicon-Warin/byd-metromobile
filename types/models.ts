// types/models.ts
export interface CarModel {
  id: number;  // ใช้ number ตามที่ใช้ใน defaultModels
  name: string;
  description: string;
  price: number;
  imageUrlPromo: string;
  imageUrlModel: string;
  imageWidth: number;
  imageHeight: number;
  specifications: {
    range: string;
    acceleration: string;
    power: string;
  };
}

export interface InquiryForm {
  // ข้อมูลรถ
  modelId: number;
  modelName: string;
  price: number;
  specs?: {
    range: string;
    acceleration: string;
    power: string;
  };

  // ข้อมูลลูกค้า
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    preferredContact?: 'phone' | 'email' | 'line';
    preferredTime?: string;
  };

  // ข้อมูลความสนใจ
  interest?: {
    testDrive?: boolean;
    financing?: boolean;
    tradeIn?: boolean;
    color?: string;
    urgency?: 'immediate' | 'within_month' | 'no_rush';
    comments?: string;
  };
}