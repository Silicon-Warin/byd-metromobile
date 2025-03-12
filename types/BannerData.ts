export interface BannerData {
  id: number;
  imageUrl: string;
  alt: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const defaultBanners: BannerData[] = [
  {
    id: 1,
    imageUrl: "/images/hero-1.jpg",
    alt: "BYD Hero 1",
  },
  {
    id: 2,
    imageUrl: "/images/hero-2.jpg",
    alt: "BYD Hero 2",
  },
  {
    id: 3,
    imageUrl: "/images/hero-3.jpg",
    alt: "BYD Hero 3",
  },
];
