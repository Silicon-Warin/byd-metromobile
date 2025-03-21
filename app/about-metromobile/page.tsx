"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6 },
};

const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.8 },
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
		<main className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground">
			{/* Hero Section */}
			<section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src="/images/byd-showcase.jpg"
						alt="BYD Metromobile - Official Dealer"
						fill
						className="object-cover brightness-[0.4]"
						priority
					/>
				</div>
				<div className="container relative z-10 px-4 mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="max-w-3xl mx-auto"
					>
						<h1 className="text-5xl md:text-7xl font-prompt font-bold mb-6 text-white">
							เกี่ยวกับเรา
						</h1>
						<p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
							ศูนย์รวมนวัตกรรมยานยนต์แห่งโลกอนาคต ที่พร้อมจะพาคุณขับเคลื่อน
							สู่โลกและสิ่งแวดล้อมในฝันที่ดีขึ้น
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button size="lg" className="rounded-full font-medium">
								ดูรถยนต์ของเรา
								<ChevronRight className="ml-1 h-4 w-4" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="rounded-full font-medium bg-transparent text-white border-white hover:bg-white/10"
							>
								ติดต่อเรา
								<ChevronRight className="ml-1 h-4 w-4" />
							</Button>
						</div>
					</motion.div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
			</section>

			{/* Navigation Tabs */}
			<section className="py-8 border-b border-border/40">
				<div className="container mx-auto px-4">
					<Tabs defaultValue="byd" className="w-full">
						<TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 h-auto">
							<TabsTrigger value="byd" className="py-3 text-base">
								เกี่ยวกับ BYD
							</TabsTrigger>
							<TabsTrigger value="metromobile" className="py-3 text-base">
								เกี่ยวกับ เมโทรโมบิล
							</TabsTrigger>
							<TabsTrigger value="services" className="py-3 text-base">
								บริการของเรา
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</section>

			{/* BYD Section */}
			<motion.section
				id="about-byd"
				className="py-16 md:py-24"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div variants={fadeInUp} className="order-2 lg:order-1">
							<div className="space-y-6">
								<h2 className="text-3xl md:text-4xl font-prompt font-bold mb-6">
									เกี่ยวกับ BYD
								</h2>
								<div className="space-y-6 text-lg prose prose-invert max-w-none">
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
									<Link
										href="https://www.byd.com/en/blade-battery"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-primary hover:underline"
									>
										<span>เทคโนโลยี Blade Battery</span>
										<ExternalLink className="h-4 w-4" />
									</Link>
									<Link
										href="https://www.byd.com/en-th"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-primary hover:underline"
									>
										<span>เว็บไซต์ BYD ประเทศไทย</span>
										<ExternalLink className="h-4 w-4" />
									</Link>
								</div>
							</div>
						</motion.div>
						<motion.div
							variants={fadeIn}
							className="order-1 lg:order-2 flex justify-center"
						>
							<div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 w-full max-w-md aspect-[4/3]">
								<Image
									src="/images/BYD_Logo.jpg"
									alt="BYD โลโก้ - บริษัทรถยนต์ไฟฟ้าชั้นนำ"
									fill
									className="object-contain p-8 bg-white"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Brand Showcase */}
			<motion.section
				className="py-16 bg-gradient-to-b from-background/50 to-background"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
					>
						<Image
							src="/images/byd-showcase.jpg"
							alt="รถยนต์ไฟฟ้า BYD โดย เมโทรโมบิล - ผู้จำหน่ายอย่างเป็นทางการ"
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
							<div className="p-6 md:p-10 w-full">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
									รถยนต์ไฟฟ้าแห่งอนาคต
								</h3>
								<p className="text-white/80 max-w-xl">
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
				className="py-16 md:py-24"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h2 className="text-3xl md:text-5xl font-prompt font-bold mb-6">
							เกี่ยวกับ เมโทรโมบิล
						</h2>
						<div className="flex justify-center mb-8">
							<Image
								src="/images/metromobile-logo.png"
								alt="เมโทรโมบิล โลโก้ - ผู้จำหน่ายรถยนต์ BYD อย่างเป็นทางการ"
								width={300}
								height={100}
								className="h-auto"
							/>
						</div>
						<p className="text-xl">
							บริษัท เมโทรโมบิล จำกัด (Metromobile) เป็นผู้จำหน่ายรถยนต์ BYD
							อย่างเป็นทางการ ภายใต้แบรนด์ BYD Metromobile
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
						<motion.div
							variants={fadeInUp}
							className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg"
						>
							<h3 className="text-2xl font-prompt font-bold mb-4">
								วิสัยทัศน์ของเรา
							</h3>
							<p className="text-lg mb-4">
								Metromobile คือ ศูนย์รวมนวัตกรรมยานยนต์แห่งโลกอนาคต
								ที่พร้อมจะพาคุณขับเคลื่อน สู่โลกเเละสิ่งเเวดล้อมในฝันที่ดีขึ้น
								ผ่านเทคโนโลยีและยานยนต์พลังงานรูปแบบใหม่ที่นอกจากจะเป็นมิตรกับสิ่งเเวดล้อมเเล้ว
							</p>
							<p className="text-lg">
								Metromobile
								ยังพร้อมให้บริการดูเเลรักษาให้คําปรึกษาทุกเรื่องที่เกี่ยวกับรถยนต์
								ผ่านบริการหลังการขาย
								ที่ครบวงจรโดยผู้เชี่ยวชาญเพื่อให้ทุกการเดินทางของคุณอบอุ่น
								ปลอดภัย ในทุกเส้นทาง
							</p>
						</motion.div>

						<motion.div
							variants={fadeInUp}
							className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg"
						>
							<h3 className="text-2xl font-prompt font-bold mb-4">
								พันธกิจของเรา
							</h3>
							<p className="text-lg mb-4">
								เพราะเราเชื่อว่า รถ ไม่ใช่เเค่ยานพาหนะเเต่ รถ
								ยังเปรียบเสมือนจุดเชื่อมต่อ ประสบการณ์
								เเละความทรงจําตลอดระยะเส้นทางการเดินทางของชีวิต
							</p>
							<p className="text-lg">
								มาร่วมขับเคลื่อนไปสู่โลกอนาคตในฝัน อย่างมั่งคง
								เเละปลอดภัยด้วยกันที่ Metromobile
							</p>
						</motion.div>
					</div>

					<motion.div
						variants={fadeInUp}
						className="bg-primary/10 p-8 md:p-12 rounded-2xl border border-primary/20 mb-16 text-center"
					>
						<h3 className="text-2xl md:text-3xl font-prompt font-bold mb-4">
							"เพราะเราเชื่อว่า รถ ไม่ใช่เเค่ยานพาหนะ"
						</h3>
						<p className="text-xl max-w-2xl mx-auto">
							แต่มันคือจุดเชื่อมต่อของ Lifestyle ที่บ่งบอกถึงคุณค่า
							ความภาคภูมิใจ ประสบการณ์ และความทรงจำ
							ตลอดระยะเวลาการเดินทางของชีวิต
						</p>
					</motion.div>

					<motion.div
						variants={fadeInUp}
						className="space-y-6 text-lg max-w-3xl mx-auto"
					>
						<p>
							บริษัท เมโทรโมบิล จำกัด (Metromobile) ผู้จำหน่ายรถยนต์ BYD
							อย่างเป็นทางการ ในนาม BYD Metromobile
							พร้อมยืนหนึ่งในด้านประสบการณ์ และความชำนาญ
							ตั้งแต่นวัตกรรมเครื่องยนต์ สมรรถนะการซ่อมแซม และบำรุงรักษา
							ที่สามารถตอบโจทย์ให้แก่ผู้ใช้บริการมาหลายยุคหลายสมัย
						</p>
						<p>
							ภายใต้ "ความเชื่อมั่นและไว้วางใจ"
							ที่ลูกค้าทุกท่านมีให้แก่เราทีมงาน Metromobile
							ขอให้คำมั่นสัญญาที่จะดูแล ให้คำแนะนำ และส่งมอบรถยนต์ BYD
							พร้อมกับการบริการหลังการขายที่จะสร้างรอยยิ้มและความประทับใจ
							ให้แก่ลูกค้าทุกท่านตลอดไป
						</p>
						<p className="flex items-center gap-2">
							<span>เรียนรู้เพิ่มเติมเกี่ยวกับเทคโนโลยีรถยนต์ไฟฟ้าได้ที่</span>
							<Link
								href="https://www.evat.or.th/15708383/ev-knowledge"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary inline-flex items-center gap-1 hover:underline"
							>
								สมาคมยานยนต์ไฟฟ้าไทย
								<ExternalLink className="h-4 w-4" />
							</Link>
						</p>
					</motion.div>
				</div>
			</motion.section>

			{/* Business Partners Section */}
			<motion.section
				id="business-partners"
				className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h2 className="text-3xl md:text-5xl font-prompt font-bold mb-6">
							พันธมิตรทางธุรกิจ
						</h2>
						<p className="text-xl">
							"Metromobile" เป็นบริษัทที่ก่อตั้งโดยพันธมิตรทางธุรกิจชั้นนำ
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
						<motion.div
							variants={fadeInUp}
							className="bg-white text-black p-8 rounded-2xl shadow-xl"
						>
							<div className="flex justify-center mb-6">
								<Image
									src="/images/A-Motor-Logo.jpg"
									alt="โลโก้ เอ มอเตอร์ กรุ๊ป - พันธมิตรของ เมโทรโมบิล"
									width={240}
									height={80}
									className="h-auto"
								/>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								บริษัท เอ มอเตอร์ กรุ๊ป จำกัด
							</h3>
							<p className="text-lg mb-4">
								ผู้นำเข้า และจำหน่ายรถยนต์หรู
								และผู้เชี่ยวชาญในวงการรถยนต์หรูที่มีประสบการณ์ด้านงานซ่อมบำรุง
								รถยนต์มายาวนานกว่า 30 ปี
							</p>
							<div className="flex justify-center mt-6">
								<Link
									href="https://www.facebook.com/A.MotorsGroup"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-primary hover:underline"
								>
									<span>เยี่ยมชมเว็บไซต์</span>
									<ExternalLink className="h-4 w-4" />
								</Link>
							</div>
						</motion.div>

						<motion.div
							variants={fadeInUp}
							className="bg-white text-black p-8 rounded-2xl shadow-xl"
						>
							<div className="flex justify-center mb-6">
								<div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
									<Image
										src="/images/DrPat_Photo.jpg"
										alt="ดร. ภัทร จึงกานต์กุล - พันธมิตรของ เมโทรโมบิล"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								ดร. ภัทร จึงกานต์กุล
							</h3>
							<p className="text-lg">
								นักธุรกิจ-นักลงทุน ด้านธุรกิจพลังงานทางเลือก และ Sustainability
								ecosystem
								ผู้เชี่ยวชาญด้านการสื่อสารประชาสัมพันธ์ด้วยประสบการณ์ด้านสื่อสารมวลชนมากกว่า
								20 ปี
							</p>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Services Section */}
			<motion.section
				id="our-services"
				className="py-16 md:py-24"
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				variants={staggerContainer}
			>
				<div className="container mx-auto px-4">
					<motion.div
						variants={fadeInUp}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h2 className="text-3xl md:text-5xl font-prompt font-bold mb-6">
							บริการของเรา
						</h2>
						<p className="text-xl">บริการครบวงจรสำหรับรถยนต์ไฟฟ้า BYD ของคุณ</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
						<motion.div
							variants={fadeInUp}
							className="group relative overflow-hidden rounded-2xl"
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
							<div className="relative h-[400px] w-full overflow-hidden">
								<Image
									src="/images/trade-in-service.jpg"
									alt="บริการรถเก่าแลกใหม่ โดย เมโทรโมบิล"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
							</div>
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
									รถเก่าแลกใหม่ (Trade-in)
								</h3>
								<p className="text-white/90 mb-6 max-w-md">
									Metromobile ร่วมกับบริษัทพันธมิตรในเครือ
									รับซื้อรถยนต์คันเก่าเพื่อแลกรถยนต์คันใหม่
									ด้วยข้อเสนอที่ดีกว่าและคุณค่ากว่าตลาด
								</p>
								<Link
									href="/services/trade-in"
									className="inline-flex items-center gap-2 text-primary bg-white px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
								>
									<span>ดูรายละเอียดเพิ่มเติม</span>
									<ChevronRight className="h-4 w-4" />
								</Link>
							</div>
						</motion.div>

						<motion.div
							variants={fadeInUp}
							className="group relative overflow-hidden rounded-2xl"
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
							<div className="relative h-[400px] w-full overflow-hidden">
								<Image
									src="/images/after-sales-service.jpg"
									alt="บริการหลังการขายและซ่อมบำรุง โดย เมโทรโมบิล"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
							</div>
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
									บริการหลังการขายและงานซ่อมบำรุง
								</h3>
								<p className="text-white/90 mb-6 max-w-md">
									บริการครบวงจรโดยผู้เชี่ยวชาญที่มีประสบการณ์กว่า 30 ปี พร้อม EV
									Expert ที่สามารถซ่อมบำรุงรถยนต์พลังงานไฟฟ้าที่แรกๆของไทย
								</p>
								<Link
									href="/services/after-sales"
									className="inline-flex items-center gap-2 text-primary bg-white px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
								>
									<span>ดูรายละเอียดเพิ่มเติม</span>
									<ChevronRight className="h-4 w-4" />
								</Link>
							</div>
						</motion.div>
					</div>

					{/* FAQ Section */}
					<motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
						<h3 className="text-2xl md:text-3xl font-prompt font-bold text-center mb-8">
							คำถามที่พบบ่อย
						</h3>

						<Accordion type="single" collapsible className="w-full">
							<AccordionItem
								value="item-1"
								className="border-b border-border/40"
							>
								<AccordionTrigger className="text-lg font-medium py-4">
									เมโทรโมบิลมีสาขาที่ไหนบ้าง?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4">
									ปัจจุบัน เมโทรโมบิลมีสาขาให้บริการในกรุงเทพฯ และปริมณฑล
									สามารถดูรายละเอียดสาขาทั้งหมดได้ที่หน้า
									<Link
										href="/contact"
										className="text-primary hover:underline ml-1"
									>
										ติดต่อเรา
									</Link>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-2"
								className="border-b border-border/40"
							>
								<AccordionTrigger className="text-lg font-medium py-4">
									รถยนต์ BYD มีรุ่นอะไรบ้างในประเทศไทย?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4">
									BYD มีรถยนต์หลากหลายรุ่นในประเทศไทย ทั้ง ATTO 3, DOLPHIN, SEAL
									และอื่นๆ สามารถดูรายละเอียดทั้งหมดได้ที่หน้า
									<Link
										href="/models"
										className="text-primary hover:underline ml-1"
									>
										รุ่นรถยนต์
									</Link>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-3"
								className="border-b border-border/40"
							>
								<AccordionTrigger className="text-lg font-medium py-4">
									มีบริการซ่อมบำรุงรถยนต์ไฟฟ้าหรือไม่?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4">
									เมโทรโมบิลมีบริการซ่อมบำรุงรถยนต์ไฟฟ้าครบวงจร
									โดยทีมช่างผู้เชี่ยวชาญที่ผ่านการอบรมจาก BYD โดยตรง
									สามารถดูรายละเอียดเพิ่มเติมได้ที่หน้า
									<Link
										href="/services/after-sales"
										className="text-primary hover:underline ml-1"
									>
										บริการหลังการขาย
									</Link>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value="item-4"
								className="border-b border-border/40"
							>
								<AccordionTrigger className="text-lg font-medium py-4">
									การชาร์จรถยนต์ไฟฟ้า BYD ทำได้อย่างไร?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4">
									รถยนต์ไฟฟ้า BYD สามารถชาร์จได้ทั้งที่บ้านด้วย Wall Charger
									และที่สถานีชาร์จสาธารณะ ทาง BYD
									มีเครือข่ายสถานีชาร์จทั่วประเทศ และสามารถใช้แอปพลิเคชัน BYD
									App เพื่อค้นหาสถานีชาร์จที่ใกล้ที่สุดได้
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-5">
								<AccordionTrigger className="text-lg font-medium py-4">
									รถยนต์ไฟฟ้า BYD มีการรับประกันอย่างไร?
								</AccordionTrigger>
								<AccordionContent className="text-base pb-4">
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
			<section className="py-16 bg-primary/10">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-prompt font-bold mb-6">
						พร้อมสัมผัสประสบการณ์การขับขี่ที่เหนือระดับ
					</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						มาร่วมเป็นส่วนหนึ่งของการเปลี่ยนแปลงสู่อนาคตที่ยั่งยืนกับ BYD
						Metromobile
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Button size="lg" className="rounded-full font-medium">
							ดูรถยนต์ของเรา
							<ChevronRight className="ml-1 h-4 w-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="rounded-full font-medium"
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
