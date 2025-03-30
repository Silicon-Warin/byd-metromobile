"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
	{
		title: "บริการหลังการขาย",
		description: "การดูแลและบำรุงรักษารถยนต์ไฟฟ้า BYD ของคุณ",
		icon: "/images/services/service-1.jpg",
	},
	{
		title: "สถานีชาร์จไฟฟ้า",
		description: "เครือข่ายสถานีชาร์จที่ครอบคลุมทั่วประเทศ",
		icon: "/images/services/service-2.jpg",
	},
	{
		title: "ประกันภัยรถยนต์",
		description: "แผนประกันภัยที่ครอบคลุมสำหรับรถยนต์ไฟฟ้า",
		icon: "/images/services/service-3.jpg",
	},
	{
		title: "บริการฉุกเฉิน",
		description: "ความช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง",
		icon: "/images/services/service-4.jpg",
	},
];

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

export const ServiceGrid = () => {
	return (
		<div className="relative py-8 px-4 md:px-8">
			{/* Modern grid layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
				{services.map((service, index) => (
					<motion.div
						key={index}
						variants={fadeIn}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="glass-effect rounded-xl overflow-hidden card-hover"
					>
						<div className="aspect-video w-full relative">
							<Image
								src={service.icon || "/placeholder.svg"}
								alt={service.title}
								fill
								className="object-cover transition-transform duration-500 hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
							<div className="absolute bottom-0 left-0 p-6 text-white">
								<h3 className="text-2xl font-bold mb-1">{service.title}</h3>
							</div>
						</div>

						<div className="p-6">
							<p className="text-gray-300 mb-4">{service.description}</p>
							<div className="flex justify-end">
								<button className="text-sm font-medium text-white hover:text-gray-300 transition-colors flex items-center gap-1">
									เรียนรู้เพิ่มเติม
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="ml-1"
									>
										<path d="M5 12h14"></path>
										<path d="m12 5 7 7-7 7"></path>
									</svg>
								</button>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};
