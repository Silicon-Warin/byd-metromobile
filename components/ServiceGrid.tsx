"use client";

import Image from "next/image";

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
		description: "เครือข่ายสถานีชาร์จที่ครอบคลุม",
		imageUrl: "/images/services/service-2.jpg",
	},
	{
		id: "service-3",
		name: "ประกันภัยรถยนต์",
		description: "แผนประกันภัยที่ครอบคลุมและคุ้มค่า",
		imageUrl: "/images/services/service-3.jpg",
	},
	{
		id: "service-4",
		name: "บริการฉุกเฉิน 24/7",
		description: "ความช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง",
		imageUrl: "/images/services/service-4.jpg",
	},
];

export default function ServiceGrid() {
	return (
		<div className="page-container">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
				{services.map((service, i) => (
					<div
						key={service.id}
						className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-secondary shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-primary/20 hover:-translate-y-1 animate-on-scroll"
						style={{ animationDelay: `${i * 100}ms` }}
					>
						<Image
							src={service.imageUrl || "/placeholder.svg"}
							alt={service.name}
							fill
							priority={i < 2} // Preload first two images
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
							<h3 className="text-lg font-bold">{service.name}</h3>
							<p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/90">
								{service.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
