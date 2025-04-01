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
		<div className="relative py-8 px-4 md:px-8">
			<div className="relative w-full md:w-4/5 mx-auto">
				<div className="overflow-visible">
					<Swiper
						modules={[FreeMode]}
						freeMode={true}
						spaceBetween={20}
						slidesPerView={1.2}
						breakpoints={{
							640: { slidesPerView: 2.2 },
							1024: { slidesPerView: 3.2 },
						}}
						onSwiper={setSwiper}
						className="!overflow-visible"
					>
						{services.map((service) => (
							<SwiperSlide key={service.id} className="!overflow-visible">
								<div className="glass-effect rounded-lg overflow-hidden h-auto flex flex-col">
									<div className="relative aspect-square w-full overflow-visible">
										<Image
											src={service.imageUrl || "/placeholder.svg"}
											alt={service.name}
											fill
											priority={service.id === "service-1"}
											className="object-contain transition-transform duration-500 hover:scale-105"
										/>
										{/* Overlay gradient เพื่อเพิ่มความน่าสนใจ */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
										<div className="absolute bottom-0 left-0 p-4 text-white">
											<h3 className="text-xl font-bold mb-1">{service.name}</h3>
										</div>
									</div>
									<div className="p-4 flex">
										<p className="text-gray-300 mb-4">{service.description}</p>
									</div>
									<div className="p-4">
										<Button
											variant="outline"
											className="w-full bg-white/10 text-white hover:bg-white/20 border-0 rounded-full"
											onClick={() => handleServiceClick(service)}
										>
											เรียนรู้เพิ่มเติม
										</Button>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className="flex justify-center gap-4 mt-8">
					<Button
						variant="outline"
						size="icon"
						onClick={() => swiper?.slidePrev()}
					>
						<ChevronLeft className="h-5 w-5" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => swiper?.slideNext()}
					>
						<ChevronRight className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
