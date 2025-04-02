"use client";

import type React from "react";

import {
	motion,
	useScroll,
	useTransform,
	useInView,
	useAnimation,
	AnimationControls,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

interface ParallaxSectionProps {
	children: React.ReactNode;
	speed?: number;
	className?: string;
}

export function ParallaxSection({
	children,
	speed = 0.5,
	className = "",
}: ParallaxSectionProps) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

	return (
		<motion.div ref={ref} style={{ y }} className={className}>
			{children}
		</motion.div>
	);
}

interface RevealTextProps {
	text: string;
	delay?: number;
	className?: string;
}

export function RevealText({
	text,
	delay = 0,
	className = "",
}: RevealTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<h2 ref={ref} className={`text-3xl font-bold mb-6 ${className}`}>
			{text.split(" ").map((word, i) => (
				<motion.span
					key={i}
					className="inline-block mr-2"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: delay + i * 0.1 }}
				>
					{word}
				</motion.span>
			))}
		</h2>
	);
}

interface CarRevealImageProps {
	src: string;
	alt: string;
	priority?: boolean;
}

export function CarRevealImage({
	src,
	alt,
	priority = false,
}: CarRevealImageProps) {
	const ref = useRef(null);
	const controls = useAnimation();
	const isInView = useInView(ref, {
		once: true,
		amount: 0.4,
	});

	useEffect(() => {
		if (isInView) {
			controls.start({
				clipPath: "inset(0% 0% 0% 0% round 0.75rem)",
				transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1.0] },
			});
		}
	}, [isInView, controls]);

	return (
		<div ref={ref} className="w-full py-4 md:py-8">
			<div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-xl">
				<motion.div
					className="absolute inset-0"
					initial={{ clipPath: "inset(5% 5% 5% 5% round 0.75rem)" }}
					animate={controls}
				>
					<Image
						src={src || "/placeholder.svg"}
						alt={alt}
						fill
						className="object-cover object-center"
						priority={priority}
						sizes="(max-width: 768px) 100vw, 1200px"
					/>
				</motion.div>
			</div>
		</div>
	);
}

interface FadeInViewProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export function FadeInView({
	children,
	delay = 0,
	className = "",
}: FadeInViewProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5, delay }}
		>
			{children}
		</motion.div>
	);
}
