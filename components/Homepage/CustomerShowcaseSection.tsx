"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CustomerPhoto {
	id: string;
	imageUrl: string;
}

const CustomerShowcaseSection = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [isInView, setIsInView] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const [rotations, setRotations] = useState<number[]>([]);

	// Auto-play when in view
	useEffect(() => {
		if (!api || !isInView) return;

		const timer = setInterval(() => {
			api.scrollNext();
		}, 2500);

		return () => clearInterval(timer);
	}, [api, isInView]);

	// Intersection Observer to detect when section is in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{ threshold: 0.3 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	// Sample customer photos data
	const customerPhotos: CustomerPhoto[] = [
		{ id: "1", imageUrl: "/images/customers/customer1.webp" },
		{ id: "2", imageUrl: "/images/customers/customer2.webp" },
		{ id: "3", imageUrl: "/images/customers/customer3.webp" },
		/* 	{ id: "4", imageUrl: "/images/customers/customer4.webp" },
		{ id: "5", imageUrl: "/images/customers/customer5.webp" }, */
	];
	// Create duplicated array for seamless infinite scroll
	const duplicatedPhotos = [
		...customerPhotos,
		...customerPhotos,
		...customerPhotos,
	];

	useEffect(() => {
		// Generate random rotations only on the client-side after mount
		// to prevent hydration mismatch.
		setRotations(duplicatedPhotos.map(() => Math.random() * 8 - 4));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array ensures this runs only once on the client

	return (
		<section
			ref={sectionRef}
			className="w-full py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
		>
			{/* Section Header */}
			<div className="container mx-auto px-4 mb-12 text-center relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* 
						เปลี่ยนธีมให้เข้ากับเว็บ BYD: ใช้โทนฟ้า-กรม-เทา (corporate/modern) 
						และปรับให้ดูสะอาดตาแบบโปรเกรสซีฟค่ะ
					*/}
					<div className="inline-flex flex-col md:flex-row items-center gap-3 bg-gradient-to-r from-blue-900/70 via-blue-700/60 to-gray-800/60 backdrop-blur-md rounded-2xl px-8 py-4 mb-6 border border-blue-700/30 shadow-lg">
						<h2 className="text-4xl md:text-5xl font-bold text-blue-100 mb-1 md:mb-0 drop-shadow-sm">
							ลูกค้าของเรา
						</h2>
						<p className="text-blue-200 text-lg max-w-2xl mx-auto flex items-center gap-2">
							<span className="text-xl">🚗</span>
							ขอบคุณลูกค้าทุกท่านที่เลือกเป็นส่วนหนึ่งของครอบครัว{" "}
							<span className="font-semibold text-blue-400">BYD</span>
							<span className="text-xl">💙</span>
						</p>
					</div>
				</motion.div>
			</div>

			{/* Infinite Carousel */}
			<div className="relative w-full overflow-visible">
				<Carousel
					setApi={setApi}
					opts={{
						align: "start",
						loop: true,
						skipSnaps: false,
						dragFree: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-3 md:-ml-4">
						{duplicatedPhotos.map((photo, idx) => (
							<CarouselItem
								key={`${photo.id}-${idx}`}
								className="pl-3 md:pl-4 basis-[280px] md:basis-[320px] lg:basis-[360px] flex-shrink-0 overflow-visible z-10"
							>
								<motion.div
									style={{
										rotate: rotations[idx] || 0, // Use client-side rotation
									}}
									className="relative group cursor-pointer"
								>
									{/* Cute polaroid-style frame */}
									<div className="bg-white p-3 rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:shadow-pink-500/25 overflow-visible">
										{/* Photo */}
										<div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
											<Image
												loading="lazy"
												src={photo.imageUrl}
												alt="Happy BYD Customer"
												fill // ทำให้รูปภาพเต็มขนาดของ parent element
												style={{ objectFit: "cover" }} // จัดการสัดส่วนรูปภาพ
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										</div>

										{/* Floating heart decoration */}
										<motion.div
											className="absolute -top-2 -right-2 text-2xl"
											animate={{
												y: [0, -5, 0],
												rotate: [0, 10, -10, 0],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												repeatType: "reverse",
											}}
										>
											💖
										</motion.div>
									</div>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
};

export default CustomerShowcaseSection;
