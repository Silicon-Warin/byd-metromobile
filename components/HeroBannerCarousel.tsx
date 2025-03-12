import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { BannerData } from "@/types/BannerData";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface HeroBannerCarouselProps {
	banners: BannerData[];
}

export const HeroBannerCarousel = ({ banners }: HeroBannerCarouselProps) => {
	const [imageError, setImageError] = useState<Record<number, boolean>>({});
	const isMobile = useMediaQuery("(max-width: 768px)");
	const isTablet = useMediaQuery("(max-width: 1024px)");

	return (
		<Carousel
			className="relative w-full"
			opts={{
				align: "start",
				loop: true,
			}}
		>
			<CarouselContent>
				{banners.map((banner) => (
					<CarouselItem key={banner.id}>
						<div
							className={`relative w-full ${
								isMobile ? "h-[60vh]" : isTablet ? "h-[70vh]" : "h-[100vh]"
							}`}
						>
							<Image
								src={
									imageError[banner.id]
										? "/images/placeholder.jpg"
										: banner.imageUrl
								}
								alt={banner.alt}
								fill
								className="object-contain"
								priority={banner.id === 1}
								quality={75}
								onError={() =>
									setImageError((prev) => ({ ...prev, [banner.id]: true }))
								}
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
							/>
							{(banner.title || banner.description) && (
								<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
									{banner.title && (
										<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
											{banner.title}
										</h2>
									)}
									{banner.description && (
										<p className="text-base md:text-lg lg:text-xl">
											{banner.description}
										</p>
									)}
								</div>
							)}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-2 md:left-4 z-20" />
			<CarouselNext className="absolute right-2 md:right-4 z-20" />
		</Carousel>
	);
};
