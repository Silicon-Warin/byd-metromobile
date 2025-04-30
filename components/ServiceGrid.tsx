"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

// รายการบริการที่เราจะแสดงผล
const services = [
	{
		id: "service-1",
		name: "บริการหลังการขาย",
		description: "การดูแลและบำรุงรักษาครบวงจร",
		imageUrl: "/images/services/service-1.jpg",
	},
	{
		id: "service-2",
		name: "สถานีชาร์จไฟฟ้า",
		description: "เครือข่ายสถานีชาร์จที่ครอบคลุมทั่วประเทศ",
		imageUrl: "/images/services/service-2.jpg",
	},
	{
		id: "service-3",
		name: "ประกันภัยรถยนต์",
		description: "แผนประกันภัยที่ครอบคลุมสำหรับรถยนต์ไฟฟ้า",
		imageUrl: "/images/services/service-3.jpg",
	},
	{
		id: "service-4",
		name: "บริการฉุกเฉิน",
		description: "ความช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง",
		imageUrl: "/images/services/service-4.jpg",
	},
];

export default function ServiceSlider() {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	const handleServiceClick = (service: {
		id: string;
		name: string;
		description: string;
		imageUrl: string;
	}) => {
		console.log("Service selected:", service.name);
		// ทำอะไรก็ตามเมื่อคลิกที่บริการ เช่น นำทางไปยังหน้ารายละเอียด
	};

	return (
		<div className="relative w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-full">
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
					{services.map((service) => (
						<SwiperSlide key={service.id} className="my-1 model-card mr-4">
							<div className="glass-effect rounded-lg overflow-hidden h-auto flex flex-col">
								<div className="relative aspect-square w-full ">
									<Image
										src={service.imageUrl || "/placeholder.svg"}
										alt={service.name}
										fill
										priority={service.id === "service-1"}
										className="object-contain transition-transform duration-500 hover:scale-105"
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
