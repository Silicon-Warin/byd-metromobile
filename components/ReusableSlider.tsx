"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// กำหนด Type สำหรับข้อมูลของแต่ละสไลด์
interface SliderItem {
	id: string;
	name: string;
	imageUrl: string;
}

// กำหนด Props ของคอมโพเนนต์
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
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	return (
		<div className="relative w-3/5 mx-auto">
			<div className="swiper-container overflow-visible">
				<Swiper
					modules={[Navigation, A11y]}
					freeMode={true}
					spaceBetween={20}
					slidesPerView="auto"
					className="!overflow-visible"
					initialSlide={0}
					centeredSlides={true}
					loop={false}
					onSwiper={(swiper) => {
						setSwiper(swiper);
						if (prevRef.current && nextRef.current) {
							if (swiper.params.navigation) {
								(swiper.params.navigation as any).prevEl = prevRef.current;
								(swiper.params.navigation as any).nextEl = nextRef.current;
							}
							swiper.navigation.init();
							swiper.navigation.update();
						}
					}}
				>
					{items.map((item) => (
						<SwiperSlide
							className="!w-[350px] sm:!w-[280px] !h-auto"
							key={item.id}
						>
							<div className="bg-gradient-to-b from-blue-950/80 to-blue-950/40 rounded-lg overflow-hidden border border-blue-900/50 h-full flex flex-col">
								<div className="p-6">
									<h3 className="text-lg font-bold mb-1">{item.name}</h3>
								</div>

								<div className="flex-1 relative p-4">
									<Image
										src={item.imageUrl || "/placeholder.svg"}
										alt={item.name}
										width={300}
										height={200}
										className="w-full h-full object-contain"
									/>
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

			{/* ปุ่มนำทาง */}
			<div className="flex justify-end gap-2 mt-4">
				<Button
					ref={prevRef}
					variant="outline"
					size="icon"
					className="rounded-full border-blue-900 bg-blue-950/50 hover:bg-blue-900/50 text-white h-10 w-10"
				>
					<ChevronLeft className="h-5 w-5" />
				</Button>
				<Button
					ref={nextRef}
					variant="outline"
					size="icon"
					className="rounded-full border-blue-900 bg-blue-950/50 hover:bg-blue-900/50 text-white h-10 w-10"
				>
					<ChevronRight className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}
