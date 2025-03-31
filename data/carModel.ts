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
  };
  colors?: CarColor[];
  variants: CarVariant[];
  promotion: string[];  
  features: string[] | CarFeature[];
  gallery?: string[];
  techSpec?: TechSpec; // เพิ่มข้อมูล tech spec
}

export interface CarColor {
  name: string;
  code: string;
  image: string;
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
  downPaymentOptions: DownPaymentOption[];
  techSpec?: TechSpec; // เพิ่มข้อมูล tech spec สำหรับแต่ละรุ่นย่อย
}

export interface DownPaymentOption {
  percentage: number;
  amount: number;
  remainingBalance: number;
  monthlyPayments: MonthlyPayment[];
}

export interface MonthlyPayment {
  months: number;
  amount: number;
  interestRate: string;
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
    imageWidth: 1200,
    imageHeight: 800,
    featuresTitle: "",
    variants: [
      {
        id: "sealion7-rwd",
        name: "RWD PREMIUM 567 KM",
        price: 1249900,
        range: "567 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 374970,
            remainingBalance: 874930,
            monthlyPayments: [
              { months: 48, amount: 19671, interestRate: "1.98%" },
              { months: 60, amount: 16368, interestRate: "2.45%" },
              { months: 72, amount: 14259, interestRate: "2.89%" },
              { months: 84, amount: 13033, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 312475,
            remainingBalance: 937425,
            monthlyPayments: [
              { months: 48, amount: 21076, interestRate: "1.98%" },
              { months: 60, amount: 17725, interestRate: "2.69%" },
              { months: 72, amount: 15356, interestRate: "2.99%" },
              { months: 84, amount: 14042, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 249980,
            remainingBalance: 999920,
            monthlyPayments: [
              { months: 48, amount: 23073, interestRate: "2.69%" },
              { months: 60, amount: 19073, interestRate: "2.89%" },
              { months: 72, amount: 16546, interestRate: "3.19%" },
              { months: 84, amount: 15062, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 187485,
            remainingBalance: 1062415,
            monthlyPayments: [
              { months: 48, amount: 24869, interestRate: "3.09%" },
              { months: 60, amount: 20708, interestRate: "3.39%" },
              { months: 72, amount: 17934, interestRate: "3.59%" },
              { months: 84, amount: 16446, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 124990,
            remainingBalance: 1124910,
            monthlyPayments: [
              { months: 48, amount: 26895, interestRate: "3.69%" },
              { months: 60, amount: 22489, interestRate: "3.99%" },
              { months: 72, amount: 19645, interestRate: "4.29%" },
              { months: 84, amount: 17695, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 62495,
            remainingBalance: 1187405,
            monthlyPayments: [
              { months: 48, amount: 28785, interestRate: "4.09%" },
              { months: 60, amount: 24134, interestRate: "4.39%" },
              { months: 72, amount: 21133, interestRate: "4.69%" },
              { months: 84, amount: 19073, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "sealion7-awd",
        name: "AWD PERFORMANCE 542 KM",
        price: 1399900,
        range: "542 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 419970,
            remainingBalance: 979930,
            monthlyPayments: [
              { months: 48, amount: 22032, interestRate: "1.98%" },
              { months: 60, amount: 18333, interestRate: "2.45%" },
              { months: 72, amount: 15970, interestRate: "2.89%" },
              { months: 84, amount: 14597, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 349975,
            remainingBalance: 1049925,
            monthlyPayments: [
              { months: 48, amount: 23606, interestRate: "1.98%" },
              { months: 60, amount: 19852, interestRate: "2.69%" },
              { months: 72, amount: 17198, interestRate: "2.99%" },
              { months: 84, amount: 15728, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 279980,
            remainingBalance: 1119920,
            monthlyPayments: [
              { months: 48, amount: 25842, interestRate: "2.69%" },
              { months: 60, amount: 21362, interestRate: "2.89%" },
              { months: 72, amount: 18532, interestRate: "3.19%" },
              { months: 84, amount: 16869, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 209985,
            remainingBalance: 1189915,
            monthlyPayments: [
              { months: 48, amount: 27854, interestRate: "3.09%" },
              { months: 60, amount: 23193, interestRate: "3.39%" },
              { months: 72, amount: 20086, interestRate: "3.59%" },
              { months: 84, amount: 18420, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 139990,
            remainingBalance: 1259910,
            monthlyPayments: [
              { months: 48, amount: 30122, interestRate: "3.69%" },
              { months: 60, amount: 25188, interestRate: "3.99%" },
              { months: 72, amount: 22003, interestRate: "4.29%" },
              { months: 84, amount: 19818, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 69995,
            remainingBalance: 1329905,
            monthlyPayments: [
              { months: 48, amount: 32239, interestRate: "4.09%" },
              { months: 60, amount: 27030, interestRate: "4.39%" },
              { months: 72, amount: 23669, interestRate: "4.69%" },
              { months: 84, amount: 21362, interestRate: "4.99%" },
            ],
          },
        ],
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
    imageWidth: 1200,
    imageHeight: 800,
    variants: [
      {
        id: "m6-dynamic",
        name: "DYNAMIC",
        price: 799900,
        range: "",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 239970,
            remainingBalance: 559930,
            monthlyPayments: [
              { months: 48, amount: 12589, interestRate: "1.98%" },
              { months: 60, amount: 10475, interestRate: "2.45%" },
              { months: 72, amount: 9125, interestRate: "2.89%" },
              { months: 84, amount: 8341, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 199975,
            remainingBalance: 599925,
            monthlyPayments: [
              { months: 48, amount: 13488, interestRate: "1.98%" },
              { months: 60, amount: 11344, interestRate: "2.69%" },
              { months: 72, amount: 9827, interestRate: "2.99%" },
              { months: 84, amount: 8987, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 159980,
            remainingBalance: 639920,
            monthlyPayments: [
              { months: 48, amount: 14765, interestRate: "2.69%" },
              { months: 60, amount: 12206, interestRate: "2.89%" },
              { months: 72, amount: 10589, interestRate: "3.19%" },
              { months: 84, amount: 9639, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 119985,
            remainingBalance: 679915,
            monthlyPayments: [
              { months: 48, amount: 15916, interestRate: "3.09%" },
              { months: 60, amount: 13253, interestRate: "3.39%" },
              { months: 72, amount: 11477, interestRate: "3.59%" },
              { months: 84, amount: 10525, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 79990,
            remainingBalance: 719910,
            monthlyPayments: [
              { months: 48, amount: 17212, interestRate: "3.69%" },
              { months: 60, amount: 14392, interestRate: "3.99%" },
              { months: 72, amount: 12572, interestRate: "4.29%" },
              { months: 84, amount: 11324, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 39995,
            remainingBalance: 759905,
            monthlyPayments: [
              { months: 48, amount: 18421, interestRate: "4.09%" },
              { months: 60, amount: 15445, interestRate: "4.39%" },
              { months: 72, amount: 13524, interestRate: "4.69%" },
              { months: 84, amount: 12206, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "m6-extended",
        name: "EXTENDED 530KM",
        price: 899900,
        range: "530 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 269970,
            remainingBalance: 629930,
            monthlyPayments: [
              { months: 48, amount: 14173, interestRate: "1.98%" },
              { months: 60, amount: 11785, interestRate: "2.45%" },
              { months: 72, amount: 10266, interestRate: "2.89%" },
              { months: 84, amount: 9384, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 224975,
            remainingBalance: 674925,
            monthlyPayments: [
              { months: 48, amount: 15175, interestRate: "1.98%" },
              { months: 60, amount: 12762, interestRate: "2.69%" },
              { months: 72, amount: 11056, interestRate: "2.99%" },
              { months: 84, amount: 10110, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 179980,
            remainingBalance: 719920,
            monthlyPayments: [
              { months: 48, amount: 16612, interestRate: "2.69%" },
              { months: 60, amount: 13732, interestRate: "2.89%" },
              { months: 72, amount: 11913, interestRate: "3.19%" },
              { months: 84, amount: 10844, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 134985,
            remainingBalance: 764915,
            monthlyPayments: [
              { months: 48, amount: 17905, interestRate: "3.09%" },
              { months: 60, amount: 14909, interestRate: "3.39%" },
              { months: 72, amount: 12912, interestRate: "3.59%" },
              { months: 84, amount: 11841, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 89990,
            remainingBalance: 809910,
            monthlyPayments: [
              { months: 48, amount: 19364, interestRate: "3.69%" },
              { months: 60, amount: 16191, interestRate: "3.99%" },
              { months: 72, amount: 14144, interestRate: "4.29%" },
              { months: 84, amount: 12740, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 44995,
            remainingBalance: 854905,
            monthlyPayments: [
              { months: 48, amount: 20724, interestRate: "4.09%" },
              { months: 60, amount: 17376, interestRate: "4.39%" },
              { months: 72, amount: 15215, interestRate: "4.69%" },
              { months: 84, amount: 13732, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "m6-7seat",
        name: "NEW 7 SEAT",
        price: 899900,
        range: "",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 269970,
            remainingBalance: 629930,
            monthlyPayments: [
              { months: 48, amount: 14173, interestRate: "1.98%" },
              { months: 60, amount: 11785, interestRate: "2.45%" },
              { months: 72, amount: 10266, interestRate: "2.89%" },
              { months: 84, amount: 9384, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 224975,
            remainingBalance: 674925,
            monthlyPayments: [
              { months: 48, amount: 15175, interestRate: "1.98%" },
              { months: 60, amount: 12762, interestRate: "2.69%" },
              { months: 72, amount: 11056, interestRate: "2.99%" },
              { months: 84, amount: 10110, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 179980,
            remainingBalance: 719920,
            monthlyPayments: [
              { months: 48, amount: 16612, interestRate: "2.69%" },
              { months: 60, amount: 13732, interestRate: "2.89%" },
              { months: 72, amount: 11913, interestRate: "3.19%" },
              { months: 84, amount: 10844, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 134985,
            remainingBalance: 764915,
            monthlyPayments: [
              { months: 48, amount: 17905, interestRate: "3.09%" },
              { months: 60, amount: 14909, interestRate: "3.39%" },
              { months: 72, amount: 12912, interestRate: "3.59%" },
              { months: 84, amount: 11841, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 89990,
            remainingBalance: 809910,
            monthlyPayments: [
              { months: 48, amount: 19364, interestRate: "3.69%" },
              { months: 60, amount: 16191, interestRate: "3.99%" },
              { months: 72, amount: 14144, interestRate: "4.29%" },
              { months: 84, amount: 12740, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 44995,
            remainingBalance: 854905,
            monthlyPayments: [
              { months: 48, amount: 20724, interestRate: "4.09%" },
              { months: 60, amount: 17376, interestRate: "4.39%" },
              { months: 72, amount: 15215, interestRate: "4.69%" },
              { months: 84, amount: 13732, interestRate: "4.99%" },
            ],
          },
        ],
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
    imageWidth: 1200,
    imageHeight: 800,

    variants: [
      {
        id: "sealion6-dynamic",
        name: "DYNAMIC",
        price: 939900,
        range: "",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 281970,
            remainingBalance: 657930,
            monthlyPayments: [
              { months: 48, amount: 14792, interestRate: "1.98%" },
              { months: 60, amount: 12309, interestRate: "2.45%" },
              { months: 72, amount: 10722, interestRate: "2.89%" },
              { months: 84, amount: 9801, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 234975,
            remainingBalance: 704925,
            monthlyPayments: [
              { months: 48, amount: 15849, interestRate: "1.98%" },
              { months: 60, amount: 13329, interestRate: "2.69%" },
              { months: 72, amount: 11547, interestRate: "2.99%" },
              { months: 84, amount: 10560, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 187980,
            remainingBalance: 751920,
            monthlyPayments: [
              { months: 48, amount: 17351, interestRate: "2.69%" },
              { months: 60, amount: 14343, interestRate: "2.89%" },
              { months: 72, amount: 12442, interestRate: "3.19%" },
              { months: 84, amount: 11326, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 140985,
            remainingBalance: 798915,
            monthlyPayments: [
              { months: 48, amount: 18701, interestRate: "3.09%" },
              { months: 60, amount: 15572, interestRate: "3.39%" },
              { months: 72, amount: 13486, interestRate: "3.59%" },
              { months: 84, amount: 12367, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 93990,
            remainingBalance: 845910,
            monthlyPayments: [
              { months: 48, amount: 20224, interestRate: "3.69%" },
              { months: 60, amount: 16911, interestRate: "3.99%" },
              { months: 72, amount: 14773, interestRate: "4.29%" },
              { months: 84, amount: 13306, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 46995,
            remainingBalance: 892905,
            monthlyPayments: [
              { months: 48, amount: 21646, interestRate: "4.09%" },
              { months: 60, amount: 18148, interestRate: "4.39%" },
              { months: 72, amount: 15891, interestRate: "4.69%" },
              { months: 84, amount: 14343, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "sealion6-premium",
        name: "PREMIUM",
        price: 1039900,
        range: "",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 311970,
            remainingBalance: 727930,
            monthlyPayments: [
              { months: 48, amount: 16366, interestRate: "1.98%" },
              { months: 60, amount: 13618, interestRate: "2.45%" },
              { months: 72, amount: 11863, interestRate: "2.89%" },
              { months: 84, amount: 10844, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 259975,
            remainingBalance: 779925,
            monthlyPayments: [
              { months: 48, amount: 17535, interestRate: "1.98%" },
              { months: 60, amount: 14747, interestRate: "2.69%" },
              { months: 72, amount: 12776, interestRate: "2.99%" },
              { months: 84, amount: 11683, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 207980,
            remainingBalance: 831920,
            monthlyPayments: [
              { months: 48, amount: 19197, interestRate: "2.69%" },
              { months: 60, amount: 15869, interestRate: "2.89%" },
              { months: 72, amount: 13766, interestRate: "3.19%" },
              { months: 84, amount: 12531, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 155985,
            remainingBalance: 883915,
            monthlyPayments: [
              { months: 48, amount: 20691, interestRate: "3.09%" },
              { months: 60, amount: 17229, interestRate: "3.39%" },
              { months: 72, amount: 14921, interestRate: "3.59%" },
              { months: 84, amount: 13683, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 103990,
            remainingBalance: 935910,
            monthlyPayments: [
              { months: 48, amount: 22376, interestRate: "3.69%" },
              { months: 60, amount: 18710, interestRate: "3.99%" },
              { months: 72, amount: 16345, interestRate: "4.29%" },
              { months: 84, amount: 14722, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 51995,
            remainingBalance: 987905,
            monthlyPayments: [
              { months: 48, amount: 23948, interestRate: "4.09%" },
              { months: 60, amount: 20079, interestRate: "4.39%" },
              { months: 72, amount: 17582, interestRate: "4.69%" },
              { months: 84, amount: 15869, interestRate: "4.99%" },
            ],
          },
        ],
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
    imageWidth: 1200,
    imageHeight: 800,
    featuresTitle: "สุดขีดแห่งสมรรถนะ",    
    specs: {
      acceleration: "3.8 วินาที",
      range: "580 กิโลเมตร",
      drivetrain: "AWD",
      motor: "มอเตอร์ 390 กิโลวัตต์",
      battery: "82.56 กิโลวัตต์-ชั่วโมง",
      charging: "AC type 2 / DC CCS 2 (150 กิโลวัตต์)"
    },
    colors: [
      {
        name: "Cosmos Black",
        code: "#121212",
        image: "/images/seal-black.png",
      },
      {
        name: "Arctic Blue",
        code: "#0066FF",
        image: "/images/seal-blue.png",
      },
      {
        name: "Atlantis Grey",
        code: "#7A8391",
        image: "/images/seal-grey.png",
      },
      {
        name: "Galaxy White",
        code: "#F5F5F5",
        image: "/images/seal-white.png",
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
        range: "510 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 299970,
            remainingBalance: 699930,
            monthlyPayments: [
              { months: 48, amount: 15737, interestRate: "1.98%" },
              { months: 60, amount: 13095, interestRate: "2.45%" },
              { months: 72, amount: 11407, interestRate: "2.89%" },
              { months: 84, amount: 10426, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 249975,
            remainingBalance: 749925,
            monthlyPayments: [
              { months: 48, amount: 16861, interestRate: "1.98%" },
              { months: 60, amount: 14180, interestRate: "2.69%" },
              { months: 72, amount: 12284, interestRate: "2.99%" },
              { months: 84, amount: 11234, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 199980,
            remainingBalance: 799920,
            monthlyPayments: [
              { months: 48, amount: 18458, interestRate: "2.69%" },
              { months: 60, amount: 15250, interestRate: "2.89%" },
              { months: 72, amount: 13236, interestRate: "3.19%" },
              { months: 84, amount: 12049, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 149985,
            remainingBalance: 849915,
            monthlyPayments: [
              { months: 48, amount: 19895, interestRate: "3.09%" },
              { months: 60, amount: 16556, interestRate: "3.39%" },
              { months: 72, amount: 14347, interestRate: "3.59%" },
              { months: 84, amount: 13156, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 99990,
            remainingBalance: 899910,
            monthlyPayments: [
              { months: 48, amount: 21515, interestRate: "3.69%" },
              { months: 60, amount: 17991, interestRate: "3.99%" },
              { months: 72, amount: 15716, interestRate: "4.29%" },
              { months: 84, amount: 14155, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 49995,
            remainingBalance: 949905,
            monthlyPayments: [
              { months: 48, amount: 23027, interestRate: "4.09%" },
              { months: 60, amount: 19307, interestRate: "4.39%" },
              { months: 72, amount: 16906, interestRate: "4.69%" },
              { months: 84, amount: 15258, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "premium",
        name: "Premium",        
        power: "230kW",        
        acceleration: "5.9 Sec",
        price: 1099900,
        range: "650 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 329970,
            remainingBalance: 769930,
            monthlyPayments: [
              { months: 48, amount: 17311, interestRate: "1.98%" },
              { months: 60, amount: 14404, interestRate: "2.45%" },
              { months: 72, amount: 12548, interestRate: "2.89%" },
              { months: 84, amount: 11469, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 274975,
            remainingBalance: 824925,
            monthlyPayments: [
              { months: 48, amount: 18547, interestRate: "1.98%" },
              { months: 60, amount: 15598, interestRate: "2.69%" },
              { months: 72, amount: 13513, interestRate: "2.99%" },
              { months: 84, amount: 12357, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 219980,
            remainingBalance: 879920,
            monthlyPayments: [
              { months: 48, amount: 20304, interestRate: "2.69%" },
              { months: 60, amount: 16784, interestRate: "2.89%" },
              { months: 72, amount: 14560, interestRate: "3.19%" },
              { months: 84, amount: 13254, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 164985,
            remainingBalance: 934915,
            monthlyPayments: [
              { months: 48, amount: 21885, interestRate: "3.09%" },
              { months: 60, amount: 18223, interestRate: "3.39%" },
              { months: 72, amount: 15782, interestRate: "3.59%" },
              { months: 84, amount: 14472, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 109990,
            remainingBalance: 989910,
            monthlyPayments: [
              { months: 48, amount: 23667, interestRate: "3.69%" },
              { months: 60, amount: 19790, interestRate: "3.99%" },
              { months: 72, amount: 17288, interestRate: "4.29%" },
              { months: 84, amount: 15571, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 54995,
            remainingBalance: 1044905,
            monthlyPayments: [
              { months: 48, amount: 25330, interestRate: "4.09%" },
              { months: 60, amount: 21238, interestRate: "4.39%" },
              { months: 72, amount: 18596, interestRate: "4.69%" },
              { months: 84, amount: 16784, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "performance",
        name: "Performance AWD",
        power: "390kW",        
        acceleration: "3.8 Sec",
        price: 1199900,
        range: "580 KM",
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
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 359970,
            remainingBalance: 839930,
            monthlyPayments: [
              { months: 48, amount: 18884, interestRate: "1.98%" },
              { months: 60, amount: 15714, interestRate: "2.45%" },
              { months: 72, amount: 13689, interestRate: "2.89%" },
              { months: 84, amount: 12512, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 299975,
            remainingBalance: 899925,
            monthlyPayments: [
              { months: 48, amount: 20233, interestRate: "1.98%" },
              { months: 60, amount: 17016, interestRate: "2.69%" },
              { months: 72, amount: 14741, interestRate: "2.99%" },
              { months: 84, amount: 13481, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 239980,
            remainingBalance: 959920,
            monthlyPayments: [
              { months: 48, amount: 22150, interestRate: "2.69%" },
              { months: 60, amount: 18310, interestRate: "2.89%" },
              { months: 72, amount: 15884, interestRate: "3.19%" },
              { months: 84, amount: 14481, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 179985,
            remainingBalance: 1019915,
            monthlyPayments: [
              { months: 48, amount: 23875, interestRate: "3.09%" },
              { months: 60, amount: 19880, interestRate: "3.39%" },
              { months: 72, amount: 17217, interestRate: "3.59%" },
              { months: 84, amount: 15788, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 119990,
            remainingBalance: 1079910,
            monthlyPayments: [
              { months: 48, amount: 25819, interestRate: "3.69%" },
              { months: 60, amount: 21589, interestRate: "3.99%" },
              { months: 72, amount: 18859, interestRate: "4.29%" },
              { months: 84, amount: 16987, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 59995,
            remainingBalance: 1139905,
            monthlyPayments: [
              { months: 48, amount: 27633, interestRate: "4.09%" },
              { months: 60, amount: 23169, interestRate: "4.39%" },
              { months: 72, amount: 20287, interestRate: "4.69%" },
              { months: 84, amount: 18310, interestRate: "4.99%" },
            ],
          },
        ],
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
  },  
  {
    id: 5,
    name: "NEW BYD ATTO 3",
    slug: "byd-atto-3",
    description: "SUV ไฟฟ้ากะทัดรัด สมรรถนะโดดเด่น เหมาะกับทุกการขับขี่",
    price: 899900,
    imageUrlPromo: "/images/motor-show-promo/atto3.jpg",
    imageUrlModel: "/images/models/BYD-Atto3.webp",
    imageWidth: 1200,
    imageHeight: 800,
    variants: [
      {
        id: "atto3-extended",
        name: "EXTENDED 480KM",
        price: 899900,
        range: "480 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 269970,
            remainingBalance: 629930,
            monthlyPayments: [
              { months: 48, amount: 14163, interestRate: "1.98%" },
              { months: 60, amount: 11785, interestRate: "2.45%" },
              { months: 72, amount: 10266, interestRate: "2.89%" },
              { months: 84, amount: 9384, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 224975,
            remainingBalance: 674925,
            monthlyPayments: [
              { months: 48, amount: 15175, interestRate: "1.98%" },
              { months: 60, amount: 12762, interestRate: "2.69%" },
              { months: 72, amount: 11056, interestRate: "2.99%" },
              { months: 84, amount: 10110, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 179980,
            remainingBalance: 719920,
            monthlyPayments: [
              { months: 48, amount: 16612, interestRate: "2.69%" },
              { months: 60, amount: 13732, interestRate: "2.89%" },
              { months: 72, amount: 11913, interestRate: "3.19%" },
              { months: 84, amount: 10844, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 134985,
            remainingBalance: 764915,
            monthlyPayments: [
              { months: 48, amount: 17905, interestRate: "3.09%" },
              { months: 60, amount: 14909, interestRate: "3.39%" },
              { months: 72, amount: 12912, interestRate: "3.59%" },
              { months: 84, amount: 11841, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 89990,
            remainingBalance: 809910,
            monthlyPayments: [
              { months: 48, amount: 19364, interestRate: "3.69%" },
              { months: 60, amount: 16191, interestRate: "3.99%" },
              { months: 72, amount: 14144, interestRate: "4.29%" },
              { months: 84, amount: 12740, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 44995,
            remainingBalance: 854905,
            monthlyPayments: [
              { months: 48, amount: 20724, interestRate: "4.09%" },
              { months: 60, amount: 17376, interestRate: "4.39%" },
              { months: 72, amount: 15215, interestRate: "4.69%" },
              { months: 84, amount: 13732, interestRate: "4.99%" },
            ],
          },
        ],
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
    imageWidth: 1200,
    imageHeight: 800,

    variants: [
      {
        id: "dolphin-standard",
        name: "STANDARD RANGE 435KM",
        price: 569900,
        range: "435 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 170970,
            remainingBalance: 398930,
            monthlyPayments: [
              { months: 48, amount: 8969, interestRate: "1.98%" },
              { months: 60, amount: 7463, interestRate: "2.45%" },
              { months: 72, amount: 6501, interestRate: "2.89%" },
              { months: 84, amount: 5943, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 142475,
            remainingBalance: 427425,
            monthlyPayments: [
              { months: 48, amount: 9610, interestRate: "1.98%" },
              { months: 60, amount: 8082, interestRate: "2.69%" },
              { months: 72, amount: 7001, interestRate: "2.99%" },
              { months: 84, amount: 6403, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 113980,
            remainingBalance: 455920,
            monthlyPayments: [
              { months: 48, amount: 10520, interestRate: "2.69%" },
              { months: 60, amount: 8697, interestRate: "2.89%" },
              { months: 72, amount: 7544, interestRate: "3.19%" },
              { months: 84, amount: 6868, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 85485,
            remainingBalance: 484415,
            monthlyPayments: [
              { months: 48, amount: 11339, interestRate: "3.09%" },
              { months: 60, amount: 9442, interestRate: "3.39%" },
              { months: 72, amount: 8177, interestRate: "3.59%" },
              { months: 84, amount: 7499, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 56990,
            remainingBalance: 512910,
            monthlyPayments: [
              { months: 48, amount: 12263, interestRate: "3.69%" },
              { months: 60, amount: 10254, interestRate: "3.99%" },
              { months: 72, amount: 8957, interestRate: "4.29%" },
              { months: 84, amount: 8068, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 28495,
            remainingBalance: 541405,
            monthlyPayments: [
              { months: 48, amount: 13125, interestRate: "4.09%" },
              { months: 60, amount: 11004, interestRate: "4.39%" },
              { months: 72, amount: 9636, interestRate: "4.69%" },
              { months: 84, amount: 8697, interestRate: "4.99%" },
            ],
          },
        ],
      },
      {
        id: "dolphin-extended",
        name: "EXTENDED RANGE 490KM",
        price: 709900,
        range: "490 KM",
        downPaymentOptions: [
          {
            percentage: 30,
            amount: 212970,
            remainingBalance: 496930,
            monthlyPayments: [
              { months: 48, amount: 11173, interestRate: "1.98%" },
              { months: 60, amount: 9297, interestRate: "2.45%" },
              { months: 72, amount: 8099, interestRate: "2.89%" },
              { months: 84, amount: 7402, interestRate: "3.59%" },
            ],
          },
          {
            percentage: 25,
            amount: 177475,
            remainingBalance: 532425,
            monthlyPayments: [
              { months: 48, amount: 11971, interestRate: "1.98%" },
              { months: 60, amount: 10067, interestRate: "2.69%" },
              { months: 72, amount: 8721, interestRate: "2.99%" },
              { months: 84, amount: 7976, interestRate: "3.69%" },
            ],
          },
          {
            percentage: 20,
            amount: 141980,
            remainingBalance: 567920,
            monthlyPayments: [
              { months: 48, amount: 13105, interestRate: "2.69%" },
              { months: 60, amount: 10833, interestRate: "2.89%" },
              { months: 72, amount: 9397, interestRate: "3.19%" },
              { months: 84, amount: 8555, interestRate: "3.79%" },
            ],
          },
          {
            percentage: 15,
            amount: 106485,
            remainingBalance: 603415,
            monthlyPayments: [
              { months: 48, amount: 14125, interestRate: "3.09%" },
              { months: 60, amount: 11762, interestRate: "3.39%" },
              { months: 72, amount: 10186, interestRate: "3.59%" },
              { months: 84, amount: 9341, interestRate: "4.29%" },
            ],
          },
          {
            percentage: 10,
            amount: 70990,
            remainingBalance: 638910,
            monthlyPayments: [
              { months: 48, amount: 15275, interestRate: "3.69%" },
              { months: 60, amount: 12773, interestRate: "3.99%" },
              { months: 72, amount: 11158, interestRate: "4.29%" },
              { months: 84, amount: 10050, interestRate: "4.59%" },
            ],
          },
          {
            percentage: 5,
            amount: 35495,
            remainingBalance: 674405,
            monthlyPayments: [
              { months: 48, amount: 16349, interestRate: "4.09%" },
              { months: 60, amount: 13707, interestRate: "4.39%" },
              { months: 72, amount: 12003, interestRate: "4.69%" },
              { months: 84, amount: 10833, interestRate: "4.99%" },
            ],
          },
        ],
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










