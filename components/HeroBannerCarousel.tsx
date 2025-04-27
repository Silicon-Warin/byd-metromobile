"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
	{
		id: 1,
		image: "/images/banners/byd-banner-1.webp",
		buttonLink: "/promotions",
	},
	{
		id: 2,
		image: "/images/banners/byd-banner-2.webp",
		buttonLink: "/promotions",
	},
	{
		id: 3,
		image: "/images/banners/byd-banner-3.webp",
		buttonLink: "/promotions",
	},
];

// Simplified blur data placeholder
const placeholderBlurData =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const HeroBannerCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoplay, setIsAutoplay] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);
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
		<div ref={carouselRef} className="relative w-full h-screen overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentSlide}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.7, ease: "easeInOut" }}
					className="absolute inset-0"
				>
					<div className="relative w-full h-screen overflow-hidden">
						<Image
							src={slides[currentSlide].image || "/placeholder.svg"}
							alt="bydmetromobile banner"
							fill
							priority={currentSlide === 0}
							className="object-cover object-center"
							sizes="100vw"
							placeholder="blur"
							blurDataURL={placeholderBlurData}
						/>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation arrows */}
			<div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
				<Button
					variant="outline"
					size="icon"
					className="bg-black/30 text-white rounded-full hover:bg-black/50 border-0"
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
					variant="outline"
					size="icon"
					className="bg-black/30 text-white rounded-full hover:bg-black/50 border-0"
					onClick={() => {
						nextSlide();
						handleInteraction();
					}}
					aria-label="Next slide"
				>
					<ChevronRight className="h-6 w-6" />
				</Button>
			</div>
		</div>
	);
};

export default HeroBannerCarousel;
