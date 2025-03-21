"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { defaultModels } from "@/data/carModel";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import type { NavigationOptions } from "swiper/types";

export function ModelCarSlider() {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	return (
		<div className="relative w-4/5 mx-auto">
			<div className="mb-8">
				<h2 className="text-2xl font-bold">
					Models. <span className="text-gray-400">Build your dreams.</span>
				</h2>
			</div>

			<div className="swiper-container overflow-visible">
				<Swiper
					modules={[Navigation, A11y]}
					spaceBetween={20}
					slidesPerView="auto"
					className="!overflow-visible"
					initialSlide={0}
					centeredSlides={false}
					loop={false}
					onSwiper={(swiper) => {
						setSwiper(swiper);
						// Update swiper instance when navigation buttons are rendered
						if (prevRef.current && nextRef.current) {
							if (swiper.params.navigation) {
								(swiper.params.navigation as NavigationOptions).prevEl =
									prevRef.current;
								(swiper.params.navigation as NavigationOptions).nextEl =
									nextRef.current;
							}
							swiper.navigation.init();
							swiper.navigation.update();
						}
					}}
				>
					{defaultModels.map((car) => (
						<SwiperSlide className="!w-[350px] !h-auto" key={car.id}>
							<div className="bg-gradient-to-b from-blue-950/80 to-blue-950/40 rounded-lg overflow-hidden border border-blue-900/50 h-full flex flex-col">
								<div className="p-6">
									<h3 className="text-lg font-bold mb-1">{car.name}</h3>
								</div>

								<div className="flex-1 relative p-4">
									<Image
										src={car.imageUrlModel || "/placeholder.svg"}
										alt={car.name}
										width={300}
										height={200}
										className="w-full h-auto object-contain"
									/>
								</div>

								<div className="p-4">
									<Button
										variant="outline"
										className="w-full bg-white text-black hover:bg-gray-100 border-0 rounded-full"
									>
										Order Now
									</Button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Navigation arrows at the bottom right */}
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
