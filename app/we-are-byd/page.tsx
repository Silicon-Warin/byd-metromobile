"use client";

import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, MapPin, Mail } from "lucide-react"; // Keeping Lucide icons
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

// Animation variants for Framer Motion
const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function AboutPage() {
	return (
		// Main container for dark theme background and text
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 font-inter">
			{/* Hero Section */}
			<section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0 w-full h-full">
					<Image
						src="/images/about/Showroom-1024x618.jpg"
						alt="BYD Metromobile - Official Dealer"
						fill
						priority
						sizes="100vw" //TODO: reponsive image optimization
						className="object-cover w-full h-full brightness-50"
					/>
				</div>
				{/* Overlay for gradient fade at the bottom of hero section, adjusted for dark theme */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>

				<div className="container relative z-10 px-4 mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						// Adjusted background opacity and shadow for dark theme
						className="max-w-3xl mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-500/30 border border-white/10"
					>
						<h1 className="text-5xl md:text-7xl font-prompt font-bold mb-6 text-white text-shadow-lg">
							เกี่ยวกับเรา
						</h1>
						<p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-shadow-md">
							ศูนย์รวมนวัตกรรมยานยนต์แห่งโลกอนาคต ที่พร้อมจะพาคุณขับเคลื่อน
							สู่โลกและสิ่งแวดล้อมในฝันที่ดีขึ้น
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button
								size="lg"
								className="rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								ดูรถยนต์ของเรา
								<ChevronRight className="ml-1 h-4 w-4" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								// Adjusted button styles for dark theme contrast
								className="rounded-full font-medium bg-transparent text-white border-white hover:bg-white/10 hover:text-white hover:border-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								ติดต่อเรา
								<ChevronRight className="ml-1 h-4 w-4" />
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* BYD Section */}
			<motion.section
				id="about-byd"
				className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div variants={fadeInUp} className="order-2 lg:order-1">
							<div className="space-y-6">
								<h2 className="text-3xl md:text-4xl font-prompt font-bold mb-6 text-gray-100">
									เกี่ยวกับ BYD
								</h2>
								<div className="space-y-6 text-lg prose prose-invert max-w-none">
									{/* prose-invert for dark mode typography */}
									<p>
										<span className="font-bold">Build Your Dreams</span> หรือ
										<span className="font-bold"> BYD </span>
										เป็นบริษัทเทคโนโลยีชั้นนำจากประเทศจีนที่มุ่งมั่นในการพัฒนานวัตกรรมเพื่อชีวิตที่ดีกว่า
										ด้วยความเชี่ยวชาญมากกว่า 30 ปี
									</p>
									<p>
										BYD เป็นผู้นำในอุตสาหกรรมต่าง ๆ ไม่ว่าจะเป็นรถยนต์
										พลังงานสะอาด ชิ้นส่วนและอุปกรณ์อิเล็กทรอนิกส์
										และการขนส่งทางรถไฟ และมีสำนักงานทั่วโลกกว่า 70+ ประเทศ
									</p>
									<p>
										ในบริบทของประเทศไทย บริษัท
										<span className="font-bold"> RÊVER AUTOMOTIVE </span>
										เป็นผู้นำเข้ารถยนต์ BYD อย่างเป็นทางการแต่เพียงผู้เดียว
									</p>
								</div>
								<div className="flex flex-wrap gap-4 mt-8">
									<a
										href="https://www.byd.com/en/blade-battery"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
									>
										<span>เทคโนโลยี Blade Battery</span>
										<ExternalLink className="h-4 w-4" />
									</a>
									<a
										href="https://www.byd.com/en-th"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
									>
										<span>เว็บไซต์ BYD ประเทศไทย</span>
										<ExternalLink className="h-4 w-4" />
									</a>
								</div>
							</div>
						</motion.div>
						<motion.div
							variants={fadeIn}
							className="order-1 lg:order-2 flex justify-center"
						>
							<div className="relative overflow-hidden w-full max-w-md aspect-square">
								<Image
									src="/images/about/BYD-Logo.jpg"
									alt="BYD โลโก้ - บริษัทรถยนต์ไฟฟ้าชั้นนำ"
									fill
									priority
									sizes="100vw" //TODO: reponsive image optimization
									className="object-contain w-full h-full"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Brand Showcase */}
			<motion.section
				className="py-8 md:py-16 bg-gradient-to-b from-gray-800 to-gray-900 "
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{
							clipPath: "inset(10% 10% 10% 10%)",
							opacity: 0,
						}}
						whileInView={{
							clipPath: "inset(0% 0% 0% 0%)",
							opacity: 1,
						}}
						transition={{
							duration: 1.2,
							ease: [0.8, 0.9, 1.0, 1.1],
							clipPath: { duration: 1.2, delay: 0.2 },
							opacity: { duration: 0.8 },
						}}
						viewport={{ once: true, amount: 0.3 }}
						className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-xl shadow-blue-500/20 group transform hover:scale-[1.01] transition-transform duration-500"
					>
						<Image
							src="/images/about/byd-showcase.jpg"
							alt="รถยนต์ไฟฟ้า BYD โดย เมโทรโมบิล - ผู้จำหน่ายอย่างเป็นทางการ"
							fill
							priority
							sizes="100vw" //TODO: reponsive image optimization
							className="object-contain w-full h-full"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
							<div className="p-6 md:p-10 w-full rounded-2xl">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-shadow-md">
									รถยนต์ไฟฟ้าแห่งอนาคต
								</h3>
								<p className="text-white/80 max-w-xl text-shadow-sm">
									ด้วยเทคโนโลยีล้ำสมัย BYD
									นำเสนอประสบการณ์การขับขี่ที่เหนือระดับ ปลอดภัย
									และเป็นมิตรกับสิ่งแวดล้อม
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Metromobile Section */}
			<motion.section
				id="about-metromobile"
				className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h2 className="text-3xl md:text-5xl font-prompt font-bold mb-6 text-gray-100">
							เกี่ยวกับ <span className="text-gradient-metro">เมโทรโมบิล</span>
						</h2>
						<div className="flex justify-center mb-8">
							<img
								src="/images/metromobile-logo.png" // Placeholder for Metromobile Logo
								alt="เมโทรโมบิล โลโก้ - ผู้จำหน่ายรถยนต์ BYD อย่างเป็นทางการ"
								width={300}
								height={100}
								className="h-auto"
							/>
						</div>
						<p className="text-xl text-gray-300">
							บริษัท{" "}
							<span className="text-gradient-metro-slow">เมโทรโมบิล</span> จำกัด
							(<span className="text-gradient-wave">Metromobile</span>)
							เป็นผู้จำหน่ายรถยนต์ BYD อย่างเป็นทางการ ภายใต้แบรนด์ BYD{" "}
							<span className="text-gradient-metro-slow">Metromobile</span>
						</p>
					</motion.div>

					{/* New Section for Team Photo / Group Photo */}
					<motion.div
						variants={fadeInUp}
						className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20 mb-16"
					>
						<img
							src="https://placehold.co/1200x500/303030/ffffff?text=Metromobile+Team" // Placeholder for a cool group photo
							alt="ทีมงานเมโทรโมบิล"
							style={{ objectFit: "cover", width: "100%", height: "100%" }}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
							<div className="p-6 md:p-10 w-full text-center">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-shadow-md">
									ทีมงานผู้เชี่ยวชาญของเรา
								</h3>
								<p className="text-white/80 max-w-2xl mx-auto text-shadow-sm">
									ร่วมขับเคลื่อนอนาคตยานยนต์ไฟฟ้าไปกับทีมงาน Metromobile
									ผู้พร้อมให้บริการด้วยความเชี่ยวชาญและหัวใจ
								</p>
							</div>
						</div>
					</motion.div>

					<div className="grid grid-cols-1 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
						<motion.div
							variants={fadeInUp}
							// Adjusted card background and border for dark theme
							className="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300"
						>
							<h3 className="text-xl sm:text-2xl font-prompt font-bold mb-3 sm:mb-4 text-blue-400">
								วิสัยทัศน์ของเรา
							</h3>
							<p className="text-base sm:text-lg mb-3 sm:mb-4 text-gray-300">
								<span className="text-gradient-metro">Metromobile</span> คือ
								ศูนย์รวมนวัตกรรมยานยนต์แห่งโลกอนาคต ที่พร้อมจะพาคุณขับเคลื่อน
								สู่โลกเเละสิ่งเเวดล้อมในฝันที่ดีขึ้น
								ผ่านเทคโนโลยีและยานยนต์พลังงานรูปแบบใหม่ที่นอกจากจะเป็นมิตรกับสิ่งเเวดล้อมเเล้ว
							</p>
							<p className="text-base sm:text-lg text-gray-300">
								<span className="text-gradient-metro">Metromobile</span>
								ยังพร้อมให้บริการดูเเลรักษาให้คําปรึกษาทุกเรื่องที่เกี่ยวกับรถยนต์
								ผ่านบริการหลังการขาย
								ที่ครบวงจรโดยผู้เชี่ยวชาญเพื่อให้ทุกการเดินทางของคุณอบอุ่น
								ปลอดภัย ในทุกเส้นทาง
							</p>
						</motion.div>
					</div>

					<motion.div
						variants={fadeInUp}
						// Adjusted background and text colors for dark theme
						className="bg-blue-600/20 p-8 md:p-12 rounded-2xl border border-blue-600/30 mb-16 text-center shadow-xl shadow-blue-500/15"
					>
						<h3 className="text-2xl md:text-3xl font-prompt font-bold mb-4 text-blue-300">
							"เพราะเราเชื่อว่า รถ ไม่ใช่เเค่ยานพาหนะ"
						</h3>
						<p className="text-xl max-w-2xl mx-auto text-blue-200">
							แต่มันคือจุดเชื่อมต่อของ Lifestyle ที่บ่งบอกถึงคุณค่า
							ความภาคภูมิใจ ประสบการณ์ และความทรงจำ
							ตลอดระยะเวลาการเดินทางของชีวิต
						</p>
					</motion.div>

					<motion.div
						variants={fadeInUp}
						className="space-y-6 text-lg max-w-3xl mx-auto text-gray-300"
					>
						<p>
							บริษัท{" "}
							<span className="text-gradient-metro-slow">เมโทรโมบิล</span> จำกัด
							(<span className="text-gradient-wave">Metromobile</span>)
							ผู้จำหน่ายรถยนต์ BYD อย่างเป็นทางการ ในนาม BYD{" "}
							<span className="text-gradient-metro">Metromobile</span>
							พร้อมยืนหนึ่งในด้านประสบการณ์ และความชำนาญ
							ตั้งแต่นวัตกรรมเครื่องยนต์ สมรรถนะการซ่อมแซม และบำรุงรักษา
							ที่สามารถตอบโจทย์ให้แก่ผู้ใช้บริการมาหลายยุคหลายสมัย
						</p>
						<p>
							ภายใต้ "ความเชื่อมั่นและไว้วางใจ"
							ที่ลูกค้าทุกท่านมีให้แก่เราทีมงาน{" "}
							<span className="text-gradient-metro">Metromobile</span>
							ขอให้คำมั่นสัญญาที่จะดูแล ให้คำแนะนำ และส่งมอบรถยนต์ BYD
							พร้อมกับการบริการหลังการขายที่จะสร้างรอยยิ้มและความประทับใจ
							ให้แก่ลูกค้าทุกท่านตลอดไป
						</p>
						<p className="flex items-center gap-2">
							<span>เรียนรู้เพิ่มเติมเกี่ยวกับเทคโนโลยีรถยนต์ไฟฟ้าได้ที่</span>
							<a
								href="https://www.evat.or.th"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-400 inline-flex items-center gap-1 hover:underline transition-colors duration-300"
							>
								สมาคมยานยนต์ไฟฟ้าไทย
								<ExternalLink className="h-4 w-4" />
							</a>
						</p>
					</motion.div>
				</div>
			</motion.section>

			{/* Business Partners Section */}
			<motion.section
				id="business-partners"
				className="py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h2 className="text-3xl md:text-5xl font-prompt font-bold mb-6 text-gray-100">
							พันธมิตรทางธุรกิจ
						</h2>
						<p className="text-xl text-gray-300">
							"Metromobile" เป็นบริษัทที่ก่อตั้งโดยพันธมิตรทางธุรกิจชั้นนำ
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
						<motion.div
							variants={fadeInUp}
							// Adjusted card background and border for dark theme
							className="bg-gray-800 text-gray-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-700"
						>
							<div className="flex justify-center mb-6">
								<Image
									src="/images/A-Motor-Logo.jpg" // Placeholder for A-Motor Group Logo
									alt="โลโก้ เอ มอเตอร์ กรุ๊ป - พันธมิตรของ เมโทรโมบิล"
									fill
									className="h-auto"
								/>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								บริษัท เอ มอเตอร์ กรุ๊ป จำกัด
							</h3>
							<p className="text-lg text-gray-300">
								ผู้นำเข้า และจำหน่ายรถยนต์หรู
								และผู้เชี่ยวชาญในวงการรถยนต์หรูที่มีประสบการณ์ด้านงานซ่อมบำรุง
								รถยนต์มายาวนานกว่า 30 ปี
							</p>
							<div className="flex justify-center mt-6">
								<a
									href="https://www.facebook.com/A.MotorsGroup"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
								>
									<span>เยี่ยมชมเว็บไซต์</span>
									<ExternalLink className="h-4 w-4" />
								</a>
							</div>
						</motion.div>

						<motion.div
							variants={fadeInUp}
							// Adjusted card background and border for dark theme
							className="bg-gray-800 text-gray-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-700"
						>
							<div className="flex justify-center mb-6">
								<div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-md">
									<img
										src="https://placehold.co/128x128/60A5FA/ffffff?text=Dr+Pat" // Placeholder for Dr Pat Photo - changed to a more professional avatar style
										alt="ดร. ภัทร จึงกานต์กุล - พันธมิตรของ เมโทรโมบิล"
										style={{
											objectFit: "cover",
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								ดร. ภัทร จึงกานต์กุล
							</h3>
							<p className="text-lg text-gray-300">
								นักธุรกิจ-นักลงทุน ด้านธุรกิจพลังงานทางเลือก และ Sustainability
								ecosystem
								ผู้เชี่ยวชาญด้านการสื่อสารประชาสัมพันธ์ด้วยประสบการณ์ด้านสื่อสารมวลชนมากกว่า
								20 ปี
							</p>
							{/* No external link provided for Dr. Pat, so no link button */}
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Services Section */}
			<motion.section
				id="our-services"
				className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h2 className="text-3xl md:text-5xl font-prompt font-bold mb-6 text-gray-100">
							บริการของเรา
						</h2>
						<p className="text-xl text-gray-300">
							บริการครบวงจรสำหรับรถยนต์ไฟฟ้า BYD ของคุณ
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
						<motion.div
							variants={fadeInUp}
							// Adjusted card background and border for dark theme
							className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-gray-700"
						>
							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
							{/* Image with hover effect */}
							<div className="relative h-[400px] w-full overflow-hidden">
								<img
									src="https://placehold.co/800x400/303030/ffffff?text=Trade-in+Service" // Placeholder for Trade-in service image
									alt="บริการรถเก่าแลกใหม่ โดย เมโทรโมบิล"
									style={{ objectFit: "cover", width: "100%", height: "100%" }}
								/>
							</div>
							{/* Content Overlay */}
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-shadow-md">
									รถเก่าแลกใหม่ (Trade-in)
								</h3>
								<p className="text-white/90 mb-6 max-w-md text-shadow-sm">
									Metromobile ร่วมกับบริษัทพันธมิตรในเครือ
									รับซื้อรถยนต์คันเก่าเพื่อแลกรถยนต์คันใหม่
									ด้วยข้อเสนอที่ดีกว่าและคุณค่ากว่าตลาด
								</p>
								<a
									href="/services/trade-in"
									// Adjusted button styles for dark theme contrast
									className="inline-flex items-center gap-2 text-blue-600 bg-white px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors shadow-md hover:shadow-lg"
								>
									<span>ดูรายละเอียดเพิ่มเติม</span>
									<ChevronRight className="h-4 w-4" />
								</a>
							</div>
						</motion.div>

						<motion.div
							variants={fadeInUp}
							// Adjusted card background and border for dark theme
							className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-gray-700"
						>
							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
							{/* Image with hover effect */}
							<div className="relative h-[400px] w-full overflow-hidden">
								<img
									src="https://placehold.co/800x400/303030/ffffff?text=After-Sales+Service" // Placeholder for After-Sales service image
									alt="บริการหลังการขายและซ่อมบำรุง โดย เมโทรโมบิล"
									style={{ objectFit: "cover", width: "100%", height: "100%" }}
								/>
							</div>
							{/* Content Overlay */}
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-shadow-md">
									บริการหลังการขายและงานซ่อมบำรุง
								</h3>
								<p className="text-white/90 mb-6 max-w-md text-shadow-sm">
									บริการครบวงจรโดยผู้เชี่ยวชาญที่มีประสบการณ์กว่า 30 ปี พร้อม EV
									Expert ที่สามารถซ่อมบำรุงรถยนต์พลังงานไฟฟ้าที่แรกๆของไทย
								</p>
								<a
									href="/services/after-sales"
									// Adjusted button styles for dark theme contrast
									className="inline-flex items-center gap-2 text-blue-600 bg-white px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors shadow-md hover:shadow-lg"
								>
									<span>ดูรายละเอียดเพิ่มเติม</span>
									<ChevronRight className="h-4 w-4" />
								</a>
							</div>
						</motion.div>
					</div>

					{/* FAQ Section */}
					<motion.div
						variants={fadeInUp}
						// Adjusted card background and border for dark theme
						className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700"
					>
						<h3 className="text-2xl md:text-3xl font-prompt font-bold text-center mb-8 text-gray-100">
							คำถามที่พบบ่อย
						</h3>

						<Accordion type="single" collapsible className="w-full">
							<AccordionItem
								value="item-1"
								// Adjusted accordion item styles for dark theme
								className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-md px-2"
							>
								<AccordionTrigger className="text-lg font-medium py-4 text-gray-200 hover:text-blue-400 transition-colors">
									เมโทรโมบิลมีสาขาที่ไหนบ้าง?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4 text-gray-300">
									ปัจจุบัน เมโทรโมบิลมีสาขาให้บริการในกรุงเทพฯ และปริมณฑล
									สามารถดูรายละเอียดสาขาทั้งหมดได้ที่หน้า
									<a
										href="/contact-us"
										className="text-blue-400 hover:underline ml-1 transition-colors duration-300"
									>
										ติดต่อเรา
									</a>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-2"
								// Adjusted accordion item styles for dark theme
								className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-md px-2"
							>
								<AccordionTrigger className="text-lg font-medium py-4 text-gray-200 hover:text-blue-400 transition-colors">
									รถยนต์ BYD มีรุ่นอะไรบ้างในประเทศไทย?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4 text-gray-300">
									BYD มีรถยนต์หลากหลายรุ่นในประเทศไทย ทั้ง ATTO 3, DOLPHIN, SEAL
									และอื่นๆ สามารถดูรายละเอียดทั้งหมดได้ที่หน้า
									<a
										href="/models"
										className="text-blue-400 hover:underline ml-1 transition-colors duration-300"
									>
										รุ่นรถยนต์
									</a>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-3"
								// Adjusted accordion item styles for dark theme
								className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-md px-2"
							>
								<AccordionTrigger className="text-lg font-medium py-4 text-gray-200 hover:text-blue-400 transition-colors">
									มีบริการซ่อมบำรุงรถยนต์ไฟฟ้าหรือไม่?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4 text-gray-300">
									เมโทรโมบิลมีบริการซ่อมบำรุงรถยนต์ไฟฟ้าครบวงจร
									โดยทีมช่างผู้เชี่ยวชาญที่ผ่านการอบรมจาก BYD โดยตรง
									สามารถดูรายละเอียดเพิ่มเติมได้ที่หน้า
									<a
										href="/services/after-sales"
										className="text-blue-400 hover:underline ml-1 transition-colors duration-300"
									>
										บริการหลังการขาย
									</a>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-4"
								// Adjusted accordion item styles for dark theme
								className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 rounded-md px-2"
							>
								<AccordionTrigger className="text-lg font-medium py-4 text-gray-200 hover:text-blue-400 transition-colors">
									การชาร์จรถยนต์ไฟฟ้า BYD ทำได้อย่างไร?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4 text-gray-300">
									รถยนต์ไฟฟ้า BYD สามารถชาร์จได้ทั้งที่บ้านด้วย Wall Charger
									และที่สถานีชาร์จสาธารณะ ทาง BYD
									มีเครือข่ายสถานีชาร์จทั่วประเทศ และสามารถใช้แอปพลิเคชัน BYD
									App เพื่อค้นหาสถานีชาร์จที่ใกล้ที่สุดได้
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-5"
								// Adjusted accordion item styles for dark theme
								className="hover:bg-gray-700 transition-colors duration-200 rounded-md px-2"
							>
								<AccordionTrigger className="text-lg font-medium py-4 text-gray-200 hover:text-blue-400 transition-colors">
									รถยนต์ไฟฟ้า BYD มีการรับประกันอย่างไร?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4 text-gray-300">
									รถยนต์ไฟฟ้า BYD มีการรับประกันตัวรถ 6 ปี หรือ 150,000 กิโลเมตร
									และรับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กิโลเมตร
									(แล้วแต่อย่างใดถึงก่อน) นอกจากนี้ยังมีบริการช่วยเหลือฉุกเฉิน
									24 ชั่วโมง ตลอดระยะเวลารับประกัน
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</motion.div>
				</div>
			</motion.section>

			{/* CTA Section */}
			<section className="py-16 bg-blue-600/10 shadow-inner">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-prompt font-bold mb-6 text-blue-300">
						พร้อมสัมผัสประสบการณ์การขับขี่ที่
						<span className="text-gradient-wave">เหนือระดับ</span>
					</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto text-blue-200">
						มาร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลงสู่อนาคตที่ยั่งยืนกับ BYD
						<span className="text-gradient-metro"> Metromobile</span>
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Button
							size="lg"
							className="rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
						>
							ดูรถยนต์ของเรา
							<ChevronRight className="ml-1 h-4 w-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							// Adjusted button styles for dark theme contrast
							className="rounded-full font-medium bg-transparent text-blue-400 border-blue-400 hover:bg-blue-400/10 hover:text-blue-300 shadow-lg hover:shadow-xl transition-all duration-300"
						>
							ติดต่อเรา
							<ChevronRight className="ml-1 h-4 w-4" />
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
