import { useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { BannerData } from "@/types/BannerData";

interface HeroBannerCarouselProps {
	banners: BannerData[];
}

export const HeroBannerCarousel = ({ banners }: HeroBannerCarouselProps) => {
	// ✅ ใช้ useState ในระดับ Component
	const [errorStates, setErrorStates] = useState<boolean[]>(
		new Array(banners.length).fill(false)
	);

	// ✅ ฟังก์ชัน handleError เพื่อเปลี่ยนค่า error
	const handleError = (index: number) => {
		setErrorStates((prev) => {
			const newErrors = [...prev];
			newErrors[index] = true;
			return newErrors;
		});
	};

	return (
		<Carousel className="h-full w-full" opts={{ align: "start", loop: true }}>
			<CarouselContent>
				{banners.map((banner, index) => (
					<CarouselItem key={banner.id}>
						<div className="relative h-screen w-full">
							<Image
								src={
									errorStates[index]
										? "/images/placeholder.jpg"
										: banner.imageUrl
								}
								alt={banner.alt || "banner image"}
								fill
								className="object-contain"
								priority={index === 0}
								sizes="(max-width: 768px) 100vw, 100vw"
								quality={75}
								onError={() => handleError(index)} // ✅ ใช้ฟังก์ชันเพื่ออัพเดท error state
							/>
							{(banner.title || banner.description) && (
								<div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
									{banner.title && (
										<h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
									)}
									{banner.description && (
										<p className="text-xl">{banner.description}</p>
									)}
								</div>
							)}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-4 z-20" />
			<CarouselNext className="absolute right-4 z-20" />
		</Carousel>
	);
};
