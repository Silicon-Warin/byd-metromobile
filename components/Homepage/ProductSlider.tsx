"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestDriveButton from "../TestDriveButton";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";
import Image from "next/image";

interface ProductItem {
	id: string;
	name: string;
	imageUrl: string;
	description?: string;
	slug: string;
}

interface ProductSliderProps {
	items: ProductItem[];
	buttonText?: string;
}

export function ProductSlider({ items = [] }: ProductSliderProps) {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	return (
		<>
			<div className="relative w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-auto ">
				<div className="swiper-container-wrapper overflow-visible">
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
								className="my-1 model-card mr-4 relative aspect-[16/9] rounded-xl overflow-hidden"
							>
								<Image
									src={item.imageUrl}
									alt={item.name}
									className="w-full h-full object-cover"
									fill
									quality={75}
									priority
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>

								<div className="slider-card-bg flex flex-col h-full absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent">
									<div className="slider-card-top text-white">
										<div className="p-4 md:p-8">
											<h3 className="text-md md:text-2xl font-semibold">
												{item.name}
											</h3>
											<div className="mt-2">
												<Link
													href={`/models/${item.slug}`}
													className="text-white text-sm hover:underline"
												>
													Learn more &gt;
												</Link>
											</div>
											{/* ถ้า id เป็น 1 หรือ 2 ให้ใช้ outline variant ค่ะ */}
											<TestDriveButton
												size="lg"
												defaultModel={item.id}
												variant={
													item.id === "2" || item.id === "3"
														? "outline"
														: undefined
												}
												className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-6 text-lg"
											>
												<span className="flex items-center">จองทดลองขับ</span>
											</TestDriveButton>
										</div>
									</div>
									<div className="p-4 mt-auto flex justify-center"></div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
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
			</div>
		</>
	);
}

export default ProductSlider;
