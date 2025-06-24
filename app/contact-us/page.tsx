"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialIcon } from "@/app/utils/SocialIcon";
import { useState, useRef } from "react";
import Image from "next/image";

export default function ContactUs() {
	const [selectedBranch, setSelectedBranch] = useState("rama3");
	const formRef = useRef<HTMLFormElement>(null);
	const [isSending, setIsSending] = useState(false);
	const [sendSuccess, setSendSuccess] = useState(false);
	const [sendError, setSendError] = useState<string | null>(null);

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

	// ข้อมูลสาขาต่างๆ
	interface Branch {
		id: string;
		name: string;
		address: string;
		phone: string;
		hours: string;
		mapUrl: string;
	}

	// ข้อมูลการติดต่อทั่วไป
	interface ContactInfo {
		email: string;
		phoneGeneral: string;
		phoneService: string;
		lineOA: string;
		description?: string;
		businessHours?: string;
	}

	// สาขาต่างๆ
	const branches: Branch[] = [
		{
			id: "rama3",
			name: "สาขาพระราม 3",
			address:
				"455/2 ถนนพระรามที่ 3 แขวงบางโคล่ เขตบางคอแหลม กรุงเทพมหานคร 10120",
			phone: "02-291-8889, 063-394-5646",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.00-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5153.486896161014!2d100.5110541!3d13.689837299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2z4Lia4Li14Lin4Liy4Lii4LiU4Li1IOC5gOC4oeC5guC4l-C4o-C5guC4oeC4muC4tOC4pQ!5e1!3m2!1sth!2sth!4v1742592177074!5m2!1sth!2sth",
		},
		{
			id: "talingchan",
			name: "สาขาตลิ่งชัน",
			address: "64 ถนนกาญจนาภิเษก แขวงบางระมาด เขตตลิ่งชัน กรุงเทพมหานคร 10170",
			phone: "02-448-3999",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.00-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5151.592004551919!2d100.40635471169257!3d13.776058596673645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2zQllEIE1ldHJvbW9iaWxlIOC4leC4peC4tOC5iOC4h-C4iuC4seC4mSDguIHguLLguI3guIjguJnguLLguKDguLTguYDguKnguIE!5e1!3m2!1sth!2sth!4v1742592511147!5m2!1sth!2sth",
		},
		{
			id: "onnut",
			name: "สาขาอ่อนนุช",
			address: "909 เขตประเวศ กรุงเทพมหานคร 10250",
			phone: "080-416-1888",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.00-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5151.592004551919!2d100.40635471169257!3d13.776058596673645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d615b2d3b94cb%3A0xc73c4c761889653!2zQllEIOC4reC5iOC4reC4meC4meC4uOC4iiAtIOC4peC4suC4lOC4geC4o-C4sOC4muC4seC4hyDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1742592419644!5m2!1sth!2sth",
		},
		{
			id: "ramindra",
			name: "สาขารามอินทรา กม.9",
			address: "591 ถ. รามอินทรา แขวงรามอินทรา เขตคันนายาว กรุงเทพมหานคร 10230",
			phone: "081-665-6888",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.00-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.343180311472!2d100.66649121169309!3d13.832594395359672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6300152470d1%3A0xb40e702132cf177a!2zQllEIOC4o-C4suC4oeC4reC4tOC4meC4l-C4o-C4siDguIHguKEuOSDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1742592571020!5m2!1sth!2sth",
		},
		{
			id: "rca-rama9",
			name: "สาขาRCA-พระราม9",
			address: "889 ถนน จตุรทิศ บางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
			phone: "082-340-7888",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.00-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.423008129821!2d100.57356757509028!3d13.753345386638662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29faec6f4bce3%3A0xb3058b676241e1b7!2sBYD%20Metromobile%20RCA!5e0!3m2!1sth!2sth!4v1748629213320!5m2!1sth!2sth",
		},
	];

	// ข้อมูลการติดต่อทั่วไป
	const contactInfo: ContactInfo = {
		email: "bydmetromobile@gmail.com",
		phoneGeneral: "02-291-8889",
		phoneService: "02-045-8888",
		lineOA: "@bydmetromobile",
		description:
			"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย",
		businessHours: "เปิดทำการทุกวัน: 08.00-17.30 น.",
	};

	const currentBranch =
		branches.find((branch) => branch.id === selectedBranch) || branches[0];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
			{/* Hero Section with Enhanced Animations */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Enhanced Background with Parallax Effect (responsive) */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black/60 to-cyan-900/20"></div>
				<Image
					src="/contact/header-contact.jpg"
					alt="Contact Us"
					fill
					priority
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
					className="absolute inset-0 object-cover object-center opacity-10"
					// ใช้ object-cover + object-center เพื่อให้ภาพเต็มพื้นที่และโฟกัสกลาง รองรับทุกขนาดหน้าจอค่ะ
				/>

				{/* Enhanced Content with Stagger Animation */}
				<div className="container mx-auto px-4 relative z-10 text-center">
					<div className="max-w-4xl mx-auto">
						{/* SEO-optimized H1 with Enhanced Typography Animation */}
						<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in">
							ติดต่อเรา
						</h1>

						{/* Enhanced Subtitle with Delayed Animation */}
						<div className="text-xl md:text-2xl font-semibold mb-6 animate-fade-in delay-300">
							<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
								BYD Metromobile
							</span>
						</div>

						{/* Enhanced Description with Slide-in Effect */}
						<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in delay-500">
							ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ
							<br />
							พร้อมให้บริการด้วยทีมงานมืออาชีพ
						</p>

						{/* Enhanced Button Group with Hover Animations */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-700">
							<Button
								className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover-scale"
								onClick={() =>
									document
										.getElementById("contact-form")
										?.scrollIntoView({ behavior: "smooth" })
								}
							>
								<MessageCircle className="w-5 h-5 mr-2" />
								ส่งข้อความ
							</Button>
							<Button
								variant="outline"
								className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300 hover-scale"
								onClick={() =>
									document
										.getElementById("branches")
										?.scrollIntoView({ behavior: "smooth" })
								}
							>
								<MapPin className="w-5 h-5 mr-2" />
								ดูสาขา
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Info Section with Tabs */}
			<section
				id="branches"
				className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900"
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
							ข้อมูลการติดต่อ
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							หลายช่องทางในการติดต่อเรา เลือกช่องทางที่สะดวกสำหรับคุณ
						</p>
					</motion.div>

					{/* Tabs for Branches */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="mb-16"
					>
						<Tabs
							value={selectedBranch}
							onValueChange={setSelectedBranch}
							className="w-full"
						>
							<TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-12 h-auto p-1">
								{branches.map((branch) => (
									<TabsTrigger
										key={branch.id}
										value={branch.id}
										className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs md:text-sm py-2 px-1 md:px-3 whitespace-nowrap"
									>
										{branch.name}
									</TabsTrigger>
								))}
							</TabsList>

							{branches.map((branch) => (
								<TabsContent key={branch.id} value={branch.id} className="mt-8">
									<motion.div
										className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
										variants={staggerContainer}
										initial="hidden"
										animate="visible"
									>
										<motion.div variants={fadeIn}>
											<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 h-full min-h-[180px]">
												<CardContent className="p-4 md:p-6 flex flex-col items-center text-center h-full justify-center">
													<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 md:mb-4">
														<Phone className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
													</div>
													<h3 className="text-lg md:text-xl font-bold mb-2">
														โทรศัพท์
													</h3>
													<p className="text-gray-400 text-sm md:text-base">
														{branch.phone}
													</p>
												</CardContent>
											</Card>
										</motion.div>

										<motion.div variants={fadeIn}>
											<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 h-full min-h-[180px]">
												<CardContent className="p-4 md:p-6 flex flex-col items-center text-center h-full justify-center">
													<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 md:mb-4">
														<MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
													</div>
													<h3 className="text-lg md:text-xl font-bold mb-2">
														ที่อยู่
													</h3>
													<p className="text-gray-400 text-xs md:text-sm leading-relaxed">
														{branch.address}
													</p>
												</CardContent>
											</Card>
										</motion.div>

										<motion.div variants={fadeIn}>
											<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 h-full min-h-[180px]">
												<CardContent className="p-4 md:p-6 flex flex-col items-center text-center h-full justify-center">
													<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 md:mb-4">
														<Mail className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
													</div>
													<h3 className="text-lg md:text-xl font-bold mb-2">
														อีเมล
													</h3>
													<p className="text-gray-400 text-sm md:text-base">
														{contactInfo.email}
													</p>
												</CardContent>
											</Card>
										</motion.div>

										<motion.div variants={fadeIn}>
											<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 h-full min-h-[180px]">
												<CardContent className="p-4 md:p-6 flex flex-col items-center text-center h-full justify-center">
													<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 md:mb-4">
														<Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
													</div>
													<h3 className="text-lg md:text-xl font-bold mb-2">
														เวลาทำการ
													</h3>
													<p className="text-gray-400 text-xs md:text-sm leading-relaxed text-center">
														{branch.hours}
													</p>
												</CardContent>
											</Card>
										</motion.div>
									</motion.div>
								</TabsContent>
							))}
						</Tabs>
					</motion.div>

					{/* Social Media Section */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mt-12"
					>
						<h3 className="text-xl md:text-2xl font-bold mb-6">
							ติดตามเราได้ที่
						</h3>
						<div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
							<SocialIcon
								type="line"
								url="https://line.me/R/ti/p/%40bydmetromobile"
								size={40}
							/>
							<SocialIcon
								type="facebook"
								url="https://www.facebook.com/bydbangkok"
								size={40}
							/>
							<SocialIcon
								type="instagram"
								url="https://www.instagram.com/byd.metromobile"
								size={40}
							/>
							<SocialIcon
								type="tiktok"
								url="https://www.tiktok.com/@byd_metromobile"
								size={40}
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Contact Form and Map Section */}
			<section id="contact-form" className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeIn}
						>
							<h2 className="text-3xl md:text-4xl font-bold mb-6">
								ส่งข้อความถึงเรา
							</h2>
							<p className="text-gray-400 mb-8">
								กรอกแบบฟอร์มด้านล่างเพื่อส่งข้อความถึงเรา
								เราจะตอบกลับโดยเร็วที่สุด
							</p>

							<form
								ref={formRef}
								className="space-y-6"
								onSubmit={async (e) => {
									e.preventDefault();
									setIsSending(true);
									setSendSuccess(false);
									setSendError(null);
									const form = formRef.current;
									if (!form) return;
									const formData = new FormData(form);
									const name = formData.get("name") as string;
									const email = formData.get("email") as string;
									const phone = formData.get("phone") as string;
									const subject = formData.get("subject") as string;
									const message = formData.get("message") as string;
									try {
										const res = await fetch("/api/contact-message", {
											method: "POST",
											headers: { "Content-Type": "application/json" },
											body: JSON.stringify({
												name,
												email,
												phone,
												subject,
												message,
											}),
										});
										if (!res.ok) throw new Error("ส่งไป LINE OA ไม่สำเร็จ");
										setSendSuccess(true);
										form.reset();
									} catch (err: any) {
										setSendError(err.message || "เกิดข้อผิดพลาด");
									} finally {
										setIsSending(false);
									}
								}}
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="name" className="block text-white mb-2">
											ชื่อ-นามสกุล
										</label>
										<input
											type="text"
											id="name"
											name="name"
											className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="กรอกชื่อ-นามสกุล"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-white mb-2">
											อีเมล
										</label>
										<input
											type="email"
											id="email"
											name="email"
											className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="กรอกอีเมล"
										/>
									</div>
								</div>

								<div>
									<label htmlFor="phone" className="block text-white mb-2">
										เบอร์โทรศัพท์
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="กรอกเบอร์โทรศัพท์"
									/>
								</div>

								<div>
									<label htmlFor="subject" className="block text-white mb-2">
										หัวข้อ
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="กรอกหัวข้อ"
									/>
								</div>

								<div>
									<label htmlFor="message" className="block text-white mb-2">
										ข้อความ
									</label>
									<textarea
										id="message"
										name="message"
										rows={5}
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="กรอกข้อความ"
									></textarea>
								</div>

								<Button
									className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6"
									disabled={isSending}
								>
									<Send className="h-5 w-5 mr-2" />
									{isSending ? "กำลังส่ง..." : "ส่งข้อความ"}
								</Button>
								{sendSuccess && (
									<p className="text-green-400 mt-2">
										ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อเรา
									</p>
								)}
								{sendError && <p className="text-red-400 mt-2">{sendError}</p>}
							</form>
						</motion.div>

						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={{
								hidden: { opacity: 0, x: 50 },
								visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
							}}
							className="relative h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden"
						>
							<div className="absolute inset-0">
								<iframe
									src={currentBranch.mapUrl}
									className="w-full h-full border-0"
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
