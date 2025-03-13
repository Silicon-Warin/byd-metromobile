export interface CarModel {
  id: number;
  name: string;
  description: string;
  tagline?: string;
  price: number;
  imageUrl: string;
  badges?: string[];
  specifications?: {
    [key: string]: string;
  };
  learnMoreUrl?: string;
  configuratorUrl?: string;
}

export const defaultModels: CarModel[] = [
  {
    id: 1,
    name: "BYD SEALION 7",
    description: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
    price: 1249900,
    imageUrl: "/images/models/sealion7.jpg",
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
    imageUrl: "/images/models/m6.jpg",
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
    imageUrl: "/images/models/sealion6dm.jpg",
    specifications: {
      range: "1200 กม. (รวมโหมด EV + Hybrid)",
      acceleration: "0-100 กม./ชม. 6.5 วินาที",
      power: "250 แรงม้า",
    }
  },
  {
    id: 4,
    name: "BYD SEAL",
    tagline: "All-Electric. All-New.",
    description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
    price: 999900,
    imageUrl: "/images/models/seal.jpg",  
    
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
    imageUrl: "/images/models/atto3.jpg",
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
    imageUrl: "/images/models/dolphin.jpg",
    specifications: {
      range: "410 กม.",
      acceleration: "0-100 กม./ชม. 7.0 วินาที",
      power: "177 แรงม้า",
    }
  }
];

