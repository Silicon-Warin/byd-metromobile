"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BranchMapButton from "@/components/BranchMapButton";
import LineOALinkButton from "../Line/line-button";

const showroomImages = [
	{
		desktop: "/images/showroom/byd-showroom-1.webp",
	},
	{
		desktop: "/images/showroom/byd-showroom-2.webp",
	},
	{
		desktop: "/images/showroom/byd-showroom-3.webp",
	},
	{
		desktop: "/images/showroom/byd-showroom-4.webp",
	},
	{
		desktop: "/images/showroom/byd-showroom-5.webp",
	},
	{
		desktop: "/images/showroom/byd-showroom-6.webp",
	},
];

export default function ShowroomSection() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % showroomImages.length);
		}, 4000);

		return () => clearInterval(timer);
	}, []);

	return (
		<section className="relative min-h-screen h-dvh w-full overflow-hidden section-fade-in seamless-transition">
			<div className="top-shadow-showroom z-10 -mt-2"></div>
			{/* Background Images with Simple CrossFade */}
			<div className="absolute inset-0">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						className="absolute inset-0"
					>
						<Image
							src={showroomImages[currentIndex].desktop}
							alt="โชว์รูม BYD"
							fill
							className="object-cover w-full h-full"
							sizes="100vw"
							priority
							quality={90}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
			{/* Dark overlay for text readability */}
			<div className="absolute w-full h-full top-0 left-0 z-10 bg-gray-900 opacity-60"></div>
			{/* Content Section - positioned like reference */}
			<div className="absolute top-14 lg:top-44 2xl:top-72 z-20 px-5 md:px-16 mt-10 md:pb-10 md:-mt-20 md:min-w-[1000px] md:left-1/2 md:-translate-x-1/2">
				<div className="max-w-4xl">
					{/* Main Heading */}
					<div className="mb-8 hero-entrance">
						<h1 className="text-4xl lg:text-5xl font-bold leading-tight">
							<span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
								BYD
							</span>
							<span className="mx-2" />{" "}
							{/* เพิ่มเว้นวรรคระหว่าง BYD กับ Metromobile ค่ะ */}
							<span className="bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
								Metromobile
							</span>
						</h1>

						<p className="text-lg md:text-xl text-white max-w-2xl leading-relaxed text-shadow-md">
							"สัมผัส BYD ทุกรุ่น พร้อมโชว์รูมที่ทันสมัย"
						</p>
					</div>

					{/* Owner Benefits Badge - modern outline style */}
					<div className="-mb-3 md:-mb-2 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white leading-4 mt-8 border border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-sm w-fit px-3 py-2 md:py-2.5 md:px-4 rounded-lg transition-all duration-300 fadeIn stagger-1">
						<p className="-mb-0.5">พร้อมสิทธิพิเศษมากมาย</p>
					</div>

					{/* Showroom Stats - horizontal layout like ref */}
					<div className="flex gap-4 md:gap-10 items-center text-white text-shadow-md fadeIn stagger-2">
						<div className="py-5">
							<div className="flex items-center font-semibold gap-0.5">
								<h3 className="font-bold text-3xl md:text-4xl">5</h3>
							</div>
							<h4 className="text-xs md:text-sm font-medium">สาขา</h4>
						</div>
						<div className="py-5">
							<div className="flex items-center font-semibold gap-0.5">
								<h3 className="font-bold text-2xl md:text-3xl">8:00-17:30</h3>
							</div>
							<h4 className="text-xs md:text-sm font-medium">เวลาทำการ</h4>
						</div>
						<div className="py-5">
							<div className="flex items-center font-semibold gap-0.5">
								<h3 className="font-bold text-3xl md:text-4xl">100</h3>
								<span className="font-bold text-3xl md:text-4xl">%</span>
							</div>
							<h4 className="text-xs md:text-sm font-medium">บริการครบครัน</h4>
						</div>
					</div>

					{/* Desktop CTA Buttons */}
					<div className="flex-col md:flex-row gap-3 md:mt-10 w-[400px] hidden md:flex fadeIn stagger-3">
						<BranchMapButton className="hover-lift bg-opacity-90 shadow-2xl" />
						<LineOALinkButton className="text-white hover-lift bg-opacity-90 shadow-2xl">
							นัดหมายเข้าชม
						</LineOALinkButton>
					</div>
				</div>
			</div>
		</section>
	);
}
