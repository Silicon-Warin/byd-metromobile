"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroContent() {
	return (
		<div className="text-center max-w-4xl">
			<motion.div
				className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
			>
				<h1 className="mb-2">
					<span className="text-red-500">🔥จัดหนัก! จัดเต็ม!🎯</span>
					<br />
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
						ราคาพิเศษ
					</span>
				</h1>
				<p className="text-2xl md:text-4xl mb-2">
					เฉพาะ Motor Show 2025 เท่านั้น!!
				</p>
				<p className="text-3xl md:text-5xl">
					พบกับรถไฟฟ้า BYD เริ่มเพียง
					<br />
					<span className="text-yellow-400 tracking-wider">
						⚡4 9 9 , 9 0 0 บาท
					</span>{" "}
					เท่านั้น!
				</p>
				<p className="text-2xl md:text-3xl mt-2">
					พร้อม <span className="text-green-500">ฟรี!</span> Rever Care* ทุกคัน
				</p>
			</motion.div>

			<motion.div
				className="text-xl md:text-2xl text-gray-300 mb-8 border-t border-b border-gray-700 py-4 mx-auto max-w-2xl"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<p className="mb-2">🎉 ดีลดีที่สุด เท่าที่เคยมีมา ❤️</p>
				<p>ไม่ต้องไปถึง Motor Show ก็ได้ข้อเสนอเดียวกัน!</p>
				<p>ที่เมโทรโมบิล ทุกสาขา</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="space-y-4"
			>
				<p className="text-xl font-semibold text-secondary">
					🛍️ สนใจรุ่นไหน... จองเลย! ✅
				</p>
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
				<p className="text-xs text-gray-400 mt-4">
					**เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
				</p>
			</motion.div>
		</div>
	);
}
