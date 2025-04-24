"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SocialIcon } from "../utils/SocialIcon";
export default function ContactPage() {
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
			phone: "02-291-8889",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5153.486896161014!2d100.5110541!3d13.689837299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2z4Lia4Li14Lin4Liy4Lii4LiU4Li1IOC5gOC4oeC5guC4l-C4o-C5guC4oeC4muC4tOC4pQ!5e1!3m2!1sth!2sth!4v1742592177074!5m2!1sth!2sth",
		},
		{
			id: "talingchan",
			name: "สาขาตลิ่งชัน",
			address: "64 ถนนกาญจนาภิเษก แขวงบางระมาด เขตตลิ่งชัน กรุงเทพมหานคร 10170",
			phone: "02-448-3999",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5151.592004551919!2d100.40635471169257!3d13.776058596673645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2zQllEIE1ldHJvbW9iaWxlIOC4leC4peC4tOC5iOC4h-C4iuC4seC4mSDguIHguLLguI3guIjguJnguLLguKDguLTguYDguKnguIE!5e1!3m2!1sth!2sth!4v1742592511147!5m2!1sth!2sth",
		},
		{
			id: "onnut",
			name: "สาขาอ่อนนุช",
			address: "909 เขตประเวศ กรุงเทพมหานคร 10250",
			phone: "080-416-1888",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5151.592004551919!2d100.40635471169257!3d13.776058596673645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d615b2d3b94cb%3A0xc73c4c761889653!2zQllEIOC4reC5iOC4reC4meC4meC4uOC4iiAtIOC4peC4suC4lOC4geC4o-C4sOC4muC4seC4hyDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1742592419644!5m2!1sth!2sth",
		},
		{
			id: "ramindra",
			name: "สาขารามอินทรา กม.9",
			address: "591 ถ. รามอินทรา แขวงรามอินทรา เขตคันนายาว กรุงเทพมหานคร 10230",
			phone: "081-665-6888",
			hours: "เปิดทำการ: วันจันทร์-อาทิตย์ 08.30-17.30 น.",
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.343180311472!2d100.66649121169309!3d13.832594395359672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6300152470d1%3A0xb40e702132cf177a!2zQllEIOC4o-C4suC4oeC4reC4tOC4meC4l-C4o-C4siDguIHguKEuOSDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1742592571020!5m2!1sth!2sth",
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
		businessHours: "เปิดทำการทุกวัน: 08.30-17.30 น.",
	};

	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* Hero Section */}
			<section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>

				{/* Content */}
				<div className="container mx-auto px-4 h-full flex items-center justify-center text-white relative z-10">
					<div className="text-center max-w-4xl">
						<motion.h1
							className="text-4xl md:text-6xl font-bold mb-6"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
								ติดต่อเรา
							</span>
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-gray-300 mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							{contactInfo.description}
						</motion.p>
					</div>
				</div>
			</section>

			{/* Contact Info Section */}
			<section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
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

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Phone className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">โทรศัพท์</h3>
									<div className="text-gray-400">
										{branches.map((branch) => (
											<p key={branch.phone} className="mb-1">
												{branch.name}: {branch.phone}
											</p>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">อีเมล</h3>
									<p className="text-gray-400">{contactInfo.email}</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<MapPin className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">โซเชียลมีเดีย</h3>
									<div className="flex gap-4">
										<SocialIcon
											type="line"
											url="https://line.me/R/ti/p/%40bydmetromobile"
											size={36}
										/>
										<SocialIcon
											type="facebook"
											url="https://www.facebook.com/bydbangkok"
											size={36}
										/>
										<SocialIcon
											type="instagram"
											url="https://www.instagram.com/byd.metromobile"
											size={36}
										/>
										<SocialIcon
											type="tiktok"
											url="https://www.tiktok.com/@byd_metromobile"
											size={36}
										/>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Clock className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">เวลาทำการ</h3>
									<div className="text-gray-400">
										<p>{contactInfo.businessHours}</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Contact Form and Map Section */}
			<section className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
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

							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="name" className="block text-white mb-2">
											ชื่อ-นามสกุล
										</label>
										<input
											type="text"
											id="name"
											className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
											className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="กรอกหัวข้อ"
									/>
								</div>

								<div>
									<label htmlFor="message" className="block text-white mb-2">
										ข้อความ
									</label>
									<textarea
										id="message"
										rows={5}
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="กรอกข้อความ"
									></textarea>
								</div>

								<Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6">
									<Send className="h-5 w-5 mr-2" />
									ส่งข้อความ
								</Button>
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
									src={branches[0].mapUrl}
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
		</main>
	);
}
