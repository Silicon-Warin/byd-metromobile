"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Tag, User } from "lucide-react";

export default function NewsPage() {
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

	// ข้อมูลจำลองสำหรับข่าวสารและกิจกรรม
	const newsItems = [
		{
			id: 1,
			title: "BYD เปิดตัวรถยนต์ไฟฟ้ารุ่นใหม่ในประเทศไทย",
			summary:
				"BYD เปิดตัวรถยนต์ไฟฟ้ารุ่นใหม่ในประเทศไทย พร้อมโปรโมชั่นพิเศษสำหรับลูกค้าคนแรก",
			imageUrl: "/placeholder.svg",
			date: "15 มีนาคม 2024",
			category: "ข่าวผลิตภัณฑ์",
			author: "BYD Thailand",
		},
		{
			id: 2,
			title: "BYD Metromobile จัดกิจกรรม Test Drive Day",
			summary:
				"BYD Metromobile เชิญชวนผู้สนใจร่วมทดลองขับรถยนต์ไฟฟ้า BYD ทุกรุ่น พร้อมรับของที่ระลึกพิเศษ",
			imageUrl: "/placeholder.svg",
			date: "5 เมษายน 2024",
			category: "กิจกรรม",
			author: "BYD Metromobile",
		},
		{
			id: 3,
			title: "BYD ได้รับรางวัลรถยนต์ไฟฟ้ายอดเยี่ยมแห่งปี",
			summary:
				"BYD คว้ารางวัลรถยนต์ไฟฟ้ายอดเยี่ยมแห่งปี 2023 จากสถาบันชั้นนำในประเทศไทย",
			imageUrl: "/placeholder.svg",
			date: "20 กุมภาพันธ์ 2024",
			category: "รางวัล",
			author: "BYD Thailand",
		},
		{
			id: 4,
			title: "BYD Metromobile เปิดศูนย์บริการแห่งใหม่ที่เชียงใหม่",
			summary:
				"BYD Metromobile เปิดศูนย์บริการแห่งใหม่ที่เชียงใหม่ เพื่อรองรับความต้องการของลูกค้าในภาคเหนือ",
			imageUrl: "/placeholder.svg",
			date: "10 มกราคม 2024",
			category: "ข่าวบริษัท",
			author: "BYD Metromobile",
		},
		{
			id: 5,
			title: "BYD เปิดตัวเทคโนโลยีแบตเตอรี่ใหม่",
			summary:
				"BYD เปิดตัวเทคโนโลยีแบตเตอรี่ใหม่ที่มีประสิทธิภาพสูงขึ้นและปลอดภัยกว่าเดิม",
			imageUrl: "/placeholder.svg",
			date: "25 ธันวาคม 2023",
			category: "เทคโนโลยี",
			author: "BYD Thailand",
		},
		{
			id: 6,
			title: "BYD Metromobile จัดโปรโมชั่นส่งท้ายปี",
			summary:
				"BYD Metromobile จัดโปรโมชั่นส่งท้ายปี ให้ส่วนลดพิเศษสำหรับรถยนต์ไฟฟ้าทุกรุ่น",
			imageUrl: "/placeholder.svg",
			date: "1 ธันวาคม 2023",
			category: "โปรโมชั่น",
			author: "BYD Metromobile",
		},
	];

	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* Hero Section */}
			<section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
				{/* Background pattern */}
				<div className="absolute inset-0 opacity-10 bg-cover bg-center"></div>

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
								ข่าวสารและกิจกรรม
							</span>
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-gray-300 mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							ติดตามข่าวสารและกิจกรรมล่าสุดของ BYD Metromobile
						</motion.p>
					</div>
				</div>
			</section>

			{/* News Section */}
			<section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
				<div className="container mx-auto px-4">
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{newsItems.map((item) => (
							<motion.div
								key={item.id}
								variants={fadeIn}
								className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
							>
								<div className="relative h-48 overflow-hidden">
									<Image
										src={item.imageUrl}
										alt={item.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 hover:scale-105"
									/>
								</div>
								<div className="p-6 flex-1 flex flex-col">
									<div className="flex items-center gap-4 mb-4">
										<div className="flex items-center text-sm text-gray-400">
											<Calendar className="h-4 w-4 mr-1" />
											{item.date}
										</div>
										<div className="flex items-center text-sm text-primary">
											<Tag className="h-4 w-4 mr-1" />
											{item.category}
										</div>
									</div>
									<h3 className="text-xl font-bold mb-2">{item.title}</h3>
									<p className="text-gray-400 mb-4 flex-grow">{item.summary}</p>
									<div className="mt-auto">
										<div className="flex items-center text-sm text-gray-400 mb-4">
											<User className="h-4 w-4 mr-1" />
											{item.author}
										</div>
										<Link href={`/news/${item.id}`}>
											<Button
												variant="outline"
												className="w-full border-gray-600 hover:bg-primary hover:text-white hover:border-primary text-white"
											>
												อ่านเพิ่มเติม
												<ChevronRight className="h-4 w-4 ml-2" />
											</Button>
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>

					<div className="flex justify-center mt-12">
						<Button
							variant="outline"
							className="border-gray-600 hover:bg-gray-700 text-white px-8 py-6"
						>
							โหลดเพิ่มเติม
						</Button>
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-700"
					>
						<div className="max-w-3xl mx-auto text-center">
							<h2 className="text-2xl md:text-3xl font-bold mb-4">
								รับข่าวสารและโปรโมชั่นล่าสุด
							</h2>
							<p className="text-gray-400 mb-8">
								สมัครรับจดหมายข่าวของเราเพื่อรับข่าวสาร โปรโมชั่น
								และกิจกรรมล่าสุดจาก BYD Metromobile
							</p>
							<div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
								<input
									type="email"
									placeholder="อีเมลของคุณ"
									className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
								/>
								<Button className="bg-primary hover:bg-primary/90 text-white">
									สมัครรับข่าวสาร
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
