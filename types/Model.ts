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
    name: "BYD ATTO 3",
    description: "รถ SUV ไฟฟ้าขนาดกะทัดรัด ที่มาพร้อมกับสมรรถนะที่โดดเด่น",
    price: 1099900,
    imageUrl: "/images/models/atto3.jpg",
    specifications: {
      range: "420 กม.",
      acceleration: "0-100 กม./ชม. 7.3 วินาที",
      power: "204 แรงม้า",
    }
  },
  {
    id: 2,
    name: "BYD DOLPHIN",
    description: "แฮทช์แบคไฟฟ้าที่ออกแบบสำหรับการใช้งานในเมือง ประหยัดและคล่องตัว",
    price: 859900,
    imageUrl: "/images/models/dolphin.jpg",
    specifications: {
      range: "410 กม.",
      acceleration: "0-100 กม./ชม. 7.0 วินาที",
      power: "177 แรงม้า",
    }
  },
  {
    id: 3,
    name: "BYD SEAL",
    tagline: "All-Electric. All-New.",
    description: "รถซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
    price: 1499900,
    imageUrl: "/images/models/seal.jpg",
    badges: ["New", "Electric"],
    learnMoreUrl: "/seal",
    configuratorUrl: "/configurator/byd-seal",
    specifications: {
      range: "570 กม.",
      acceleration: "0-100 กม./ชม. 5.9 วินาที",
      power: "230 แรงม้า",
    }
  }
];
