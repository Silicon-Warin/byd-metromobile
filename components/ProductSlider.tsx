"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";

interface ProductItem {
	id: string;
	name: string;
	imageUrl: string;
	description?: string;
}

interface ProductSliderProps {
	items: ProductItem[];
	buttonText?: string;
}

export function ProductSlider({ items, buttonText }: ProductSliderProps) {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	return (
		<>
			<div className="relative w-[90%] md:w-[66%] mx-auto h-auto">
				<div className="swiper-container-wrapper">
					<Swiper
						modules={[FreeMode]}
						freeMode={{
							enabled: true,
							sticky: false,
							momentumRatio: 0.5,
						}}
						spaceBetween={15}
						slidesPerView={1.4}
						centeredSlides={false}
						breakpoints={{
							0: { slidesPerView: 1.2 },
							480: { slidesPerView: 1.3 },
							640: { slidesPerView: 1.4 },
							768: { slidesPerView: 1.5 },
							1024: { slidesPerView: 2.15 },
							1280: { slidesPerView: 3.2 },
						}}
						watchOverflow={true}
						loopAdditionalSlides={1}
						onSwiper={setSwiper}
						className="!overflow-visible pl-3"
						edgeSwipeDetection="prevent"
						preventInteractionOnTransition={true}
					>
						{items.map((item) => (
							<SwiperSlide
								key={item.id}
								className="my-1 model-card mr-4"
								style={{
									backgroundImage: `url("${
										item.imageUrl || "/placeholder.svg"
									}")`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div className="slider-card-bg flex flex-col h-full">
									<div className="slider-card-top text-white">
										<div className="p-4 md:p-8">
											<h3 className="text-md md:text-2xl font-semibold">
												{item.name}
											</h3>
											<div className="mt-2">
												<a
													href="#"
													className="text-white text-sm hover:underline"
												>
													Learn more &gt;
												</a>
											</div>
											<Button
												className="w-[calc(66%-2rem)] mt-4"
												variant="modern-dark"
												size="modern-md"
												asChild
											>
												<Link
													href="https://line.me/R/ti/p/%40bydmetromobile"
													target="_blank"
													rel="noopener noreferrer"
												>
													{buttonText}
												</Link>
											</Button>
										</div>
									</div>
									<div className="p-4 mt-auto flex justify-center"></div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			<div className="hidden md:flex justify-end gap-4 mt-8 pr-8">
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
		</>
	);
}

export default ProductSlider;
