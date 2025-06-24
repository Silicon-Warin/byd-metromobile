"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

// Animation Variants
const fadeInVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const heroEntranceVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: { opacity: 1, y: 0, scale: 1 },
};

const imageScaleVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
};

const sectionFadeVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

// Reusable Components
export const FadeIn = ({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) => (
	<motion.div
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, margin: "-50px" }}
		variants={fadeInVariants}
		transition={{ duration: 0.6, delay, ease: "easeOut" }}
		className={className}
	>
		{children}
	</motion.div>
);

export const HeroEntrance = ({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) => (
	<motion.div
		initial="hidden"
		animate="visible"
		variants={heroEntranceVariants}
		transition={{ duration: 0.8, ease: "easeOut" }}
		className={className}
	>
		{children}
	</motion.div>
);

export const ImageScale = ({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) => (
	<motion.div
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, margin: "-100px" }}
		variants={imageScaleVariants}
		transition={{ duration: 0.8, delay, ease: "easeOut" }}
		className={className}
	>
		{children}
	</motion.div>
);

export const SectionFade = ({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) => (
	<motion.div
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, margin: "-100px" }}
		variants={sectionFadeVariants}
		transition={{ duration: 0.6, ease: "easeOut" }}
		className={className}
	>
		{children}
	</motion.div>
);

// Stagger delays
export const staggerDelays = {
	stagger1: 0.1,
	stagger2: 0.2,
	stagger3: 0.3,
	stagger4: 0.4,
	stagger5: 0.5,
	stagger6: 0.6,
};
