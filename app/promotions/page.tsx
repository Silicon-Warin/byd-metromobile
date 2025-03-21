"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PromotionSection } from "@/components/PromotionSection";
import { Suspense } from "react";
import {
	Clock,
	Calendar,
	Award,
	Gift,
	ChevronRight,
	Star,
	Users,
	Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromotionsPage() {
	return (
		<Suspense fallback={<PromotionPageSkeleton />}>
			<PromotionsContent />
		</Suspense>
	);
}

function PromotionPageSkeleton() {
	return (
		<div className="min-h-screen bg-black">
			<div className="h-[60vh] bg-gray-900/50 animate-pulse"></div>
			<div className="container mx-auto px-4 py-12">
				<div className="w-1/2 h-8 bg-gray-800 animate-pulse mb-8 mx-auto rounded"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="bg-gray-800/50 h-80 rounded-xl animate-pulse"
						></div>
					))}
				</div>
			</div>
		</div>
	);
}

function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState({
		days: 3,
		hours: 12,
		minutes: 30,
		seconds: 0,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				let { days, hours, minutes, seconds } = prev;

				if (seconds > 0) {
					seconds -= 1;
				} else {
					seconds = 59;
					if (minutes > 0) {
						minutes -= 1;
					} else {
						minutes = 59;
						if (hours > 0) {
							hours -= 1;
							if (days > 0) {
								days -= 1;
							} else {
								// Reset or handle end of countdown
								clearInterval(timer);
							}
						}
					}
				}

				return { days, hours, minutes, seconds };
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex justify-center gap-4 md:gap-6 text-center">
			{[
				{ label: "วัน", value: timeLeft.days },
				{ label: "ชั่วโมง", value: timeLeft.hours },
				{ label: "นาที", value: timeLeft.minutes },
				{ label: "วินาที", value: timeLeft.seconds },
			].map((item, index) => (
				<div key={index} className="flex flex-col items-center">
					<div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mb-2">
						<span className="text-2xl md:text-3xl font-bold text-white">
							{item.value.toString().padStart(2, "0")}
						</span>
					</div>
					<span className="text-xs md:text-sm text-gray-400">{item.label}</span>
				</div>
			))}
		</div>
	);
}

interface TestimonialCardProps {
	name: string;
	role: string;
	quote: string;
	rating: number;
}

function TestimonialCard({ name, role, quote, rating }: TestimonialCardProps) {
	return (
		<motion.div
			className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-primary/30 transition-all duration-300"
			whileHover={{
				y: -5,
				boxShadow: "0 10px 30px -15px rgba(0, 160, 233, 0.2)",
			}}
		>
			<div className="flex items-center gap-1 mb-4">
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`h-4 w-4 ${
							i < rating ? "text-yellow-400" : "text-gray-600"
						}`}
						fill={i < rating ? "#FACC15" : "none"}
					/>
				))}
			</div>
			<p className="text-gray-300 mb-6 italic">"{quote}"</p>
			<div className="flex items-center gap-3">
				<div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
					<Users className="h-5 w-5 text-primary" />
				</div>
				<div>
					<p className="font-semibold text-white">{name}</p>
					<p className="text-sm text-gray-400">{role}</p>
				</div>
			</div>
		</motion.div>
	);
}

function PromotionsContent() {
	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<section className="flex min-h-screen flex-col bg-black text-white">
			{/* Hero Section */}
			<motion.section
				className="relative h-[60vh] md:h-[70vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>

				{/* Content */}
				<div className="container mx-auto px-4 h-full flex items-center justify-center text-white relative z-10">
					<div className="text-center max-w-4xl">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
								ข้อเสนอพิเศษ - จำกัดเวลา
							</span>
						</motion.div>

						<motion.h1
							className="text-4xl md:text-6xl font-bold mb-6"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
								โปรโมชั่นพิเศษ
							</span>
							<br />
							สำหรับรถยนต์ไฟฟ้า BYD
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-gray-300 mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							รับส่วนลดและสิทธิประโยชน์มากมายเมื่อจองรถยนต์ไฟฟ้า BYD ภายในวันนี้
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="mb-8"
						>
							<CountdownTimer />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							<Link
								href="https://line.me/R/ti/p/%40bydmetromobile"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									size="lg"
									className="bg-primary hover:bg-primary/90 text-white group px-6 py-6 text-lg"
								>
									รับข้อเสนอพิเศษวันนี้
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Button>
							</Link>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Benefits Section */}
			<motion.section
				className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							สิทธิประโยชน์พิเศษ
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							เมื่อซื้อรถยนต์ไฟฟ้า BYD ในช่วงแคมเปญนี้
							คุณจะได้รับสิทธิประโยชน์มากมาย
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{[
							{
								icon: <Gift className="h-8 w-8 text-primary" />,
								title: "ฟรีประกันภัยชั้น 1",
								description:
									"รับประกันภัยชั้น 1 ฟรี 1 ปีเต็ม เมื่อซื้อรถยนต์ BYD ทุกรุ่น",
							},
							{
								icon: <Calendar className="h-8 w-8 text-primary" />,
								title: "บริการฟรี 5 ปี",
								description:
									"บริการตรวจเช็คและบำรุงรักษาฟรี นาน 5 ปี หรือ 100,000 กม.",
							},
							{
								icon: <Award className="h-8 w-8 text-primary" />,
								title: "รับประกันแบตเตอรี่",
								description: "รับประกันแบตเตอรี่นานถึง 8 ปี ไม่จำกัดระยะทาง",
							},
							{
								icon: <Clock className="h-8 w-8 text-primary" />,
								title: "ช่วยเหลือฉุกเฉิน",
								description:
									"บริการช่วยเหลือฉุกเฉิน 24 ชั่วโมง ฟรีตลอดระยะเวลารับประกัน",
							},
						].map((benefit, index) => (
							<motion.div
								key={index}
								variants={fadeIn}
								className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-primary/30 transition-all duration-300"
							>
								<div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
									{benefit.icon}
								</div>
								<h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
								<p className="text-gray-400">{benefit.description}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.section>

			{/* Promotions Section */}
			<motion.section
				className="py-16 md:py-24 bg-gray-900"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							โปรโมชั่นพิเศษ
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							เลือกรถยนต์ไฟฟ้า BYD ที่ใช่สำหรับคุณ พร้อมรับข้อเสนอสุดพิเศษ
						</p>
					</motion.div>

					<PromotionSection />
				</div>
			</motion.section>

			{/* Testimonials Section */}
			<motion.section
				className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							ลูกค้าของเราพูดถึงเรา
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							ความประทับใจจากลูกค้าที่ได้เป็นเจ้าของรถยนต์ไฟฟ้า BYD
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<TestimonialCard
							name="คุณสมชาย วงศ์สุข"
							role="เจ้าของ BYD ATTO 3"
							quote="ประทับใจมากกับสมรรถนะและระยะทางที่วิ่งได้ต่อการชาร์จ ระบบความปลอดภัยครบครัน คุ้มค่ากับราคาที่จ่ายไป"
							rating={5}
						/>
						<TestimonialCard
							name="คุณนภา จันทร์เพ็ญ"
							role="เจ้าของ BYD DOLPHIN"
							quote="ดีไซน์สวย ขับง่าย เหมาะกับการใช้งานในเมือง ประหยัดมาก ไม่ต้องกังวลเรื่องน้ำมันอีกต่อไป"
							rating={4}
						/>
						<TestimonialCard
							name="คุณวิชัย รักษ์ดี"
							role="เจ้าของ BYD SEAL"
							quote="สมรรถนะเทียบเท่ารถสปอร์ต แต่เป็นมิตรกับสิ่งแวดล้อม การตอบสนองดีเยี่ยม ระบบอัจฉริยะใช้งานง่าย"
							rating={5}
						/>
					</motion.div>
				</div>
			</motion.section>

			{/* FAQ Section */}
			<motion.section
				className="py-16 md:py-24 bg-black"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							คำถามที่พบบ่อย
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							ข้อสงสัยเกี่ยวกับโปรโมชั่นและรถยนต์ไฟฟ้า BYD
						</p>
					</motion.div>

					<div className="max-w-3xl mx-auto">
						{[
							{
								question: "โปรโมชั่นนี้มีระยะเวลาถึงเมื่อไหร่?",
								answer:
									"โปรโมชั่นนี้มีระยะเวลาถึงสิ้นเดือนนี้เท่านั้น หรือจนกว่าสินค้าจะหมด ขึ้นอยู่กับเงื่อนไขใดถึงก่อน",
							},
							{
								question: "การรับประกันแบตเตอรี่ครอบคลุมอะไรบ้าง?",
								answer:
									"การรับประกันแบตเตอรี่ครอบคลุมความบกพร่องจากการผลิตและการเสื่อมสภาพที่เกินกว่าปกติ โดยรับประกันว่าความจุแบตเตอรี่จะไม่ต่ำกว่า 70% ภายในระยะเวลารับประกัน",
							},
							{
								question: "มีบริการช่วยเหลือฉุกเฉินอะไรบ้าง?",
								answer:
									"บริการช่วยเหลือฉุกเฉินครอบคลุมการลากรถ การชาร์จแบตเตอรี่ฉุกเฉิน การช่วยเหลือในกรณีรถเสียกะทันหัน และบริการให้คำปรึกษาทางโทรศัพท์ตลอด 24 ชั่วโมง",
							},
							{
								question: "สามารถนำรถเก่ามาแลกซื้อได้หรือไม่?",
								answer:
									"ได้ เรามีบริการประเมินราคารถเก่าทุกรุ่นทุกยี่ห้อ เพื่อนำมาเป็นส่วนลดในการซื้อรถยนต์ไฟฟ้า BYD รุ่นใหม่",
							},
						].map((faq, index) => (
							<motion.div
								key={index}
								variants={fadeIn}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								className="mb-6"
							>
								<h3 className="text-xl font-bold mb-2 text-white">
									{faq.question}
								</h3>
								<p className="text-gray-400">{faq.answer}</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Contact/CTA Section */}
			<motion.section
				className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>

				<div className="container mx-auto px-4 text-center relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
					>
						<span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
							ข้อเสนอจำกัดเวลา
						</span>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
							อย่าพลาดโอกาสรับข้อเสนอพิเศษ
						</h2>
						<p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-gray-300">
							ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำแนะนำเกี่ยวกับรถยนต์ไฟฟ้า BYD
							และโปรโมชั่นที่เหมาะกับความต้องการของคุณ
						</p>

						<div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl max-w-3xl mx-auto mb-10">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										ชื่อ-นามสกุล
									</label>
									<input
										type="text"
										className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
										placeholder="กรุณากรอกชื่อ-นามสกุล"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										เบอร์โทรศัพท์
									</label>
									<input
										type="tel"
										className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
										placeholder="กรุณากรอกเบอร์โทรศัพท์"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										อีเมล
									</label>
									<input
										type="email"
										className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
										placeholder="กรุณากรอกอีเมล"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										รุ่นรถที่สนใจ
									</label>
									<select className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50">
										<option value="">เลือกรุ่นรถที่สนใจ</option>
										<option value="atto3">BYD ATTO 3</option>
										<option value="dolphin">BYD DOLPHIN</option>
										<option value="seal">BYD SEAL</option>
										<option value="other">รุ่นอื่นๆ</option>
									</select>
								</div>
							</div>

							<Button
								size="lg"
								className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
							>
								รับข้อเสนอพิเศษวันนี้
							</Button>

							<p className="text-xs text-gray-500 mt-4">
								ข้อมูลของคุณจะถูกเก็บเป็นความลับตาม
								<a href="#" className="text-primary hover:underline">
									นโยบายความเป็นส่วนตัว
								</a>
								ของเรา
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
							<div className="flex items-center gap-2">
								<Clock className="h-5 w-5 text-primary" />
								<span className="text-gray-400">
									เปิดให้บริการทุกวัน 8:30 - 19:00 น.
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-5 w-5 text-primary" />
								<span className="text-gray-400">โทร: 02-123-4567</span>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>
		</section>
	);
}
