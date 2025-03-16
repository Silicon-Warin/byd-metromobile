import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ModelPromoCard } from "@/components/ui/ModelPromoCard";
import { defaultModels } from "@/types/Model";
import "swiper/css";

export function PromotionSection() {
	return (
		<section className="py-12 md:py-16 lg:py-20 bg-background text-foreground relative">
			<div className="container mx-auto">
				<div className="mb-8 flex items-baseline gap-3 px-4">
					<h2 className="text-3xl md:text-4xl font-bold">โปรโมชั่น</h2>
					<p className="text-xl text-gray-400">Build your dreams.</p>
				</div>
			</div>

			<div className="container mx-auto px-4">
				<div className="relative z-20 w-full">
					<Swiper
						className="pb-12 w-full"
						modules={[A11y]}
						spaceBetween={20}
						slidesPerView={1.2}
						centeredSlides={false}
						grabCursor={true}
						freeMode={true}
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
								<div className="h-full transition duration-500 overflow-visible transform hover:scale-[1.03] hover:-translate-y-2">
									<ModelPromoCard model={model} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
