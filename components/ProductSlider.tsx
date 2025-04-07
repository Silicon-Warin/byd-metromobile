"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

interface ProductItem {
	id: string;
	name: string;
	imageUrl: string;
	description?: string;
}

interface ProductSliderProps {
	items: ProductItem[];
	onItemClick: (item: ProductItem) => void;
	buttonText?: string;
}

export function ProductSlider({
	items,
	onItemClick,
	buttonText = "Order Now",
}: ProductSliderProps) {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	return (
		<div className="relative w-full md:w-4/5 mx-auto px-4">
			<div className="overflow-visible">
				<Swiper
					modules={[FreeMode]}
					freeMode={true}
					spaceBetween={20}
					slidesPerView={1.2}
					breakpoints={{
						640: { slidesPerView: 2.2 },
						1024: { slidesPerView: 3.2 },
					}}
					onSwiper={setSwiper}
					className="!overflow-visible"
				>
					{items.map((item) => (
						<SwiperSlide key={item.id} className="!overflow-visible">
							<ProductCard
								item={item}
								onClick={() => onItemClick(item)}
								buttonText={buttonText}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="flex justify-center gap-4 mt-8">
				<Button
					variant="outline"
					size="icon"
					className="rounded-full border-gray-800 bg-black/50 hover:bg-white/10 text-white h-10 w-10 z-10 nav-button"
					onClick={() => swiper?.slidePrev()}
				>
					<ChevronLeft className="h-5 w-5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="rounded-full border-gray-800 bg-black/50 hover:bg-white/10 text-white h-10 w-10 z-10 nav-button"
					onClick={() => swiper?.slideNext()}
				>
					<ChevronRight className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}

interface ProductCardProps {
	item: ProductItem;
	onClick: () => void;
	buttonText: string;
	description?: string;
}

function ProductCard({
	item,
	onClick,
	buttonText,
	description,
}: ProductCardProps) {
	return (
		<div className="max-w-sm w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(40,40,40,0.70)] shadow-[0_0_15px_rgba(100,100,100,0.15),0_0_30px_rgba(100,100,100,0.1)] group overflow-hidden h-[400px] flex flex-col transition-all duration-300 hover:shadow-[0_0_20px_rgba(150,150,150,0.3),0_0_40px_rgba(150,150,150,0.2)]">
			<div className="p-6">
				<h3 className="text-lg font-semibold text-white">{item.name}</h3>
			</div>
			<div className="flex-1 relative p-4 flex items-center justify-center">
				<div className="relative w-full aspect-[4/3] overflow-hidden">
					<Image
						src={item.imageUrl || "/placeholder.svg"}
						alt={item.name}
						fill
						className="object-contain"
					/>
				</div>
			</div>
			{description && (
				<p className="text-sm font-normaltext-neutral-400 px-6">
					{description}
				</p>
			)}
			<div className="p-4">
				<Button
					variant="outline"
					className="w-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
					onClick={onClick}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
}
