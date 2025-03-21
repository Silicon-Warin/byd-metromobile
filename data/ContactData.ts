export interface Branch {
  name: string;
  phone: string;
  mapUrl: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

export const branches: Branch[] = [
  {
    name: "สาขาพระราม 3",
    phone: "02-291-8889",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.2497911530595!2d100.511054!3d13.6898373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2sBYD%20Metromobile%20Rama%203!5e0!3m2!1sen!2sth!4vYOUR_GENERATED_CODE",
  },
  {
    name: "สาขาตลิ่งชัน",
    phone: "02-448-3999",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.6495454285115!2d100.40893499999999!3d13.776053000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2sBYD%20Metromobile!5e0!3m2!1sen!2sth!4v1710217344285!5m2!1sen!2sth",
  },
  {
    name: "สาขาอ่อนนุช",
    phone: "080-416-1888",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8771825118584!2d100.70593!3d13.722032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d613e36f67bc3%3A0xc752c7b40c6b573!2zQllEIE1ldHJvbW9iaWxlIOC4reC5iOC4reC4meC4meC4uOC4iA!5e0!3m2!1sen!2sth!4v1710217460636!5m2!1sen!2sth",
  },
  {
    name: "สาขารามอินทรา กม.9",
    phone: "081-665-6888",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.343180311472!2d100.66649121169309!3d13.832594395359672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6300152470d1%3A0xb40e702132cf177a!2zQllEIOC4o-C4suC4oeC4reC4tOC4meC4l-C4o-C4siDguIHguKEuOSDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1741852565855!5m2!1sth!2sth",
  },
];

export const socialMedia = [
  {
    platform: 'line' as const,
    url: 'https://line.me/R/ti/p/%40bydmetromobile',
  },
  {
    platform: 'facebook' as const,
    url: 'https://www.facebook.com/BYDBANGKOK',
  },
  {
    platform: 'instagram' as const,
    url: 'https://www.instagram.com/byd.metromobile',
  },
  {
    platform: 'tiktok' as const,
    url: 'https://www.tiktok.com/@byd_metromobile',
  },
];

export const contactInfo = {
  email: "bydmetromobile@gmail.com",
  businessHours: "วันจันทร์ - อาทิตย์ : 8:30 - 17:30 น.",
  companyName: "BYD Metromobile",
  description: "ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
};
