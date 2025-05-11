import React from "react";
import Image from "next/image";
import { CarModel } from "@/data/carModel"; // สมมติว่ามีการกำหนดประเภทของรถในไฟล์นี้
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// กำหนด Props type
interface ShowcaseSectionProps {
	carModel: CarModel;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ carModel }) => {
	return (
		<section
			id="showcase"
			className="py-20 bg-gradient-to-b from-background to-card"
		>
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-start">
					{carModel?.featuresTitle || "คุณสมบัติเด่น"}
				</h2>

				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={20}
					slidesPerView={1}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 5000 }}
					className="showcase-swiper"
				>
					{carModel?.features &&
						Array.isArray(carModel.features) &&
						carModel.features.map((feature: any, index: number) => (
							<SwiperSlide key={index}>
								<div className="bg-card rounded-lg overflow-hidden h-[500px] relative">
									<Image
										src={
											typeof feature === "object" && feature.image
												? feature.image
												: "/placeholder.svg"
										}
										alt={
											typeof feature === "object" && feature.title
												? feature.title
												: `Feature ${index + 1}`
										}
										fill
										className="object-cover"
									/>
									<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
										<h3 className="text-lg text-gray-400">
											{typeof feature === "object" && feature.title
												? feature.title
												: ""}
										</h3>
										<p className="text-2xl font-semibold">
											{typeof feature === "object" && feature.description
												? feature.description
												: feature}
										</p>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</section>
	);
};

export default ShowcaseSection;
