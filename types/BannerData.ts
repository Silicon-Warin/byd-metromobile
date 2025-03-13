export interface BannerData {
  id?: number; // หรือ string ขึ้นอยู่กับประเภทของ id
  imageUrl: string;
  alt: string;
  title?: string;
  description?: string;
}

export const defaultBanners: BannerData[] = [
  {
    id: 1,
    imageUrl: "/images/banners/hero-1.jpg",
    alt: "BYD Hero 1",
  },
  {
    id: 2,
    imageUrl: "/images/banners/hero-2.jpg",
    alt: "BYD Hero 2",
  },
  {
    id: 3,
    imageUrl: "/images/banners/hero-3.jpg",
    alt: "BYD Hero 3",
  },
];
