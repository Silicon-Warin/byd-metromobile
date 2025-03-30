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

interface SliderItem {
	id: string;
	name: string;
	imageUrl: string;
}

interface ReusableSliderProps {
	items: SliderItem[];
	onItemClick: (item: SliderItem) => void;
	buttonText?: string;
}

export function ReusableSlider({
	items,
	onItemClick,
	buttonText = "Order Now",
}: ReusableSliderProps) {
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
							<div className="glass-effect rounded-lg overflow-hidden h-[400px] flex flex-col">
								<div className="p-6">
									<h3 className="text-lg font-bold mb-1">{item.name}</h3>
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
								<div className="p-4">
									<Button
										variant="outline"
										className="w-full bg-white text-black hover:bg-gray-100 border-0 rounded-full"
										onClick={() => onItemClick(item)}
									>
										{buttonText}
									</Button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="flex justify-center gap-4 mt-8">
				<Button
					variant="outline"
					size="icon"
					className="rounded-full border-gray-800 bg-black/50 hover:bg-white/10 text-white h-10 w-10 z-10"
					onClick={() => swiper?.slidePrev()}
				>
					<ChevronLeft className="h-5 w-5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="rounded-full border-gray-800 bg-black/50 hover:bg-white/10 text-white h-10 w-10 z-10"
					onClick={() => swiper?.slideNext()}
				>
					<ChevronRight className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}
