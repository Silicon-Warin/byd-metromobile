"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function BydNeonLoader() {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		const animateLoader = async () => {
			// Animate B letter
			animate(
				[
					[".b1", { pathLength: 0.5, pathOffset: 0 }],
					[".b1", { pathLength: 0.005, pathOffset: 0 }],
					[".b2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }],
				],
				{ duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY }
			);

			// Animate Y letter
			animate(
				[
					[".y1", { pathLength: 0.5, pathOffset: 0 }],
					[".y1", { pathLength: 0.005, pathOffset: 0 }],
					[".y2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }],
				],
				{
					duration: 2,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
					delay: 0.3,
				}
			);

			// Animate D letter
			animate(
				[
					[".d1", { pathLength: 0.5, pathOffset: 0 }],
					[".d1", { pathLength: 0.005, pathOffset: 0 }],
					[".d2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }],
				],
				{
					duration: 2,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
					delay: 0.6,
				}
			);

			// Animate outer glow for each letter
			animate(
				[
					[".b-glow", { pathLength: 1.1, pathOffset: 0 }],
					[".b-glow", { pathLength: 0, pathOffset: 0 }],
				],
				{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.6 }
			);

			animate(
				[
					[".y-glow", { pathLength: 1.1, pathOffset: 0 }],
					[".y-glow", { pathLength: 0, pathOffset: 0 }],
				],
				{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatDelay: 0.6,
					delay: 0.3,
				}
			);

			animate(
				[
					[".d-glow", { pathLength: 1.1, pathOffset: 0 }],
					[".d-glow", { pathLength: 0, pathOffset: 0 }],
				],
				{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatDelay: 0.6,
					delay: 0.6,
				}
			);
		};

		animateLoader();
	}, [animate]);

	return (
		<div className="flex items-center justify-center w-full h-screen bg-background">
			<svg
				ref={scope}
				width="300"
				height="100"
				viewBox="0 0 300 100"
				className="w-auto h-auto max-w-full max-h-full"
			>
				{/* B Letter - Matching the BYD logo style */}
				<motion.path
					className="b1"
					initial={{ pathLength: 0.5, pathOffset: 0.5 }}
					d="M 25,20 H 65 C 75,20 80,25 80,35 V 40 C 80,45 75,50 65,50 H 25 M 25,50 H 65 C 75,50 80,55 80,65 V 70 C 80,75 75,80 65,80 H 25"
					style={{
						stroke: "#ffffff",
						strokeWidth: 2,
						fill: "none",
						filter: "drop-shadow(0 0 5px #ffffff)",
					}}
				/>
				<motion.path
					className="b2"
					initial={{ pathLength: 0, pathOffset: 1 }}
					d="M 25,20 H 65 C 75,20 80,25 80,35 V 40 C 80,45 75,50 65,50 H 25 M 25,50 H 65 C 75,50 80,55 80,65 V 70 C 80,75 75,80 65,80 H 25"
					style={{
						stroke: "#ffffff",
						strokeWidth: 2,
						fill: "none",
						filter: "drop-shadow(0 0 5px #ffffff)",
					}}
				/>
				<motion.path
					className="b-glow"
					initial={{ pathLength: 1.1, pathOffset: 1 }}
					d="M 25,20 H 65 C 75,20 80,25 80,35 V 40 C 80,45 75,50 65,50 H 25 M 25,50 H 65 C 75,50 80,55 80,65 V 70 C 80,75 75,80 65,80 H 25"
					style={{
						stroke: "#ffffff",
						strokeWidth: 4,
						fill: "none",
						opacity: 0.5,
						filter: "drop-shadow(0 0 8px #ffffff)",
					}}
				/>

				{/* Y Letter - Updated to match BYD logo exactly */}
				<motion.path
					className="y1"
					initial={{ pathLength: 0.5, pathOffset: 0.5 }}
					d="M 110,20 V 40 H 135 V 80 M 160,20 V 40 H 135"
					style={{
						stroke: "#ffffff",
						strokeWidth: 2,
						fill: "none",
						filter: "drop-shadow(0 0 5px #ffffff)",
					}}
				/>
				<motion.path
					className="y2"
					initial={{ pathLength: 0, pathOffset: 1 }}
					d="M 110,20 V 40 H 135 V 80 M 160,20 V 40 H 135"
					style={{
						stroke: "#ffffff",
						strokeWidth: 2,
						fill: "none",
						filter: "drop-shadow(0 0 5px #ffffff)",
					}}
				/>
				<motion.path
					className="y-glow"
					initial={{ pathLength: 1.1, pathOffset: 1 }}
					d="M 110,20 V 40 H 135 V 80 M 160,20 V 40 H 135"
					style={{
						stroke: "#ffffff",
						strokeWidth: 4,
						fill: "none",
						opacity: 0.5,
						filter: "drop-shadow(0 0 8px #ffffff)",
					}}
				/>

				{/* D Letter - Updated to match BYD logo with vertical line removed */}
				<motion.path
					className="d1"
					initial={{ pathLength: 0.5, pathOffset: 0.5 }}
					d="M 190,20 H 220 C 245,20 260,30 260,50 C 260,70 245,80 220,80 H 190"
					style={{
						stroke: "#ffffff",
						strokeWidth: 2,
						fill: "none",
						filter: "drop-shadow(0 0 5px #ffffff)",
					}}
				/>
				<motion.path
					className="d2"
					initial={{ pathLength: 0, pathOffset: 1 }}
					d="M 190,20 H 220 C 245,20 260,30 260,50 C 260,70 245,80 220,80 H 190"
					style={{
						stroke: "#ffffff",
						strokeWidth: 2,
						fill: "none",
						filter: "drop-shadow(0 0 5px #ffffff)",
					}}
				/>
				<motion.path
					className="d-glow"
					initial={{ pathLength: 1.1, pathOffset: 1 }}
					d="M 190,20 H 220 C 245,20 260,30 260,50 C 260,70 245,80 220,80 H 190"
					style={{
						stroke: "#ffffff",
						strokeWidth: 4,
						fill: "none",
						opacity: 0.5,
						filter: "drop-shadow(0 0 8px #ffffff)",
					}}
				/>
			</svg>
		</div>
	);
}
