"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { Users, Star } from "lucide-react";

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
		/* { id: "4", imageUrl: "/images/customers/customer4.webp" },
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
		setRotations(duplicatedPhotos.map(() => Math.random() * 6 - 3));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array ensures this runs only once on the client

	return (
		<section
			ref={sectionRef}
			className="w-full py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
		>
			{/* Section Header */}
			<div className="container mx-auto px-4 mb-16 text-center relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col items-center"
				>
					<div className="inline-flex items-center gap-2 mb-3">
						<div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500"></div>
						<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 bg-clip-text text-transparent mb-4">
							ลูกค้าของเรา
						</h2>
						<div className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent"></div>
					</div>

					<div className="flex items-center justify-center gap-2 mb-6">
						<Users className="h-5 w-5 text-blue-400" />
						<p className="text-gray-400 text-lg max-w-2xl">
							ขอบคุณลูกค้าทุกท่านที่เลือกเป็นส่วนหนึ่งของครอบครัว{" "}
							<span className="font-semibold text-blue-400">เมโทรโมบิล</span>
						</p>
					</div>

					<div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
				</motion.div>
			</div>

			{/* Infinite Carousel */}
			<div className="relative w-full">
				<Carousel
					setApi={setApi}
					opts={{
						align: "start",
						loop: true,
						skipSnaps: false,
						dragFree: true,
					}}
					className="w-full overflow-visible"
				>
					<CarouselContent className="-ml-3 md:-ml-4 overflow-visible z-10">
						{duplicatedPhotos.map((photo, idx) => (
							<CarouselItem
								key={`${photo.id}-${idx}`}
								className="pl-3 md:pl-4 basis-[280px] md:basis-[320px] lg:basis-[360px] flex-shrink-0 overflow-visible z-10"
							>
								<motion.div
									style={{
										rotate: rotations[idx] || 0, // Use client-side rotation
									}}
									whileHover={{
										scale: 1.05,
										rotate: 0,
										transition: { duration: 0.3 },
									}}
									className="relative group cursor-pointer"
								>
									{/* Modern dark frame */}
									<div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-700/50 backdrop-blur-sm transform transition-all duration-300 group-hover:shadow-blue-900/20 group-hover:border-blue-700/30 overflow-visible">
										{/* Photo */}
										<div className="aspect-[4/3] rounded-lg overflow-hidden relative">
											<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent "></div>
											<Image
												loading="lazy"
												src={photo.imageUrl || "/placeholder.svg"}
												alt="Happy BYD Customer"
												fill
												style={{ objectFit: "cover" }}
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="transition-transform duration-700 group-hover:scale-110"
											/>
										</div>

										{/* Glow effect on hover */}
										<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
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
