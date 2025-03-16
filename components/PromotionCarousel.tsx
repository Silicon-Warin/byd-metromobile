import { useEffect, useState, useRef } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { BannerData } from "@/types/BannerData";
import { type CarouselApi } from "@/components/ui/carousel";

interface PromotionCarouselProps {
	banners: BannerData[];
	autoplayInterval?: number;
	pauseOnHover?: boolean;
	navbarHeight?: number; // เพิ่ม prop สำหรับความสูงของ navbar
}

export const PromotionCarousel = ({
	banners,
	autoplayInterval = 5000,
	pauseOnHover = true,
	navbarHeight = 80, // ค่าเริ่มต้นสำหรับความสูงของ navbar
}: PromotionCarouselProps) => {
	const [api, setApi] = useState<CarouselApi>();
	const [isPaused, setIsPaused] = useState(false);
	const intervalRef = useRef<number | null>(null);

	// สร้าง default banners ถ้าไม่มีข้อมูล
	const carouselBanners =
		banners.length > 0
			? banners
			: Array.from({ length: 3 }, (_, i) => ({
					id: i + 1,
					imageUrl: `/images/banners/hero-${i + 1}.jpg`,
					alt: `Hero banner ${i + 1}`,
					title: "",
					description: "",
			  }));

	// Function สำหรับการเลื่อนรูปอัตโนมัติ
	const startAutoplay = () => {
		if (intervalRef.current) window.clearInterval(intervalRef.current);
		if (!api || autoplayInterval <= 0) return;

		intervalRef.current = window.setInterval(() => {
			if (!isPaused) api.scrollNext();
		}, autoplayInterval);
	};

	// ตั้งค่า autoplay
	useEffect(() => {
		startAutoplay();

		return () => {
			if (intervalRef.current) window.clearInterval(intervalRef.current);
		};
	}, [api, isPaused, autoplayInterval]);

	// จัดการ events
	const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
	const handleMouseLeave = () => pauseOnHover && setIsPaused(false);

	return (
		<section
			aria-label="Featured banners"
			className="w-full"
			style={{ paddingTop: `${navbarHeight}px` }}
		>
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full"
				setApi={setApi}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<CarouselContent>
					{carouselBanners.map((banner, index) => (
						<CarouselItem
							key={banner.id || `banner-${index}`}
							className="w-full h-auto"
							role=""
							aria-roledescription="slide"
							aria-label={`${index + 1} of ${carouselBanners.length}`}
						>
							<div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden rounded-lg">
								<Image
									src={banner.imageUrl}
									alt={banner.alt || `Banner image ${index + 1}`}
									fill
									sizes="100vw"
									className="object-contain"
									priority={index === 0}
									loading={index === 0 ? "eager" : "lazy"}
								/>
								{banner.title && (
									<div
										className="absolute bottom-0 w-full bg-black/50 p-4 text-white"
										aria-hidden="false"
									>
										<h3 className="text-lg font-bold">{banner.title}</h3>
										{banner.description && (
											<p className="text-sm">{banner.description}</p>
										)}
									</div>
								)}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="flex justify-center gap-2 mt-4">
					<CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black" />
					<CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black" />
				</div>
			</Carousel>
		</section>
	);
};
