"use client";

import type React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FadeInView({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay }}
		>
			{children}
		</motion.div>
	);
}

export function ParallaxSection({
	children,
	speed = 0.5,
}: {
	children: React.ReactNode;
	speed?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

	return (
		<motion.div ref={ref} style={{ y }}>
			{children}
		</motion.div>
	);
}

export function RevealText({
	text,
	delay = 0,
}: {
	text: string;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{ clipPath: "inset(0 100% 0 0)" }}
			whileInView={{ clipPath: "inset(0 0% 0 0)" }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, delay, ease: "easeOut" }}
		>
			{text}
		</motion.div>
	);
}

export function ColorTransition({
	children,
	startColor = "rgba(0,0,0,0)",
	endColor = "rgba(0,0,0,1)",
}: {
	children: React.ReactNode;
	startColor?: string;
	endColor?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const backgroundColor = useTransform(
		scrollYProgress,
		[0, 1],
		[startColor, endColor]
	);

	return (
		<motion.div ref={ref} style={{ backgroundColor }}>
			{children}
		</motion.div>
	);
}
