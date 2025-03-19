import Image from "next/image";

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

export const ServiceGrid = () => {
	return (
		<div className="relative py-16 px-4 md:px-8">
			{/* Subtle grid background */}
			<div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
				{Array.from({ length: 400 }).map((_, i) => (
					<div key={i} className="border-[0.5px] border-gray-400"></div>
				))}
			</div>

			{/* Modern asymmetric grid layout */}
			<div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
				{services.map((service, index) => {
					// Create asymmetric layout with different card sizes
					const colSpan =
						index === 0
							? "lg:col-span-7"
							: index === 1
							? "lg:col-span-5"
							: index === 2
							? "lg:col-span-5"
							: "lg:col-span-7";

					// Add some vertical offset for more dynamic layout
					const marginTop =
						index === 1 ? "lg:mt-8" : index === 2 ? "lg:mt-4" : "";

					return (
						<div
							key={index}
							className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${colSpan} ${marginTop} backdrop-blur-sm bg-white/90 hover:bg-white/100 border border-gray-100`}
						>
							<div className="aspect-square w-full relative">
								<Image
									src={service.icon || "/placeholder.svg"}
									alt={service.title}
									fill
									className="object-cover transition-transform duration-500 "
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
								<div className="absolute bottom-0 left-0 p-6 text-white">
									<h3 className="text-2xl font-bold mb-1">{service.title}</h3>
								</div>
							</div>

							<div className="p-6">
								<p className="text-gray-600 mb-4">{service.description}</p>
								<div className="flex justify-end">
									<button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
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
						</div>
					);
				})}
			</div>
		</div>
	);
};
