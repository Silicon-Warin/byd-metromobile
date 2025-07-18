"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SupermanBackground = () => {
	const [lightEffects, setLightEffects] = useState<
		Array<{
			top: string;
			width: string;
			duration: number;
			delay: number;
		}>
	>([]);

	// Generate light effects once on client side
	useEffect(() => {
		const effects = Array.from({ length: 15 }, () => ({
			top: `${Math.random() * 100}%`,
			width: `${200 + Math.random() * 400}px`,
			duration: 4 + Math.random() * 6,
			delay: Math.random() * 8,
		}));
		setLightEffects(effects);
	}, []);

	return (
		<div className="fixed inset-0 z-0">
			{/* Dark base background */}
			<div className="absolute inset-0 bg-slate-900" />

			{/* Animated gradient background - darker and more intense */}
			<motion.div
				className="absolute inset-0"
				animate={{
					background: [
						"linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #7f1d1d 70%, #0f172a 100%)",
						"linear-gradient(135deg, #1e1b4b 0%, #7f1d1d 30%, #0f172a 70%, #1e1b4b 100%)",
						"linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #7f1d1d 70%, #0f172a 100%)",
					],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Intense glow effects - more subtle and darker */}
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-800/5 rounded-full blur-3xl" />

			{/* Darker streaking light effects */}
			<div className="absolute inset-0 opacity-20">
				{lightEffects.map((effect, i) => (
					<motion.div
						key={i}
						className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
						style={{
							top: effect.top,
							left: `-100px`,
							width: effect.width,
						}}
						animate={{
							x: ["0px", "100vw"],
							opacity: [0, 0.3, 0],
						}}
						transition={{
							duration: effect.duration,
							repeat: Infinity,
							delay: effect.delay,
							ease: "easeOut",
						}}
					/>
				))}
			</div>

			{/* Additional dark overlay for intensity */}
			<div className="absolute inset-0 bg-black/20" />
		</div>
	);
};

export default SupermanBackground;
