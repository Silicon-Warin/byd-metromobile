"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog-data";

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

export default function NewsPage() {
	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* Hero Section */}
			<section className="py-16 md:py-24 bg-black">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-4xl mx-auto">
						<motion.div
							className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700 mb-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<Tag className="h-4 w-4 text-primary" />
							<span className="text-sm text-gray-300">บทความของเรา</span>
						</motion.div>

						<motion.h1
							className="text-4xl md:text-6xl font-bold mb-6"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							BYD Metromobile
						</motion.h1>

						<motion.p
							className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							ข่าวสารและโปรโมชั่นของ BYD Metromobile
						</motion.p>
					</div>
				</div>
			</section>

			{/* News Section */}
			<section className="py-16 md:py-24 bg-black">
				<div className="container mx-auto px-4">
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{blogPosts.map((item) => (
							<motion.div
								key={item.id}
								variants={fadeIn}
								className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full flex flex-col group"
							>
								<Link href={`/blog/${item.slug}`} className="block group">
									<div className="relative h-64 overflow-hidden">
										<Image
											src={item.imageUrl || "/placeholder.svg"}
											alt={item.title}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute top-4 left-4">
											<span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-primary border border-gray-700">
												<Tag className="h-3 w-3" />
												{item.category}
											</span>
										</div>
									</div>
								</Link>

								<div className="p-6 flex-1 flex flex-col">
									<Link href={`/blog/${item.slug}`}>
										<h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
											{item.title}
										</h3>
									</Link>

									<p className="text-gray-400 mb-4 flex-grow line-clamp-3 text-sm leading-relaxed">
										{item.summary}
									</p>

									<div className="mt-auto pt-4 border-t border-gray-800">
										<div className="flex items-center justify-between">
											<div className="flex items-center text-sm text-gray-500">
												<Calendar className="h-4 w-4 mr-2" />
												{item.date}
											</div>

											<Link href={`/blog/${item.slug}`}>
												<Button
													variant="ghost"
													size="sm"
													className="text-primary hover:text-white hover:bg-primary p-2"
												>
													<ChevronRight className="h-4 w-4" />
												</Button>
											</Link>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>

					<div className="flex justify-center mt-16">
						<Button
							variant="outline"
							className="border-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full bg-transparent"
						>
							โหลดเพิ่มเติม
						</Button>
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-16 md:py-24 bg-gray-900/30">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="bg-gray-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800"
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
									className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
								/>
								<Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
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
