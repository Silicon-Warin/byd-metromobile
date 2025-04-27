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
	onItemClick: (item: ProductItem) => void;
	buttonText?: string;
}

export function ProductSlider({
	items,
	onItemClick,
	buttonText = "ทดลองขับ",
}: ProductSliderProps) {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	return (
		<>
			<div className="relative md:w-5/6 mx-auto px-0 h-auto mr-8">
				<Swiper
					modules={[FreeMode]}
					freeMode={true}
					spaceBetween={15}
					breakpoints={{
						640: { slidesPerView: 1.2 },
						768: { slidesPerView: 1.2 },
						1024: { slidesPerView: 2.2 },
						1280: { slidesPerView: 2.2 },
					}}
					onSwiper={setSwiper}
					className="!overflow-visible pb-8 "
					slidesOffsetBefore={0}
				>
					{items.map((item) => (
						<SwiperSlide
							key={item.id}
							className="my-1 model-card w-[321px] mr-8"
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
								<div className="p-4 mt-auto flex justify-end w-full">
									<Button className="btn-modern btn-modern-primary" asChild>
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
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="flex justify-center md:justify-end gap-4 mt-8 pr-8">
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
