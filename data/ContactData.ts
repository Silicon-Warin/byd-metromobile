// ข้อมูลสาขาต่างๆ
export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;

  hours: string;
  mapUrl: string;
}

// ข้อมูลโซเชียลมีเดีย
export interface SocialMediaItem {
  platform: string;
  url: string;
  icon: string;
}

// ข้อมูลการติดต่อทั่วไป
export interface ContactInfo {
  email: string;
  phoneGeneral: string;  
  phoneService: string;
  lineOA: string;
  description?: string;
  businessHours?: string;
}

// สาขาต่างๆ
export const branches: Branch[] = [
  {
    id: "rama3",
    name: "สาขาพระราม 3",
    address: "455/2 ถนนพระรามที่ 3 แขวงบางโคล่ เขตบางคอแหลม กรุงเทพมหานคร 10120",
    phone: "02-291-8889",
    hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5153.486896161014!2d100.5110541!3d13.689837299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2z4Lia4Li14Lin4Liy4Lii4LiU4Li1IOC5gOC4oeC5guC4l-C4o-C5guC4oeC4muC4tOC4pQ!5e1!3m2!1sth!2sth!4v1742592177074!5m2!1sth!2sth"
  },
  {
    id: "talingchan",
    name: "สาขาตลิ่งชัน",
    address: "64 ถนนกาญจนาภิเษก แขวงบางระมาด เขตตลิ่งชัน กรุงเทพมหานคร 10170",
    phone: "02-448-3999",
    hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5151.592004551919!2d100.40635471169257!3d13.776058596673645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2zQllEIE1ldHJvbW9iaWxlIOC4leC4peC4tOC5iOC4h-C4iuC4seC4mSDguIHguLLguI3guIjguJnguLLguKDguLTguYDguKnguIE!5e1!3m2!1sth!2sth!4v1742592511147!5m2!1sth!2sth"
  },
  {
    id: "onnut",
    name: "สาขาอ่อนนุช",
    address: "909 เขตประเวศ กรุงเทพมหานคร 10250",
    phone: "080-416-1888",
    hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5151.592004551919!2d100.40635471169257!3d13.776058596673645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d615b2d3b94cb%3A0xc73c4c761889653!2zQllEIOC4reC5iOC4reC4meC4meC4uOC4iiAtIOC4peC4suC4lOC4geC4o-C4sOC4muC4seC4hyDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1742592419644!5m2!1sth!2sth"
  },
  {
    id: "ramindra",
    name: "สาขารามอินทรา กม.9",
    address: "591 ถ. รามอินทรา แขวงรามอินทรา เขตคันนายาว กรุงเทพมหานคร 10230",
    phone: "081-665-6888",
    hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.343180311472!2d100.66649121169309!3d13.832594395359672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6300152470d1%3A0xb40e702132cf177a!2zQllEIOC4o-C4suC4oeC4reC4tOC4meC4l-C4o-C4siDguIHguKEuOSDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1742592571020!5m2!1sth!2sth"
  }
];

// โซเชียลมีเดีย
export const socialMedia: SocialMediaItem[] = [
  {
    platform: "facebook",
    url: "https://facebook.com/bydbangkok",
    icon: "facebook"
  },
  {
    platform: "instagram",
    url: "https://instagram.com/bydbangkok",
    icon: "instagram"
  },
  {
    platform: "line",
    url: "https://line.me/ti/p/%40bydbangkok",
    icon: "line"
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@byd_metromobile",
    icon: "tiktok"
  }
];

// ข้อมูลการติดต่อทั่วไป
export const contactInfo: ContactInfo = {
  email: "bydmetromobile@gmail.com",
  phoneGeneral: "02-291-8889",
  phoneService: "02-045-8888",
  lineOA: "@bydmetromobile",
  description: "ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย",
  businessHours: "เปิดทำการทุกวัน: 08.30-17.30 น."
};
