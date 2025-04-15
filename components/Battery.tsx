"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Battery() {
	const [charging, setCharging] = useState(true);
	const [charged, setCharged] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setCharging(false);
			setCharged(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex justify-center items-center w-full">
			<div className="relative overflow-hidden">
				<svg viewBox="0 0 120 60" width="240" height="120">
					{/* Battery outline */}
					<rect
						x="17"
						y="10"
						width="80"
						height="40"
						rx="8"
						fill="white"
						stroke="#2563eb"
						strokeWidth="6"
					/>

					{/* Battery terminal */}
					<rect x="99" y="20" width="10" height="20" rx="3" fill="#2563eb" />

					{/* Charging animation */}
					{charging && (
						<motion.rect
							x="22"
							y="15"
							width="70"
							height="30"
							rx="4"
							fill="#2563eb"
							initial={{ width: 0 }}
							animate={{ width: 70 }}
							transition={{ duration: 1.5, ease: "linear" }}
						/>
					)}

					{/* Fully charged state - blue background */}
					{charged && (
						<rect x="22" y="15" width="70" height="30" rx="4" fill="#2563eb" />
					)}

					{charged && (
						<motion.path
							d="M60 22C60.1313 21.6387 59.8894 21.2457 59.5357 21.2457H53.6346C53.4194 21.2457 53.2283 21.3972 53.1603 21.6218L50.4936 30.4218C50.3857 30.778 50.6267 31.1457 50.9679 31.1457H53.6338C53.9591 31.1457 54.1978 31.482 54.1189 31.8291L52.712 38.0193C52.5891 38.5605 53.1921 38.936 53.5507 38.5417L62.4207 28.8847C62.7357 28.5382 62.5126 27.9457 62.0671 27.9457H58.6127C58.259 27.9457 58.0171 27.5527 58.1485 27.1914L60 22Z"
							fill="white"
							strokeLinecap="round"
							strokeLinejoin="round"
							animate={{
								scale: [1, 1.1, 1],
								opacity: [1, 0.8, 1],
							}}
							transition={{
								duration: 1.5,
								repeat: 3,
								repeatType: "reverse",
							}}
						/>
					)}
				</svg>
			</div>
		</div>
	);
}
