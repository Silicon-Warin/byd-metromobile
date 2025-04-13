// data/carModel.ts
export interface CarModel {  
  id: number | string;
  name: string;
  slug?: string; // Add this property
  tagline?: string;
  description: string;
  price: number;
  imageUrlPromo: string;
  imageUrlModel: string;
  imageUrlHero?: string;
  imageUrlReal?: string;
  imageUrlDataLeft?: string;
  imageUrlDataRight?: string;
  imageWidth: number;
  imageHeight: number;
  featuresTitle: string;
  specs?: {
    acceleration: string;
    range: string;
    drivetrain?: string;
    motor: string;
    battery?: string;
    charging?: string;
    annotate?: string;
  };
  colors?: CarColor[];
  variants: CarVariant[];
  promotion: string[];  
  features: string[] | CarFeature[];
  gallery?: string[];
  techHighlight?: hightlightSpec[];
  techSpec?: TechSpec;
}

export interface CarColor {
  name: string;
  code: string;
  image: string;
  gradient?: string;
  shadow?: string;
  border?: string;
}

export interface CarFeature {
  title: string;
  description: string;
  image: string;
}

export interface CarVariant {
  id: string;
  name: string;
  price: number;
  range: string;
  power?: string;
  acceleration?: string;
  accelerationData?: {
    value: string;
    unit: string;
    description: string;
  };  
  techSpec?: TechSpec;
}

export interface hightlightSpec {
  title: string;
  description: string;
  image: string;
}


export function findModelBySlug(slug: string): CarModel | undefined {
  // First try to find by explicit slug
  let model = defaultModels.find(model => 
    model.slug === slug || model.id.toString() === slug
  );
  
  if (!model) {
    console.log(`No model found with slug: ${slug}`);
  }
  
  return model;
}

// รายการรถยนต์ที่มีอยู่เดิม (คงไว้เพื่อความเข้ากันได้กับโค้ดเดิม)
export const defaultModels: CarModel[] = [
  {
    id: 1,
    name: "BYD SEALION 7",
    slug: "byd-sealion7",
    description: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
    price: 1249900,
    imageUrlPromo: "/images/motor-show-promo/sealion7.jpg",
    imageUrlModel: "/images/models/BYD-sealion7.webp",
    imageUrlHero: "/images/models/sealion7/sealion7-hero.jpg",
    imageUrlReal: "/images/models/sealion7/sealion7-real.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    featuresTitle: "",
    specs: {
      acceleration: "5.4 วินาที",
      range: "542 กิโลเมตร",
      drivetrain: "AWD Performance",
      motor: "มอเตอร์ 380 กิโลวัตต์", 
      battery: "87 กิโลวัตต์-ชั่วโมง",
      charging: "AC type 2 / DC CCS 2 (150 กิโลวัตต์)",
      annotate: "*AWD Performance performance and specifications"
    },
    variants: [
      {
        id: "sealion7-rwd",
        name: "RWD PREMIUM 567 KM",
        price: 1249900,
        range: "567 KM",

      },
      {
        id: "sealion7-awd",
        name: "AWD PERFORMANCE 542 KM",
        price: 1399900,
        range: "542 KM",

      },
    ],
    features: [      
    ],
    promotion: ["ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
      "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
      "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
      "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
      "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
      "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
      "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
      "ค่าจดทะเบียน",
      "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC"]    
  },
  {
    id: 2,
    name: "BYD M6",
    slug: "byd-m6",
    description: "MPV ไฟฟ้าสำหรับครอบครัว กว้างขวางและสะดวกสบาย",
    price: 799900,
    imageUrlPromo: "/images/motor-show-promo/m6.jpg",
    imageUrlModel: "/images/models/BYD-m6.webp",
    imageUrlHero: "/images/models/m6/m6-hero.jpg",
    imageUrlReal: "/images/models/m6/m6-real.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    specs: {
      acceleration: "8.5 วินาที",
      range: "530 กิโลเมตร", 
      drivetrain: "FWD",
      motor: "มอเตอร์ 150 กิโลวัตต์",
      battery: "71.7 กิโลวัตต์-ชั่วโมง",
      charging: "AC type 2 / DC CCS 2 (100 กิโลวัตต์)",
      annotate: "*Extended range performance and specifications"
    },
    variants: [
      {
        id: "m6-dynamic",
        name: "DYNAMIC",
        price: 799900,
        range: "",

      },
      {
        id: "m6-extended",
        name: "EXTENDED 530KM",
        price: 899900,
        range: "530 KM",

      },
      {
        id: "m6-7seat",
        name: "NEW 7 SEAT",
        price: 899900,
        range: "",

      },
    ],
    features: [
      "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
      "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
      "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
      "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
      "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
      "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
      "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
      "ค่าจดทะเบียน",
      "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
    ],
    promotion: [],
    featuresTitle: ""
  },
  {
    id: 3,
    name: "BYD SEALION 6 DM i",
    slug: "byd-sealion6dmi",
    description: "SUV Plug-in Hybrid ขับเคลื่อน 4 ล้อ พลังงานสะอาด",
    price: 939900,
    imageUrlPromo: "/images/motor-show-promo/sealion6dm.jpg",
    imageUrlModel: "/images/models/BYD-sealion6dm.webp",
    imageUrlHero: "/images/models/sealion6dmi/sealion6dmi-hero.jpg", 
    imageUrlReal: "/images/models/sealion6dmi/sealion6dmi-real.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    specs: {
      acceleration: "6.9 วินาที",
      range: "200 กิโลเมตร",
      drivetrain: "AWD Premium",
      motor: "มอเตอร์ 320 กิโลวัตต์",
      battery: "18.3 กิโลวัตต์-ชั่วโมง",
      charging: "AC type 2 / DC CCS 2 (80 กิโลวัตต์)",
      annotate: "*Premium performance and specifications"
    },
    variants: [
      {
        id: "sealion6-dynamic",
        name: "DYNAMIC",
        price: 939900,
        range: "",

      },
      {
        id: "sealion6-premium",
        name: "PREMIUM",
        price: 1039900,
        range: "",

      },
    ],
    features: [
      "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
      "รับประกันตัวรถ (WARRANTY) 6 ปี หรือ 150,000 กม.",
      "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
      "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
      "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
      "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
      "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
      "ค่าจดทะเบียน",
      "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
    ],
    promotion: [],
    featuresTitle: ""
  },
  {
    id: 4,
    name: "BYD SEAL",    
    slug: "byd-seal",
    description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
    price: 999900,
    imageUrlPromo: "/images/motor-show-promo/seal.jpg",      
    imageUrlModel:"/images/models/BYD-seal.webp",
    imageUrlHero: "/images/models/seal/seal-hero.jpg",
    imageUrlReal: "/images/models/seal/seal-real.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    featuresTitle: "ที่สุดแห่งสมรรถนะ",    
    specs: {
      acceleration: "3.8 วินาที",
      range: "580 กิโลเมตร",
      drivetrain: "AWD Performance",
      motor: "มอเตอร์ 390 กิโลวัตต์",
      battery: "82.56 กิโลวัตต์-ชั่วโมง",
      charging: "AC type 2 / DC CCS 2 (150 กิโลวัตต์)",
      annotate: "*AWD Performance performance and specifications",
    },
    colors: [
      {
        name: "Horizon white",
        code: "#F5F5F5",
        gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
        shadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
        image: "/images/models/seal/seal-horizon-white.png",
      },
      {
        name: "Quantum Black",
        code: "#121212",
        gradient: "linear-gradient(145deg, #222222, #000000)",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        image: "/images/models/seal/seal-quantum-black.png",
      },
      {
        name: "Space Grey",
        code: "#2C5C8F",
        gradient: "linear-gradient(145deg, #2C5C8F, #1D3D5F)",
        shadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.3)",
        image: "/images/models/seal/seal-space-grey.png",
      },
      {
        name: "Velocity blue",
        code: "#7AA5CD",
        gradient: "linear-gradient(145deg, #7AA5CD, #5585B5)",
        shadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.2)",
        image: "/images/models/seal/seal-velocity-blue.png",
      },
    ],
    gallery: [
      "/images/seal-gallery-1.png",
      "/images/seal-gallery-2.png",
      "/images/seal-gallery-3.png",
    ],
    features: [
      {        
        title: "ระบบกันสะเทือนอัจฉริยะ",
        description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
        image: "/images/models/seal/seal-design-card1.jpg",
      },
      {
        
        title: "ระบบกระจายแรงบิดอัจฉริยะ",
        description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
        image: "/images/models/seal/seal-design-card2.jpg",
      },
      {
        
        title: "โครงสร้างแบตเตอรี่แนบสนิท",
        description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
        image: "/images/models/seal/seal-design-card3.jpg",
      },
    ],  
    variants: [
      {
        id: "dynamic",
        name: "Dynamic",
        power: "150kW",        
        acceleration: "7.5 Sec",
        price: 999900,
        range: "510 km",
        accelerationData: {
          value: "7.5",
          unit: "Sec",
          description: "0-100 km/h",
        },

      },
      {
        id: "premium",
        name: "Premium",        
        power: "230kW",        
        acceleration: "5.9 Sec",
        price: 1099900,
        range: "650 km",
        accelerationData: {
          value: "5.9",
          unit: "Sec",
          description: "0-100 km/h",
        },

      },
      {
        id: "performance",
        name: "AWD Performance",
        power: "390kW",        
        acceleration: "3.8 Sec",
        price: 1199900,
        range: "580 km",
        accelerationData: {
          value: "3.8",
          unit: "Sec",
          description: "0-100 km/h",
        },
        techSpec: {
          dimensions: {
            length: "4,800 มม.",
            width: "1,875 มม.",
            height: "1,460 มม.",
            wheelbase: "2,920 มม.",
          },
          weights: {
            curb: "2,185 กก.",
            gross: "2,631 กก.",
          },
          clearance: "120 มม.",
          tiresAndWheels: "245/45 R19",
          batteryCapacity: "82.56 กิโลวัตต์-ชั่วโมง",
          chargingTime: {
            acCharging: "10 ชั่วโมง (11kW)",
            dcCharging: "30 นาที (150kW, 30-80%)",
          },
          performance: {
            topSpeed: "200 กม./ชม.",
            acceleration: "3.8 วินาที",
            range: "580 กม.",
          },
          misc: {
            "ประเภทแบตเตอรี่": "BYD Blade Battery (LFP)",
            "มอเตอร์ไฟฟ้า": "Dual Motor (Front + Rear)",
            "กำลังรวมสูงสุด": "390 กิโลวัตต์",
            "แรงบิดสูงสุด": "670 นิวตันเมตร",
          }
        },

      },
    ],
    promotion: [
      "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
      "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม", 
      "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
      "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
      "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
      "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
      "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
      "ค่าจดทะเบียน",
      "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
    ],
    techHighlight:[
      {
        title: "Advanced Cell-to-Body Technology",
        description: "BYD SEAL เป็นยานพาหนะแรกที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ พร้อมทั้งเพิ่มพื้นที่ภายในและปรับสมดุลการกระจายน้ำหนักให้การควบคุมรถมีประสิทธิภาพยิ่งขึ้น",
        image: "/images/models/seal/seal-tech1.jpg",
      },
      {
        title: "BYD SEAL",
        description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
        image: "/images/models/seal/seal-tech2.jpg",
      }
    ]
  },  
  {
    id: 5,
    name: "NEW BYD ATTO 3",
    slug: "byd-atto-3",
    description: "SUV ไฟฟ้ากะทัดรัด สมรรถนะโดดเด่น เหมาะกับทุกการขับขี่",
    price: 899900,
    imageUrlPromo: "/images/motor-show-promo/atto3.jpg",
    imageUrlModel: "/images/models/BYD-Atto3.webp",
    imageUrlHero: "/images/models/atto3/atto3-hero.jpg",
    imageUrlReal: "/images/models/atto3/atto3-real.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    specs: {
      acceleration: "7.3 วินาที",
      range: "480 กิโลเมตร",
      drivetrain: "FWD",
      motor: "มอเตอร์ 150 กิโลวัตต์",
      battery: "60.48 กิโลวัตต์-ชั่วโมง", 
      charging: "AC type 2 / DC CCS 2 (80 กิโลวัตต์)",
      annotate: "*Extended range performance and specifications"
    },
    variants: [
      {
        id: "atto3-extended",
        name: "EXTENDED 480KM",
        price: 899900,
        range: "480 KM",

      },
    ],
    features: [
      "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
      "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
      "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
      "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
      "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
      "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
      "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
      "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
      "ค่าจดทะเบียน",
    ],
    promotion: [],
    featuresTitle: ""
  },
  {
    id: 6,
    name: "NEW BYD DOLPHIN",
    slug: "byd-dolphin",
    description: "แฮทช์แบคไฟฟ้า ประหยัดพลังงาน คล่องตัวสำหรับการใช้งานในเมือง",
    price: 569900,
    imageUrlPromo: "/images/motor-show-promo/dolphin.jpg",
    imageUrlModel: "/images/models/BYD-dolphin.webp",
    imageUrlHero: "/images/models/dolphin/dolphin-hero.jpg",
    imageUrlReal: "/images/models/dolphin/dolphin-real.jpg",
    imageUrlDataLeft:" /images/models/dolphin/dolphin-data-left.jpg",
    imageUrlDataRight: "/images/models/dolphin/dolphin-data-right.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    specs: {
      acceleration: "7 วินาที",
      range: "490 กิโลเมตร",
      drivetrain: "FWD",
      motor: "มอเตอร์ 150 กิโลวัตต์",
      battery: "60.48 กิโลวัตต์-ชั่วโมง",
      charging: "AC type 2 / DC CCS 2 (80 กิโลวัตต์)",
      annotate: "*Extended range performance and battery specifications",
    },    
    variants: [
      {
        id: "dolphin-standard",
        name: "STANDARD RANGE 435KM",
        price: 569900,
        range: "435 KM",

      },
      {
        id: "dolphin-extended",
        name: "EXTENDED RANGE 490KM",
        price: 709900,
        range: "490 KM",

      },
    ],
    features: [
      "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
      "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
      "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
      "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
      "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
      "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
      "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
      "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
      "ค่าจดทะเบียน",
      "ฟรี HOME CHARGER ยี่ห้อ ZHIDA (เฉพาะรุ่น EXTENDED)",
    ],
    promotion: [],
    featuresTitle: ""
  },  
];

// เพิ่ม interface สำหรับข้อมูล tech spec
export interface TechSpec {
  dimensions?: {
    length: string; // ความยาว (มิลลิเมตร)
    width: string;  // ความกว้าง (มิลลิเมตร)
    height: string; // ความสูง (มิลลิเมตร)
    wheelbase: string; // ระยะห่างล้อ (มิลลิเมตร)
  };
  weights?: {
    curb: string;    // น้ำหนักรถเปล่า (กิโลกรัม)
    gross: string;   // น้ำหนักรถรวมภาระ (กิโลกรัม)
  };
  clearance?: string; // ระยะห่างจากพื้น (มิลลิเมตร)
  tiresAndWheels?: string; // ขนาดล้อและยาง
  batteryCapacity?: string; // ความจุแบตเตอรี่ (กิโลวัตต์-ชั่วโมง)
  chargingTime?: {
    acCharging?: string; // เวลาชาร์จด้วย AC
    dcCharging?: string; // เวลาชาร์จด้วย DC
  };
  performance?: {
    topSpeed?: string; // ความเร็วสูงสุด (กม./ชม.)
    acceleration?: string; // อัตราเร่ง 0-100 กม./ชม. (วินาที)
    range?: string; // ระยะทางขับขี่ (กม.)
  };
  misc?: Record<string, string>; // ข้อมูลอื่นๆ
}










