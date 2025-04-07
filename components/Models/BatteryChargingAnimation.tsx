import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const BatteryChargingAnimation = () => {
	const [chargeLevel, setChargeLevel] = useState(0);
	const [isFullyCharged, setIsFullyCharged] = useState(false);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [isCharging, setIsCharging] = useState(false);

	// เริ่มชาร์จเมื่อเลื่อนลงมาเห็น
	useEffect(() => {
		if (isInView) {
			setIsCharging(true);
		}
	}, [isInView]);

	useEffect(() => {
		if (isCharging && chargeLevel < 100) {
			const timer = setTimeout(() => {
				setChargeLevel((prev) => {
					const newLevel = prev + 3;
					if (newLevel >= 100) {
						setIsFullyCharged(true);
					}
					return Math.min(newLevel, 100);
				});
			}, 20);
			return () => clearTimeout(timer);
		}
	}, [isCharging, chargeLevel]);

	return (
		<div className="flex flex-col items-center justify-center p-8 gap-6">
			<div ref={ref} className="relative w-64 h-32">
				{/* Battery body */}
				<div className="absolute inset-0 bg-blue-600 rounded-2xl flex items-center justify-center">
					<div className="absolute inset-2 bg-white rounded-xl overflow-hidden">
						{/* Charging indicator - shows progress or full blue when charged */}
						<motion.div
							className="h-full bg-blue-500"
							initial={{ width: 0 }}
							animate={{ width: `${chargeLevel}%` }}
							transition={{ type: "tween" }}
						/>

						{/* Lightning icon when fully charged */}
						{isFullyCharged && (
							<div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
								<motion.div
									initial={{ scale: 0.8, opacity: 0.7 }}
									animate={{
										scale: [0.8, 1.2, 0.8],
										opacity: [0.7, 1, 0.7],
									}}
									transition={{
										repeat: Infinity,
										duration: 1.5,
										ease: "easeInOut",
									}}
								>
									{/* Custom lightning bolt SVG */}
									<svg
										className="w-16 h-16 text-white"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
									</svg>
								</motion.div>
							</div>
						)}
					</div>
				</div>

				{/* Improved battery terminals on right side */}
				<div className="absolute -right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
					{/* Main terminal */}
					<div className="h-16 w-4 bg-blue-600 rounded-r-md" />

					{/* Terminal cap - top */}
					<div
						className="absolute top-0 right-0 h-3 w-4 bg-blue-700 rounded-tr-md"
						style={{ transform: "translateY(-2px)" }}
					/>

					{/* Terminal cap - bottom */}
					<div
						className="absolute bottom-0 right-0 h-3 w-4 bg-blue-700 rounded-br-md"
						style={{ transform: "translateY(2px)" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default BatteryChargingAnimation;
