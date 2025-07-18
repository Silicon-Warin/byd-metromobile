"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	Calendar,
	Tag,
	Share2,
	ChevronRight,
	Clock,
} from "lucide-react";

import type { BlogPost } from "@/data/blog-data";
import EmblaCarousel from "./_component/EmblaCarousel";

interface BlogPostPageProps {
	post: BlogPost;
	relatedPosts: BlogPost[];
}

export default function BlogPostPage({
	post,
	relatedPosts,
}: BlogPostPageProps) {
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

	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* Back Navigation */}
			<section className="py-8 bg-black">
				<div className="container mx-auto px-4">
					<Link href="/blog">
						<Button
							variant="ghost"
							className="text-gray-400 hover:text-white p-0"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							กลับไปยังบล็อก
						</Button>
					</Link>
				</div>
			</section>

			{/* Hero Section */}
			<section className="py-8 md:py-16 bg-black">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto"
						initial="hidden"
						animate="visible"
						variants={fadeIn}
					>
						{/* Category, Date, and Read Time */}
						<div className="flex items-center gap-4 mb-6 flex-wrap">
							<span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30">
								<Tag className="h-3 w-3" />
								{post.category}
							</span>
							<div className="flex items-center text-sm text-gray-400">
								<Calendar className="h-4 w-4 mr-2" />
								{post.date}
							</div>
							<div className="flex items-center text-sm text-gray-400">
								<Clock className="h-4 w-4 mr-2" />
								{post.readTime}
							</div>
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
							{post.title}
						</h1>

						{/* Summary */}
						<p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
							{post.summary}
						</p>

						{/* Share Button */}
						<div className="flex items-center gap-4 mb-8">
							<Button
								variant="outline"
								className="border-gray-700 hover:bg-gray-800 text-white bg-transparent"
							>
								<Share2 className="h-4 w-4 mr-2" />
								แชร์บทความ
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Featured Image */}
			<section className="py-8 bg-black">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
					>
						{post.imagesSrc && post.imagesSrc.length > 0 ? (
							<EmblaCarousel imagesSrc={post.imagesSrc} />
						) : (
							<div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
								<Image
									src={post.imageUrl || "/placeholder.svg"}
									alt={post.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 1000px"
									priority
								/>
							</div>
						)}
					</motion.div>
				</div>
			</section>

			{/* Article Content */}
			<section className="py-8 md:py-16 bg-black">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
					>
						<div
							className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-gray-300 prose-li:mb-2
                prose-strong:text-white
                [&>*]:text-gray-300
                [&>h2]:text-white [&>h3]:text-white [&>h4]:text-white
                [&>ul]:space-y-2 [&>ol]:space-y-2"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</motion.div>
				</div>
			</section>

			{/* Tags */}
			<section className="py-8 bg-gray-900/30">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
					>
						<h3 className="text-lg font-semibold mb-4">แท็ก</h3>
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag, index) => (
								<span
									key={index}
									className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700 hover:border-primary/30 transition-colors cursor-pointer"
								>
									{tag}
								</span>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Related Posts */}
			{relatedPosts.length > 0 && (
				<section className="py-16 md:py-24 bg-gray-900/50">
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-6xl mx-auto"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={staggerContainer}
						>
							<h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
								บทความที่เกี่ยวข้อง
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{relatedPosts.map((relatedPost) => (
									<motion.div
										key={relatedPost.id}
										variants={fadeIn}
										className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
									>
										<div className="relative h-48 overflow-hidden">
											<Image
												src={relatedPost.imageUrl || "/placeholder.svg"}
												alt={relatedPost.title}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											<div className="absolute top-4 left-4">
												<span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-primary border border-gray-700">
													<Tag className="h-3 w-3" />
													{relatedPost.category}
												</span>
											</div>
										</div>

										<div className="p-6">
											<h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
												{relatedPost.title}
											</h3>

											<p className="text-gray-400 mb-4 text-sm line-clamp-2">
												{relatedPost.summary}
											</p>

											<div className="flex items-center justify-between">
												<div className="flex items-center text-xs text-gray-500">
													<Calendar className="h-3 w-3 mr-1" />
													{relatedPost.date}
												</div>

												<Link href={`/blog/${relatedPost.slug}`}>
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
									</motion.div>
								))}
							</div>

							<div className="text-center mt-12">
								<Link href="/blog">
									<Button
										variant="outline"
										className="border-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full bg-transparent"
									>
										ดูบทความทั้งหมด
									</Button>
								</Link>
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Newsletter CTA */}
			<section className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800 max-w-4xl mx-auto"
					>
						<div className="text-center">
							<h2 className="text-2xl md:text-3xl font-bold mb-4">
								ไม่พลาดข่าวสารใหม่ๆ
							</h2>
							<p className="text-gray-400 mb-8">
								สมัครรับจดหมายข่าวของเราเพื่อรับข่าวสาร โปรโมชั่น
								และกิจกรรมล่าสุดจาก BYD Metromobile
							</p>
							<div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
								<input
									type="email"
									placeholder="อีเมลของคุณ"
									className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
