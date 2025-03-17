export interface CarModel {
  id: number;
  name: string;
  description: string;
  tagline?: string;
  price: number;
  imageUrlPromo: string;
  imageUrlModel: string;
  badges?: string[];
  specifications?: {
    [key: string]: string;
  };
  learnMoreUrl?: string;
  configuratorUrl?: string;
  imageWidth: number;
  imageHeight: number;
}

export const defaultModels: CarModel[] = [
  {
    id: 1,
    name: "BYD SEALION 7",
    description: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
    price: 1249900,
    imageUrlPromo: "/images/promotions/sealion7.jpg",
    imageUrlModel:"/images/models/BYD-sealion7.webp",
    imageWidth: 1200,
    imageHeight: 800,
    specifications: {
      range: "550 กม.",
      acceleration: "0-100 กม./ชม. 5.5 วินาที",
      power: "300 แรงม้า",
      
    }
  },
  {
    id: 2,
    name: "BYD M6",
    description: "MPV ไฟฟ้าสำหรับครอบครัว กว้างขวางและสะดวกสบาย",
    price: 799900,
    imageUrlPromo: "/images/promotions/m6.jpg",
    imageUrlModel:"/images/models/BYD-m6.webp",
    imageWidth: 1200,
    imageHeight: 800,
    specifications: {
      range: "500 กม.",
      acceleration: "0-100 กม./ชม. 7.5 วินาที",
      power: "190 แรงม้า",
    }
  },
  {
    id: 3,
    name: "BYD SEALION 6 DM-i",
    description: "SUV Plug-in Hybrid ขับเคลื่อน 4 ล้อ พลังงานสะอาด",
    price: 939900,
    imageUrlPromo: "/images/promotions/sealion6dm.jpg",
    imageUrlModel:"/images/models/BYD-sealion6dm.webp",
    imageWidth: 1200,
    imageHeight: 800,
    specifications: {
      range: "1200 กม. (รวมโหมด EV + Hybrid)",
      acceleration: "0-100 กม./ชม. 6.5 วินาที",
      power: "250 แรงม้า",
    }
  },
  {
    id: 4,
    name: "BYD SEAL",    
    description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
    price: 999900,
    imageUrlPromo: "/images/promotions/seal.jpg",      
    imageUrlModel:"/images/models/BYD-seal.webp",
    imageWidth: 1200,
    imageHeight: 800,
    specifications: {
      range: "570 กม.",
      acceleration: "0-100 กม./ชม. 5.9 วินาที",
      power: "230 แรงม้า",
    }
  },
  {
    id: 5,
    name: "NEW BYD ATTO 3",
    description: "SUV ไฟฟ้ากะทัดรัด สมรรถนะโดดเด่น เหมาะกับทุกการขับขี่",
    price: 899900,
    imageUrlPromo: "/images/promotions/atto3.jpg",
    imageUrlModel:"/images/models/BYD-Atto3.webp",
    imageWidth: 1200,
    imageHeight: 800,
    specifications: {
      range: "420 กม.",
      acceleration: "0-100 กม./ชม. 7.3 วินาที",
      power: "204 แรงม้า",
    }
  },
  {
    id: 6,
    name: "NEW BYD DOLPHIN",
    description: "แฮทช์แบคไฟฟ้า ประหยัดพลังงาน คล่องตัวสำหรับการใช้งานในเมือง",
    price: 569900,
    imageUrlPromo: "/images/promotions/dolphin.jpg",
    imageUrlModel:"/images/models/BYD-dolphin.webp",
    imageWidth: 1200,
    imageHeight: 800,
    specifications: {
      range: "410 กม.",
      acceleration: "0-100 กม./ชม. 7.0 วินาที",
      power: "177 แรงม้า",
    }
  }
];

