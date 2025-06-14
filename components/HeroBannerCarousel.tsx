"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
	const carouselRef = useRef<HTMLDivElement>(null);
	const slideCount = slides.length;

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
		}, 5000);

		return () => clearInterval(interval);
	}, [slideCount]);

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
							className="object-contain object-center"
							sizes="100dvh"
							placeholder="blur"
							blurDataURL={placeholderBlurData}
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default HeroBannerCarousel;
