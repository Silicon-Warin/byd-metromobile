"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PromotionsClientContent() {
	return (
		<div className="text-center max-w-4xl">
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
	);
}
