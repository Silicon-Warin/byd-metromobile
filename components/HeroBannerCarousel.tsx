import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
	{
		id: 1,
		image: "/images/banners/banner-1.jpg",

		buttonLink: "/offers",
	},
	{
		id: 2,
		image: "/images/banners/banner-2.jpg",

		buttonLink: "/order",
	},
	{
		id: 3,
		image: "/images/banners/banner-3.jpg",

		buttonLink: "/vehicles",
	},
];

const HeroBannerCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoplay, setIsAutoplay] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const carouselRef = useRef(null);
	const slideCount = slides.length;

	// Check if we're on mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkMobile();

		// Add resize listener
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
	}, [slideCount]);

	const prevSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
	}, [slideCount]);

	useEffect(() => {
		if (!isAutoplay) return;

		const interval = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoplay, nextSlide]);

	// Pause autoplay when user interacts with carousel
	const handleInteraction = () => {
		setIsAutoplay(false);
		const timer = setTimeout(() => setIsAutoplay(true), 10000);
		return () => clearTimeout(timer);
	};

	return (
		<div
			ref={carouselRef}
			className="relative w-full h-[500px] md:h-[600px] lg:h-screen overflow-hidden"
		>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.7, ease: "easeInOut" }}
					className="absolute inset-0"
				>
					<div className="relative w-full h-full">
						<Image
							src={slides[currentSlide].image}
							alt="bydmetromobile banner"
							fill
							priority={currentSlide === 0}
							quality={85}
							className={`${
								isMobile ? "object-contain scale-[1.2]" : "object-cover"
							}`}
							sizes="100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-center items-center text-white text-center px-4 mobile-content-fix">
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									variant="outline"
									className="border-white text-white hover:bg-white/20"
									size="lg"
								>
									Learn More
								</Button>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation arrows */}
			<div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
				<Button
					variant="ghost"
					size="icon"
					className="bg-black/30 text-white rounded-full hover:bg-black/50"
					onClick={() => {
						prevSlide();
						handleInteraction();
					}}
					aria-label="Previous slide"
				>
					<ChevronLeft className="h-6 w-6" />
				</Button>
			</div>

			<div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
				<Button
					variant="ghost"
					size="icon"
					className="bg-black/30 text-white rounded-full hover:bg-black/50"
					onClick={() => {
						nextSlide();
						handleInteraction();
					}}
					aria-label="Next slide"
				>
					<ChevronRight className="h-6 w-6" />
				</Button>
			</div>

			{/* Slide indicators */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
				{Array.from({ length: slideCount }).map((_, idx) => (
					<button
						key={idx}
						onClick={() => {
							setCurrentSlide(idx);
							handleInteraction();
						}}
						className={`w-3 h-3 rounded-full transition-all ${
							currentSlide === idx ? "bg-white w-8" : "bg-white/50"
						}`}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default HeroBannerCarousel;
