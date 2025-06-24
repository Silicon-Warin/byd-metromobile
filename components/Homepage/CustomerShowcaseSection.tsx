"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerPhoto {
	id: string;
	imageUrl: string;
}

// InfiniteMovingPhotos Component
const InfiniteMovingPhotos = ({
	photos,
	direction = "left",
	speed = "normal",
	pauseOnHover = true,
	className,
}: {
	photos: CustomerPhoto[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLUListElement>(null);
	const [start, setStart] = useState(false);
	const [rotations, setRotations] = useState<number[]>([]);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		// Generate random rotations for photos
		setRotations(photos.map(() => Math.random() * 6 - 3));
	}, [photos]);

	const getDirection = useCallback(() => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse"
				);
			}
		}
	}, [direction]);

	const getSpeed = useCallback(() => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "40s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "80s");
			}
		}
	}, [speed]);

	// Memoize addAnimation function to fix dependency warning
	const addAnimation = useCallback(() => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}, [getDirection, getSpeed]);

	useEffect(() => {
		if (isInView && !start) {
			addAnimation();
		}
	}, [isInView, start, addAnimation]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
				}
			},
			{ threshold: 0.3 }
		);

		// Store current ref value to avoid stale closure
		const currentContainer = containerRef.current;
		if (currentContainer) {
			observer.observe(currentContainer);
		}

		return () => {
			if (currentContainer) {
				observer.unobserve(currentContainer);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]"
				)}
			>
				{photos.map((photo, idx) => (
					<li
						key={`${photo.id}-${idx}`}
						className="relative w-[280px] md:w-[320px] lg:w-[360px] flex-shrink-0"
					>
						<motion.div
							style={{
								rotate: rotations[idx] || 0,
							}}
							whileHover={{
								scale: 1.05,
								rotate: 0,
								transition: { duration: 0.3 },
							}}
							className="relative group cursor-pointer hover-lift"
						>
							{/* Modern dark frame */}
							<div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-700/50 backdrop-blur-sm transform transition-all duration-300 group-hover:shadow-blue-900/20 group-hover:border-blue-700/30">
								{/* Photo */}
								<div className="aspect-[4/3] rounded-lg overflow-hidden relative">
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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
					</li>
				))}
			</ul>
		</div>
	);
};

const CustomerShowcaseSection = () => {
	const sectionRef = useRef<HTMLElement>(null);

	// Sample customer photos data
	const customerPhotos: CustomerPhoto[] = [
		{ id: "1", imageUrl: "/images/customers/customer1.webp" },
		{ id: "2", imageUrl: "/images/customers/customer2.webp" },
		{ id: "3", imageUrl: "/images/customers/customer3.webp" },
		{ id: "4", imageUrl: "/images/customers/customer4.webp" },
		{ id: "5", imageUrl: "/images/customers/customer5.webp" },
		{ id: "6", imageUrl: "/images/customers/customer6.webp" },
		{ id: "7", imageUrl: "/images/customers/customer7.webp" },
		{ id: "8", imageUrl: "/images/customers/customer8.webp" },
		{ id: "9", imageUrl: "/images/customers/customer9.webp" },
		{ id: "10", imageUrl: "/images/customers/customer10.webp" },
	];

	return (
		<section
			ref={sectionRef}
			className="w-full py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden section-fade-in"
		>
			{/* Section Header */}
			<div className="container mx-auto px-4 mb-16 text-center relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col items-center fadeIn stagger-1"
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

			{/* Infinite Moving Photos */}
			<div className="relative w-full image-scale-in stagger-2">
				<InfiniteMovingPhotos
					photos={customerPhotos}
					direction="left"
					speed="slow"
					pauseOnHover={true}
					className="mx-auto"
				/>
			</div>
		</section>
	);
};

export default CustomerShowcaseSection;
