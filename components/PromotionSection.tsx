"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { ModelPromoCard } from "@/components/ui/ModelPromoCard";
import { defaultModels } from "@/data/carModel";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export function PromotionSection() {
	return (
		<motion.section
			className="py-16 md:py-24 relative overflow-hidden"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			viewport={{ once: true }}
		>
			{/* Subtle background gradient */}
			<div className="absolute inset-0 opacity-5 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

			<div className="container mx-auto px-4 md:px-6 relative">
				<motion.div
					className="relative z-20 w-full"
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<Swiper
						className="pb-8 w-full px-4"
						modules={[A11y, Autoplay, Navigation]}
						spaceBetween={24}
						slidesPerView={1}
						grabCursor={true}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
							pauseOnMouseEnter: true,
						}}
						navigation={{
							prevEl: ".swiper-button-prev",
							nextEl: ".swiper-button-next",
						}}
						breakpoints={{
							640: {
								slidesPerView: 2,
								spaceBetween: 24,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 28,
							},
							1280: {
								slidesPerView: 3,
								spaceBetween: 32,
							},
						}}
					>
						{defaultModels.map((model) => (
							<SwiperSlide
								key={model.id}
								className="h-[400px] sm:h-[450px] md:h-[500px] py-4"
							>
								<motion.div
									className="h-full w-full transition-all duration-300 rounded-xl overflow-hidden"
									whileHover={{
										y: -8,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
									}}
								>
									<ModelPromoCard model={model} />
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</div>
		</motion.section>
	);
}
