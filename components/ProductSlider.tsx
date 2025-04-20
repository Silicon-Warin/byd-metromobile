"use client";

import { useState } from "react";
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
		<div className="relative md:w-4/6 w-[90%] mx-auto px-2 h-auto">
			<div className="">
				<Swiper
					modules={[FreeMode]}
					freeMode={true}
					spaceBetween={20}
					slidesPerView={1.2}
					breakpoints={{
						640: { slidesPerView: 1.5 },
						768: { slidesPerView: 2.5 },
						1024: { slidesPerView: 2.5 },
						1280: { slidesPerView: 3.4 },
					}}
					onSwiper={setSwiper}
					className="!overflow-visible pb-8"
					slidesOffsetBefore={16}
				>
					{items.map((item) => (
						<SwiperSlide
							key={item.id}
							className="my-1 slider-card"
							style={{
								backgroundImage: `url("${
									item.imageUrl || "/placeholder.svg"
								}")`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div className="slider-card-bg">
								<div className="slider-card-top text-white">
									<div className="p-4">
										<h3 className="text-xl font-semibold">{item.name}</h3>
										<div className="mt-2">
											<a
												href="#"
												className="text-white text-sm hover:underline"
											>
												Learn more &gt;
											</a>
										</div>
									</div>
								</div>
								<div className="slider-card-bottom p-4 mt-auto">
									<button
										className="w-full bg-white hover:bg-white/90 text-black border-0 py-2 px-4 rounded-full font-medium"
										onClick={() => onItemClick(item)}
									>
										{buttonText}
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* <div className="flex justify-center gap-4 mt-8">
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
			</div> */}
		</div>
	);
}

export default ProductSlider;
