"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Feature {
	title: string;
	description: string;
	image: string;
}

interface FeatureShowcaseProps {
	title: string;
	features: Feature[];
}

export default function FeatureShowcase({
	title,
	features,
}: FeatureShowcaseProps) {
	return (
		<section className="py-20 bg-gradient-to-b from-richblack to-black">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold mb-12 text-center">{title}</h2>

				<Swiper
					modules={[Navigation]}
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
					{features.map((feature, index) => (
						<SwiperSlide key={index}>
							<div className="bg-gray-900 rounded-lg overflow-hidden h-[500px] relative">
								<Image
									src={feature.image || "/placeholder.svg"}
									alt={feature.title}
									fill
									className="object-cover"
								/>
								<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
									<h3 className="text-lg text-gray-400">{feature.title}</h3>
									<p className="text-2xl font-semibold">
										{feature.description}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
