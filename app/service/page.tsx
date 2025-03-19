"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	ChevronRight,
	Wrench,
	Clock,
	Shield,
	Car,
	Settings,
	Phone,
} from "lucide-react";

export default function ServicePage() {
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

	const services = [
		{
			title: "บริการซ่อมบำรุงทั่วไป",
			description: "การดูแลรักษาตามระยะทางและบริการซ่อมบำรุงทั่วไป",
			icon: <Wrench className="h-8 w-8 text-primary" />,
		},
		{
			title: "ศูนย์บริการ 24 ชั่วโมง",
			description: "บริการช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง ทุกวัน",
			icon: <Clock className="h-8 w-8 text-primary" />,
		},
		{
			title: "รับประกันคุณภาพ",
			description: "การรับประกันชิ้นส่วนและอะไหล่แท้จาก BYD",
			icon: <Shield className="h-8 w-8 text-primary" />,
		},
		{
			title: "สถานีชาร์จไฟฟ้า",
			description: "บริการสถานีชาร์จไฟฟ้าสำหรับรถยนต์ BYD",
			icon: <Car className="h-8 w-8 text-primary" />,
		},
		{
			title: "อัพเดทซอฟต์แวร์",
			description: "บริการอัพเดทซอฟต์แวร์และระบบนำทางล่าสุด",
			icon: <Settings className="h-8 w-8 text-primary" />,
		},
		{
			title: "ให้คำปรึกษา",
			description: "บริการให้คำปรึกษาเกี่ยวกับการใช้งานรถยนต์ไฟฟ้า",
			icon: <Phone className="h-8 w-8 text-primary" />,
		},
	];

	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* Hero Section */}
			<section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
				{/* Background pattern */}
				<div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>

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
								บริการ
							</span>
							<br />
							BYD Metromobile
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-gray-300 mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							บริการครบวงจรสำหรับรถยนต์ไฟฟ้า BYD ของคุณ
						</motion.p>
					</div>
				</div>
			</section>

			{/* Services Section */}
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
							บริการของเรา
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							เรามุ่งมั่นที่จะให้บริการที่ดีที่สุดสำหรับรถยนต์ BYD ของคุณ
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{services.map((service, index) => (
							<motion.div
								key={index}
								variants={fadeIn}
								className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/30 transition-all duration-300"
							>
								<div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
									{service.icon}
								</div>
								<h3 className="text-xl font-bold mb-4">{service.title}</h3>
								<p className="text-gray-400">{service.description}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Service Centers Section */}
			<section className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							ศูนย์บริการของเรา
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							ศูนย์บริการมาตรฐานทั่วประเทศ พร้อมให้บริการคุณ
						</p>
					</motion.div>

					<div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 mb-12">
						<div className="aspect-w-16 aspect-h-9 mb-8">
							<div className="w-full h-64 md:h-96 bg-gray-700 rounded-lg">
								{/* แทรกแผนที่หรือรูปภาพแสดงตำแหน่งศูนย์บริการ */}
								<div className="w-full h-full flex items-center justify-center">
									<p className="text-white">แผนที่ศูนย์บริการ</p>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							<div className="bg-gray-700/50 p-6 rounded-lg">
								<h3 className="text-lg font-bold mb-2">
									BYD Metromobile สาขารัชดา
								</h3>
								<p className="text-gray-400 mb-4">
									เลขที่ 123 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400
								</p>
								<p className="text-white mb-1">โทร: 02-123-4567</p>
								<p className="text-white">เวลาทำการ: 8:30 - 17:30 น. ทุกวัน</p>
							</div>
							<div className="bg-gray-700/50 p-6 rounded-lg">
								<h3 className="text-lg font-bold mb-2">
									BYD Metromobile สาขาบางนา
								</h3>
								<p className="text-gray-400 mb-4">
									เลขที่ 456 ถนนบางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ 10260
								</p>
								<p className="text-white mb-1">โทร: 02-234-5678</p>
								<p className="text-white">เวลาทำการ: 8:30 - 17:30 น. ทุกวัน</p>
							</div>
							<div className="bg-gray-700/50 p-6 rounded-lg">
								<h3 className="text-lg font-bold mb-2">
									BYD Metromobile สาขาเชียงใหม่
								</h3>
								<p className="text-gray-400 mb-4">
									เลขที่ 789 ถนนเชียงใหม่-ลำปาง ตำบลหนองป่าครั่ง อำเภอเมือง
									จังหวัดเชียงใหม่ 50000
								</p>
								<p className="text-white mb-1">โทร: 053-123-456</p>
								<p className="text-white">เวลาทำการ: 8:30 - 17:30 น. ทุกวัน</p>
							</div>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center"
					>
						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90 text-white group px-6"
						>
							นัดหมายบริการ
							<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Button>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
