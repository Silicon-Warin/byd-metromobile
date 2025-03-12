import { useRef } from "react";
import Image from "next/image";

const services = [
	{
		title: "บริการหลังการขาย",
		description: "การดูแลและบำรุงรักษารถยนต์ไฟฟ้า BYD ของคุณ",
		icon: "/images/services/service.png",
	},
	{
		title: "สถานีชาร์จไฟฟ้า",
		description: "เครือข่ายสถานีชาร์จที่ครอบคลุมทั่วประเทศ",
		icon: "/images/services/charging.png",
	},
	{
		title: "ประกันภัยรถยนต์",
		description: "แผนประกันภัยที่ครอบคลุมสำหรับรถยนต์ไฟฟ้า",
		icon: "/images/services/insurance.png",
	},
	{
		title: "บริการฉุกเฉิน",
		description: "ความช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง",
		icon: "/images/services/emergency.png",
	},
];

export const ServiceCarousel = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = 300;
			scrollContainerRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="relative">
			<div
				ref={scrollContainerRef}
				className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide"
			>
				{services.map((service, index) => (
					<div
						key={index}
						className="min-w-[300px] bg-white rounded-lg shadow-lg p-6 snap-center"
					>
						<div className="w-16 h-16 mb-4 relative">
							<Image
								src={service.icon}
								alt={service.title}
								fill
								className="object-contain"
							/>
						</div>
						<h3 className="text-xl font-bold mb-2">{service.title}</h3>
						<p className="text-gray-600">{service.description}</p>
					</div>
				))}
			</div>
			<button
				onClick={() => scroll("left")}
				className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
			>
				←
			</button>
			<button
				onClick={() => scroll("right")}
				className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
			>
				→
			</button>
		</div>
	);
};
