"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";

// Animation variants for Framer Motion
const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 1, ease: "easeOut" },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.3,
		},
	},
};

export default function AboutPage() {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

	return (
		// Main container with scroll snap
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 font-inter scroll-smooth">
			{/* HERO SECTION */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-align-start">
				<motion.div
					className="absolute inset-0 z-0 w-full h-full"
					style={{ y }}
				>
					<Image
						src="/images/about/Showroom-1024x618.jpg"
						alt="BYD Metromobile - Official Dealer"
						fill
						priority
						sizes="100vw"
						className="object-cover w-full h-full brightness-40"
					/>
				</motion.div>

				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>

				<div className="container relative z-10 px-4 mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.2 }}
						className="max-w-4xl mx-auto card-padding bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10"
					>
						<motion.h1
							className="hero-title text-shadow-byd"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							เกี่ยวกับเรา
						</motion.h1>
						<motion.p
							className="hero-subtitle content-spacing text-shadow-md"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							<span className="text-byd-blue font-bold">BYD Metromobile</span>
							<br />
							ผู้นำด้านรถยนต์ไฟฟ้าแห่งอนาคต
						</motion.p>
						<motion.div
							className="flex flex-wrap justify-center gap-4"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
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
								className="rounded-full font-medium bg-transparent text-white border-white hover:bg-white/10 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								ติดต่อเรา
								<ChevronRight className="ml-1 h-4 w-4" />
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* INTRODUCTION SECTION: BYD METROMOBILE */}
			<motion.section
				className="section-padding bg-gradient-to-b from-gray-900 to-gray-800 relative scroll-snap-align-start"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<motion.div variants={fadeInUp} className="order-2 lg:order-1">
							<div className="space-y-8">
								<motion.h2
									className="section-title text-gradient-electric"
									variants={fadeInUp}
								>
									BYD Metromobile
								</motion.h2>
								<motion.div className="space-y-6" variants={fadeInUp}>
									<p className="body-text-large">
										<strong className="text-blue-400">
											บริษัท เมโทรโมบิล จำกัด
										</strong>
										เป็นผู้จำหน่ายและศูนย์บริการรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ
										ที่เกิดจากการรวมพลังของ{" "}
										<strong className="text-gray-200">
											3 องค์กรชั้นนำแห่งวงการยานยนต์ไทย
										</strong>
										เพื่อมอบประสบการณ์การเป็นเจ้าของรถยนต์ไฟฟ้าที่สมบูรณ์แบบ
									</p>
									<p className="body-text">
										เรามุ่งมั่นเป็น{" "}
										<strong className="text-blue-300">
											พันธมิตรที่เชื่อถือได้
										</strong>
										ในการเดินทางสู่อนาคตที่ยั่งยืน
										ด้วยโชว์รูมและศูนย์บริการครบวงจร
										พร้อมทีมงานที่ผ่านการอบรมมาตรฐานสากลจาก BYD
									</p>
								</motion.div>
							</div>
						</motion.div>
						<motion.div
							variants={fadeIn}
							className="order-1 lg:order-2 flex justify-center"
						>
							<motion.div
								className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
							>
								<Image
									src="/images/about/metromobile-team-lineup.jpg"
									alt="ทีมงาน BYD Metromobile"
									fill
									className="object-cover w-full h-full"
								/>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* PILLARS OF SUCCESS SECTION */}
			<motion.section
				className="section-padding bg-gradient-to-b from-gray-800 to-gray-900 relative"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-4xl mx-auto content-spacing"
					>
						<h2 className="section-title text-gradient-byd content-spacing">
							เสาหลักแห่งความสำเร็จ
						</h2>
						<p className="section-subtitle">
							ความแข็งแกร่งของเราเกิดจากการรวมพลังของ 3 องค์กรชั้นนำ
							ที่มีประสบการณ์และความเชี่ยวชาญที่แตกต่างกัน
						</p>
					</motion.div>

					{/* 3 Pillars Professional Layout */}
					<div className="flex flex-col md:flex-row gap-8 mb-16">
						{/* KCAR Group - Foundation Pillar */}
						<motion.div
							variants={fadeInUp}
							className="flex-1 bg-slate-900/60 backdrop-blur-sm card-padding rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
						>
							<div className="text-center">
								<div className="mb-8">
									<div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 inline-flex items-center justify-center h-40 w-40">
										<Image
											src="/images/about/KCAR-Logo.png"
											alt="โลโก้ KCAR Group"
											width={120}
											height={120}
											className="object-contain opacity-90"
										/>
									</div>
								</div>
								<h3 className="card-title text-white mb-4">KCAR Group</h3>
								<p className="text-sm text-blue-300 mb-4 font-medium">
									เสาหลักแห่งความมั่นคง
								</p>
								<p className="body-text text-slate-300 text-left">
									รากฐานที่แข็งแกร่งจาก{" "}
									<strong className="text-blue-400">KCAR Group</strong>{" "}
									บริษัทมหาชนที่มีประสบการณ์ในอุตสาหกรรมยานยนต์ไทยกว่า 30 ปี
									เป็นหลักประกันความมั่นคงและมาตรฐานการบริการระดับสูง
								</p>
							</div>
						</motion.div>

						{/* A Motor Group - Service Excellence */}
						<motion.div
							variants={fadeInUp}
							className="flex-1 bg-slate-900/60 backdrop-blur-sm card-padding rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
						>
							<div className="text-center">
								<div className="mb-8">
									<div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 inline-flex items-center justify-center h-40 w-40">
										<Image
											src="/images/about/A-Motor-Logo.jpg"
											alt="โลโก้ A Motor Group"
											width={120}
											height={48}
											className="object-contain opacity-90"
										/>
									</div>
								</div>

								<h3 className="card-title text-white mb-4">A Motor Group</h3>
								<p className="text-sm text-blue-300 mb-4 font-medium">
									เสาหลักแห่งความเป็นเลิศ
								</p>

								<p className="body-text text-slate-300 text-left">
									สืบทอดความเชี่ยวชาญด้านการขายและบริการหลังการขายจาก{" "}
									<strong className="text-blue-400">A Motor Group</strong>
									ผู้บุกเบิกในวงการรถยนต์หรูและศูนย์บริการมาตรฐานสูง
									ทำให้คุณมั่นใจได้ว่ารถยนต์ BYD
									ของคุณจะได้รับการดูแลอย่างมืออาชีพ
								</p>
							</div>
						</motion.div>

						{/* Dr. Pat - Vision Leadership */}
						<motion.div
							variants={fadeInUp}
							className="flex-1 bg-slate-900/60 backdrop-blur-sm card-padding rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
						>
							{/* Professional Photo Background */}
							<div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
								<Image
									src="/images/about/dr-patr.png"
									alt="ดร. ภัทร จึงกานต์กุล"
									fill
									className="object-cover object-center opacity-90 grayscale-25"
									style={{
										maskImage:
											"linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
										WebkitMaskImage:
											"linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
									}}
								/>
							</div>

							<div className="relative z-10 h-full flex flex-col justify-between md:justify-end">
								{/* Spacer to add height on mobile/tablet, hidden on desktop */}
								<div className="h-40 md:hidden" />

								{/* Content */}
								<div>
									<div className="mb-6">
										<h3 className="card-title text-white mb-2">
											ดร. ภัทร จึงกานต์กุล
										</h3>
										<p className="text-sm text-blue-300 mb-4 font-medium">
											เสาหลักแห่งวิสัยทัศน์
										</p>
									</div>

									<div className="max-w-md">
										<p className="body-text text-slate-300 mb-4">
											นักธุรกิจและนักลงทุนผู้มีวิสัยทัศน์กว้างไกลด้านพลังงานทางเลือก
											และระบบนิเวศของความยั่งยืน
										</p>
										<p className="text-sm text-slate-400">
											มอบทิศทางการพัฒนาที่มุ่งสู่อนาคตอย่างยั่งยืนและเป็นมิตรกับสิ่งแวดล้อม
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* OUR PROMISE SECTION */}
			<motion.section
				className="section-padding bg-slate-900 relative scroll-snap-align-start"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-4xl mx-auto content-spacing"
					>
						<h2 className="section-title text-white content-spacing">
							สิ่งที่คุณจะได้รับจากเรา
						</h2>
						<p className="section-subtitle text-slate-400 mb-12">
							Our Commitment to Excellence
						</p>
					</motion.div>

					<motion.div
						variants={fadeInUp}
						className="bg-slate-800/60 backdrop-blur-sm card-padding rounded-2xl border border-slate-700/50 shadow-xl max-w-5xl mx-auto"
					>
						<div className="space-y-8">
							<p className="body-text-large text-slate-200 leading-relaxed text-center">
								จากการรวมพลังของทั้ง 3 เสาหลัก ทำให้{" "}
								<span className="text-white font-semibold">
									BYD Metromobile
								</span>{" "}
								สามารถมอบประสบการณ์ที่แตกต่างและเหนือกว่าให้แก่คุณ
							</p>

							<div className="grid md:grid-cols-3 gap-6 mt-8">
								<div className="text-center p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
									<div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<div className="w-6 h-6 bg-blue-500 rounded-full"></div>
									</div>
									<h4 className="font-semibold text-white mb-2">ความมั่นคง</h4>
									<p className="text-sm text-slate-400">
										ประสบการณ์กว่า 30 ปี ในวงการยานยนต์
									</p>
								</div>

								<div className="text-center p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
									<div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<div className="w-6 h-6 bg-blue-500 rounded-full"></div>
									</div>
									<h4 className="font-semibold text-white mb-2">
										ความเป็นเลิศ
									</h4>
									<p className="text-sm text-slate-400">
										บริการมาตรฐานสูงจากผู้เชี่ยวชาญ
									</p>
								</div>

								<div className="text-center p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
									<div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<div className="w-6 h-6 bg-blue-500 rounded-full"></div>
									</div>
									<h4 className="font-semibold text-white mb-2">วิสัยทัศน์</h4>
									<p className="text-sm text-slate-400">
										ทิศทางสู่อนาคตที่ยั่งยืน
									</p>
								</div>
							</div>

							<p className="body-text text-slate-300 text-center mt-8">
								เลือกเราเพื่อประสบการณ์การเป็นเจ้าของรถยนต์ไฟฟ้า BYD
								ที่สมบูรณ์แบบ
							</p>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* FAQ SECTION */}
			<motion.section
				className="section-padding bg-gradient-to-b from-gray-800 to-gray-900 relative scroll-snap-align-start"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto content-spacing"
					>
						<h2 className="section-title text-gradient-byd content-spacing">
							คำถามที่พบบ่อย
						</h2>
					</motion.div>

					<motion.div
						variants={fadeInUp}
						className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg border border-gray-700 card-padding"
					>
						<Accordion type="single" collapsible className="w-full space-y-4">
							<AccordionItem
								value="item-1"
								className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-200 rounded-md px-4"
							>
								<AccordionTrigger className="card-subtitle py-6 text-gray-200 hover:text-blue-400 transition-colors">
									ทำไมควรเลือกซื้อรถ BYD กับ Metromobile?
								</AccordionTrigger>
								<AccordionContent className="body-text pb-6 text-gray-300">
									เราเป็นส่วนหนึ่งของ KCAR Group
									ที่มีประสบการณ์ในวงการยานยนต์กว่า 30 ปี
									พร้อมทีมงานที่ผ่านการอบรมมาตรฐานสากลจาก BYD
									มอบความมั่นใจในบริการหลังการขายที่เหนือกว่าและความเชี่ยวชาญที่พร้อมดูแลคุณในระยะยาว
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-2"
								className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-200 rounded-md px-4"
							>
								<AccordionTrigger className="card-subtitle py-6 text-gray-200 hover:text-blue-400 transition-colors">
									Metromobile มีสาขาที่ไหนบ้าง?
								</AccordionTrigger>
								<AccordionContent className="body-text pb-6 text-gray-300">
									ปัจจุบันเรามีโชว์รูมและศูนย์บริการครบวงจร 5 สาขา ได้แก่
									สาขาพระราม 3, ตลิ่งชัน, อ่อนนุช, รามอินทรา กม.9 และ RCA-พระราม
									9 คุณสามารถดูรายละเอียดแผนที่และข้อมูลการติดต่อได้ที่หน้า
									<Link
										href="/contact-us"
										className="text-blue-400 hover:underline ml-1 transition-colors duration-300"
									>
										"ติดต่อเรา"
									</Link>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-3"
								className="hover:bg-gray-700/30 transition-colors duration-200 rounded-md px-4"
							>
								<AccordionTrigger className="card-subtitle py-6 text-gray-200 hover:text-blue-400 transition-colors">
									มีบริการ Trade-in (รถเก่าแลกใหม่) หรือไม่?
								</AccordionTrigger>
								<AccordionContent className="body-text pb-6 text-gray-300">
									เรามีบริการรับเทิร์นรถเก่าทุกยี่ห้อ
									ด้วยทีมงานผู้เชี่ยวชาญที่พร้อมประเมินราคารถยนต์ของคุณอย่างโปร่งใส
									ให้ข้อเสนอที่คุ้มค่าและยุติธรรม
									เปลี่ยนรถคันเก่าเป็นรถยนต์ไฟฟ้า BYD คันใหม่ได้ง่ายๆ
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</motion.div>
				</div>
			</motion.section>

			{/* CALL TO ACTION SECTION */}
			<section className="section-padding bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-blue-600/10 relative scroll-snap-align-start">
				<div className="container mx-auto px-4 text-center">
					<motion.h2
						className="section-title text-gradient-electric content-spacing"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						พร้อมสัมผัสประสบการณ์ที่
						<span className="text-glow-byd">เหนือกว่า</span>
					</motion.h2>
					<motion.p
						className="section-subtitle content-spacing max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						มาร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลงสู่อนาคตที่ยั่งยืนกับ
						<span className="text-gradient-byd font-bold">
							{" "}
							BYD Metromobile
						</span>
					</motion.p>
					{/* รวมปุ่มเป็นปุ่มเดียว พร้อมเมนู dropdown เลือกรุ่น หรือเลือกติดต่อเราได้เลยนะคะ */}
					<motion.div
						className="flex flex-wrap justify-center gap-6"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<div className="relative inline-block">
							{/* ปุ่มหลัก */}
							<Popover>
								<PopoverTrigger asChild>
									<Button
										size="lg"
										className="font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-10 py-4 text-xl flex items-center gap-2"
									>
										เลือกดูรุ่นรถ
										<ChevronRight className="ml-2 h-5 w-5" />
									</Button>
								</PopoverTrigger>
								<PopoverContent align="center" className="min-w-[220px]">
									{/* รายการรุ่นรถ */}
									{[
										{ name: "ATTO 3", slug: "byd-atto-3" },
										{ name: "DOLPHIN", slug: "byd-dolphin" },
										{ name: "SEAL", slug: "byd-seal" },
										{ name: "M6", slug: "byd-m6" },
										{ name: "SEALION 6DMI", slug: "byd-sealion-6-dmi" },
										{ name: "SEALION 7", slug: "byd-sealion-7" },
									].map((model) => (
										<div
											key={model.slug}
											className="flex items-center gap-2 w-full px-3 py-2 text-base text-blue-700 hover:bg-blue-50 transition-colors"
										>
											<Link href={`/models/${model.slug}`}>
												ดู {model.name}
											</Link>
											<ChevronRight className="h-4 w-4" />
										</div>
									))}
								</PopoverContent>
							</Popover>
						</div>
						{/* ปุ่มติดต่อเรา (สำรอง) */}
						<Button
							size="lg"
							variant="outline"
							className="font-medium bg-transparent text-blue-400 border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-300 hover:border-blue-300 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-10 py-4 text-xl"
						>
							<Link href="/contact-us">
								ติดต่อเรา
								<ChevronRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
