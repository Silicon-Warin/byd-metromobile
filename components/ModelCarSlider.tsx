"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { defaultModels } from "@/data/Model";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function ModelCarSlider() {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	return (
		<section className="py-16 bg-none text-white overflow-visible">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center"
				>
					<div className="flex items-baseline justify-center gap-3">
						<h2 className="text-4xl md:text-5xl font-bold">Models.</h2>
						<p className="text-xl text-gray-400">Build your dreams.</p>
					</div>
				</motion.div>

				<div className="relative">
					<Swiper
						modules={[Navigation]}
						spaceBetween={20}
						slidesPerView={1.2}
						centeredSlides={true}
						loop={false}
						navigation={{
							prevEl: prevRef.current,
							nextEl: nextRef.current,
						}}
						pagination={{
							clickable: true,
							el: ".swiper-pagination",
							type: "bullets",
						}}
						onInit={(swiper) => {
							// @ts-ignore
							swiper.params.navigation.prevEl = prevRef.current;
							// @ts-ignore
							swiper.params.navigation.nextEl = nextRef.current;
							swiper.navigation.init();
							swiper.navigation.update();
						}}
						breakpoints={{
							640: {
								slidesPerView: 2.2,
							},
							1024: {
								slidesPerView: 3.2,
							},
							1280: {
								slidesPerView: 4.2,
							},
						}}
						className="!overflow-visible"
					>
						{defaultModels.map((model) => (
							<SwiperSlide key={model.id} className="h-auto">
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
									className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden h-full"
								>
									<div className="p-6 pb-3">
										<div className="mb-1">
											<h3 className="text-lg font-medium text-gray-400">
												BYD {model.name.toUpperCase()}
											</h3>
										</div>

										<Link
											href="#"
											className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center"
										>
											Learn more <ChevronRight className="h-3 w-3 ml-1" />
										</Link>
									</div>

									<div className="relative aspect-[16/10] mt-2">
										<img
											src={model.imageUrlModel || "/placeholder.svg"}
											alt={`BYD ${model.name}`}
											className="w-full h-full object-cover"
										/>
									</div>

									<div className="p-4">
										<button className="w-full py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
											Order Now
										</button>
									</div>
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
