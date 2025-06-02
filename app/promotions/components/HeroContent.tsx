"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import LineOALinkButton from "@/components/Line/line-button";

const HeroContent = () => {
	return (
		<div className="max-w-7xl mx-auto w-full pt-24">
			{/* Hero Images Animation */}
			<div className="relative h-[60vh] md:h-[70vh] mb-12 overflow-hidden rounded-3xl border border-slate-700/50">
				{/* Left Superman Image */}
				<motion.div
					className="absolute left-0 top-0 w-1/2 h-full z-20"
					initial={{ x: "-100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				>
					<Image
						src="/images/promo-banner/hero-promo-banner1.webp"
						alt="Superman BYD Campaign"
						fill
						className="object-cover object-right"
						sizes="50vw"
						priority
					/>
				</motion.div>

				{/* Right Cars Image */}
				<motion.div
					className="absolute right-0 top-0 w-1/2 h-full z-20"
					initial={{ x: "100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
				>
					<Image
						src="/images/promo-banner/hero-promo-banner2.webp"
						alt="BYD Supercharged"
						fill
						className="object-cover object-left"
						sizes="50vw"
						priority
					/>
				</motion.div>

				{/* Center Glow Effect */}
				<motion.div
					className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent z-30"
					initial={{ opacity: 0, scaleY: 0 }}
					animate={{ opacity: 1, scaleY: 1 }}
					transition={{ duration: 1.5, delay: 1 }}
				/>
			</div>

			{/* Hero Content */}
			<motion.div
				className="text-center space-y-8"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1.8 }}
			>
				<div className="space-y-4">
					<h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
						<span className="bg-gradient-to-r from-blue-300 via-slate-100 to-red-300 bg-clip-text text-transparent">
							SUPERMAN
						</span>
					</h1>
					<div className="flex items-center justify-center space-x-4">
						<div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-red-600"></div>
						<span className="text-2xl md:text-4xl font-bold text-slate-200">
							X
						</span>
						<div className="w-12 h-1 bg-gradient-to-r from-red-600 to-blue-600"></div>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-white">BYD</h2>
					<p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
						SUPERCHARGED
					</p>
				</div>

				<div className="space-y-6 max-w-3xl mx-auto">
					{/* <motion.div
						className="space-y-3"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 2.0 }}
					>
						<p className="text-xl md:text-2xl text-red-300 font-bold">
							🦸‍♂️ Superman ใช้พลังเปลี่ยนโลก คุณก็ทำได้...แค่เลือกขับ BYD 🚀
						</p>
						<p className="text-lg md:text-xl text-white">
							⚡ พลัง Super x2 — เมื่อ Superman เจอกับ BYD Supercharged ⚡
						</p>
					</motion.div> */}

					<motion.div
						className="bg-gradient-to-r from-red-900/30 to-blue-900/30 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 2.2 }}
					>
						<p className="text-lg md:text-xl text-red-300 font-bold mb-3">
							💥 ไม่มีผ้าคลุม...แต่คุณคือ Superman บนท้องถนน
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<span className="text-slate-300">แรงจัด 💨</span>
							<span className="text-slate-300">เงียบจริง 🔇</span>
							<span className="text-slate-300">ควบคุมได้ดั่งใจ 🧠</span>
						</div>
					</motion.div>
				</div>

				{/* CTA Section */}
				<motion.div
					className="space-y-4 mt-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 2.4 }}
				>
					<LineOALinkButton className="bg-gradient-to-r from-red-700 to-blue-700 hover:from-red-800 hover:to-blue-800 text-white px-8 py-6 text-lg font-bold rounded-full shadow-2xl shadow-red-900/25 border border-slate-600/20">
						รับข้อเสนอพิเศษเพิ่มเติม
					</LineOALinkButton>

					<div className="space-y-1">
						<p className="text-sm text-slate-400">
							พิเศษ! 1 มิ.ย. - 31 ก.ค. 68 เท่านั้น
						</p>
						<p className="text-xs text-slate-500">
							*เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
						</p>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default HeroContent;
