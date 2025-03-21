"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCoverflow, Autoplay } from "swiper/modules";
import { ModelPromoCard } from "@/components/ui/ModelPromoCard";
import { defaultModels } from "@/data/carModel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";

export function PromotionSection() {
	return (
		<motion.section
			className="py-12 md:py-16 lg:py-20 bg-background text-foreground relative overflow-hidden"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}
		>
			{/* Background gradient elements */}
			<div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
			<div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30"></div>

			<div className="container mx-auto">
				<motion.div
					className="mb-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 px-4"
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className="flex flex-col gap-2 w-full h-full">
						<h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-200 ">
							โปรโมชั่น
						</h2>
						<p className="text-xl text-gray-400">Build your dreams.</p>
					</div>

					<a
						href="https://line.me/R/ti/p/@lineoa"
						target="_blank"
						rel="noopener noreferrer"
						className="self-start md:self-auto"
					>
						<Button className="bg-[#06C755] hover:bg-[#06C755]/90 text-white flex items-center gap-2 mt-4 md:mt-0">
							ขอรับข้อเสนอพิเศษ
						</Button>
					</a>
				</motion.div>
			</div>

			<div className="container mx-auto px-4">
				<motion.div
					className="relative z-20 w-full"
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					viewport={{ once: true }}
				>
					<Swiper
						className="pb-12 w-full"
						modules={[A11y, EffectCoverflow, Autoplay]}
						spaceBetween={20}
						slidesPerView={1.2}
						centeredSlides={false}
						grabCursor={true}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						effect="coverflow"
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: false,
						}}
						breakpoints={{
							640: {
								slidesPerView: 2.2,
							},
							1024: {
								slidesPerView: 3.2,
							},
						}}
					>
						{defaultModels.map((model, index) => (
							<SwiperSlide
								key={model.id}
								className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]"
								style={{ zIndex: 50 - index }}
							>
								<div className="h-full transition duration-500 overflow-visible transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
									<ModelPromoCard model={model} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</div>
		</motion.section>
	);
}
