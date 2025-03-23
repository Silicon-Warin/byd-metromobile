"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
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

				<h1 className="text-4xl md:text-6xl font-prompt font-bold mb-4">404</h1>
				<h2 className="text-xl md:text-2xl font-prompt mb-6">
					ไม่พบหน้าที่คุณค้นหา
				</h2>
				<p className="text-gray-400 mb-8 max-w-md mx-auto">
					หน้าเว็บนี้อาจถูกย้าย ลบแล้ว หรืออยู่ระหว่างการพัฒนา
					กรุณาลองใหม่ภายหลัง
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild className="bg-primary hover:bg-primary/90 text-white">
						<Link href="/">
							<Home className="mr-2 h-4 w-4" />
							กลับสู่หน้าแรก
						</Link>
					</Button>
					<Button
						variant="outline"
						asChild
						className="border-white/20 hover:bg-white/10 text-white"
						onClick={() => window.history.back()}
					>
						<Link
							href="#"
							onClick={(e) => {
								e.preventDefault();
								window.history.back();
							}}
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							ย้อนกลับ
						</Link>
					</Button>
				</div>

				<p className="mt-12 text-sm text-gray-500">
					Coming Soon | BYD Metromobile © {new Date().getFullYear()}
				</p>
			</motion.div>
		</div>
	);
}
