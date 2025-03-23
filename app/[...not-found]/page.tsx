"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Construction } from "lucide-react";

export default function ComingSoonPage() {
	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
			<motion.div
				className="text-center"
				initial="hidden"
				animate="visible"
				variants={fadeIn}
			>
				<div className="mb-8 relative w-32 h-32 mx-auto">
					<Image
						src="/images/metromobile-logo.png"
						alt="BYD Metromobile Logo"
						fill
						className="object-contain"
					/>
				</div>

				<div className="flex items-center justify-center mb-6">
					<Construction className="h-8 w-8 mr-2 text-primary" />
					<h1 className="text-2xl md:text-4xl font-prompt font-bold">
						กำลังปรับปรุง
					</h1>
				</div>
				<h2 className="text-xl md:text-2xl font-prompt mb-6">
					พบกับเราเร็วๆ นี้
				</h2>
				<p className="text-gray-400 mb-8 max-w-md mx-auto">
					หน้านี้กำลังอยู่ระหว่างการพัฒนา กรุณากลับมาใหม่ในภายหลัง
				</p>

				<Button asChild className="bg-primary hover:bg-primary/90 text-white">
					<Link href="/">
						<Home className="mr-2 h-4 w-4" />
						กลับสู่หน้าแรก
					</Link>
				</Button>

				<p className="mt-12 text-sm text-gray-500">
					Coming Soon | BYD Metromobile © {new Date().getFullYear()}
				</p>
			</motion.div>
		</div>
	);
}
