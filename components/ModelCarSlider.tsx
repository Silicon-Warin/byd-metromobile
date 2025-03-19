"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { defaultModels } from "@/data/Model";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function ModelCarSlider() {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	return (
		<div className="relative">
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-2xl font-bold">
					Models. <span className="text-gray-400">Build your dreams.</span>
				</h2>
			</div>

			<div className="swiper-container overflow-visible">
				<Swiper
					modules={[Navigation, Pagination, A11y]}
					spaceBetween={20}
					slidesPerView="auto"
					className="!overflow-visible"
					initialSlide={0}
					centeredSlides={false}
					loop={false}
					onSwiper={setSwiper}
					navigation={{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}}
					pagination={{ clickable: true, el: ".swiper-pagination" }}
				>
					{defaultModels.map((car) => (
						<SwiperSlide className="!w-[350px] !h-auto" key={car.id}>
							<div className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 h-full flex flex-col">
								<div className="p-4 bg-gray-800">
									<h3 className="text-lg font-bold mb-1">{car.name}</h3>

									{/* 	<a
										href={car.learnMoreLink}
										className="text-xs text-primary hover:underline inline-block"
									>
										Learn more →
									</a> */}
								</div>

								<div className="flex-1 relative bg-gradient-to-b from-gray-800 to-gray-900 p-4">
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
										className="w-full border-gray-600 hover:bg-gray-700 text-white"
									>
										Order Now
									</Button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="swiper-pagination mt-6"></div>
			</div>
		</div>
	);
}
