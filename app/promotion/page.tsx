"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroBannerCarousel } from "@/components/HeroBannerCarousel";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "@/components/ui/LineIcon";
import { defaultBanners } from "@/types/BannerData";
import { defaultModels } from "@/types/Model";
import { ModelCarsCarousel } from "@/components/ModelCarsCarousel";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Promotion() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{/* Main Navbar with conditional styling based on scroll */}
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					scrollY > 50
						? "bg-primary/50 backdrop-blur-md shadow-md"
						: "bg-transparent"
				}`}
			>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="w-64 h-auto">
						<Image
							src="/images/BYD_Logo.png"
							alt="BYD Logo"
							width={1536}
							height={135}
							className="w-full h-full"
						/>
					</div>

					<Button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
						รับใบเสนอราคา
					</Button>
				</div>
			</nav>

			{/* Main content */}
			<main className="flex flex-col gap-2 md:gap-8 pt-6">
				<section className="relative min-h-[40vh] md:min-h-[70vh] w-full">
					<HeroBannerCarousel banners={defaultBanners} />
				</section>

				<Button
					onClick={() =>
						window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
					}
					className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
				>
					ดูเพิ่มเติม ⬇️
				</Button>

				{/* Car Models Section */}
				<section id="car-models" className="py-4 md:py-16 bg-background">
					<div className="container mx-auto px-4">
						<h1 className="text-3xl font-bold text-center mb-6 md:mb-12">
							Model BYD
						</h1>
					</div>
				</section>
				<ModelCarsCarousel models={defaultModels} />

				{/* Services Section */}
				<section className="py-4 md:py-16 bg-background">
					<div className="container mx-auto px-4">
						<h1 className="text-3xl font-bold text-center mb-6 md:mb-12">
							บริการของเรา
						</h1>
						<ServiceCarousel />
					</div>
				</section>

				{/* Contact/CTA Section */}
				<section className="py-12 md:py-16 bg-gray-900 text-white">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
							พร้อมให้คำปรึกษาเกี่ยวกับรถยนต์ไฟฟ้า BYD
						</h2>
						<p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
							ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำแนะนำเกี่ยวกับรถยนต์ไฟฟ้า BYD
							ที่เหมาะกับความต้องการของคุณ
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button className="px-6 md:px-8 py-3 bg-blue-600 text-white text-base md:text-lg rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto">
								รับใบเสนอราคา
							</Button>
							<Button className="px-6 md:px-8 py-3 bg-transparent border-2 border-white text-white text-base md:text-lg rounded-md hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto">
								นัดหมายทดลองขับ
							</Button>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="py-12 bg-gray-800 text-white">
				<div className="container mx-auto px-4 max-w-7xl">
					{/* Section 1: Main footer content */}
					<div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8 mb-10">
						{/* Company info */}
						<div className="md:col-span-3">
							<h3 className="text-2xl font-bold mb-4">BYD Metromobile</h3>
							<p className="text-gray-300">
								ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ
							</p>

							{/* Social media icons */}
							<div className="mt-6">
								<h4 className="text-lg font-semibold mb-3">ติดตามเรา</h4>
								<div className="flex gap-5">
									<Link
										href="https://www.facebook.com/BYDBANGKOK"
										className="text-gray-300 hover:text-blue-400 transition-colors"
										aria-label="Facebook"
									>
										<BrandFacebook size={36} />
									</Link>

									<Link
										href="https://www.instagram.com/byd.metromobile"
										className="text-gray-300 hover:text-pink-400 transition-colors"
										aria-label="Instagram"
									>
										<BrandInstagram size={36} />
									</Link>

									<Link
										href="https://line.me/R/ti/p/@429xjvpr"
										className="text-gray-300 hover:text-green-400 transition-colors"
										aria-label="Line"
									>
										<LineIcon />
									</Link>

									<Link
										href="https://www.tiktok.com/@byd_metromobile"
										className="text-gray-300 hover:text-red-400 transition-colors"
										aria-label="TikTok"
									>
										<BrandTiktok size={36} />
									</Link>
								</div>
							</div>
						</div>

						{/* Contact info */}
						<div className="md:col-span-3">
							<h4 className="text-lg font-semibold mb-4">ติดต่อเรา</h4>

							<div className="space-y-4">
								<div>
									<p className="text-gray-300 font-medium mb-2">โทรศัพท์:</p>
									<ul className="space-y-1 text-gray-400">
										<li>สาขาพระราม 3: 02-291-8889</li>
										<li>สาขาตลิ่งชัน: 02-448-3999</li>
										<li>สาขาอ่อนนุช: 080-416-1888</li>
										<li>รามอินทรา กม.9: 081-665-6888</li>
									</ul>
								</div>

								<div>
									<p className="text-gray-300 font-medium mb-1">อีเมล:</p>
									<p className="text-gray-400">bydmetromobile@gmail.com</p>
								</div>
							</div>
						</div>

						{/* Branch locations */}
						<div className="md:col-span-6">
							<h4 className="text-lg font-semibold mb-4">สาขาของเรา</h4>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{/* unchanged */}
								{/* Rama 3 */}
								<div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
									<h5 className="font-medium text-base mb-3 text-white">
										สาขาพระราม 3
									</h5>
									<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-3">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.2497911530595!2d100.511054!3d13.6898373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2sBYD%20Metromobile%20Rama%203!5e0!3m2!1sen!2sth!4vYOUR_GENERATED_CODE"
											className="absolute top-0 left-0 w-full h-full"
											style={{ border: 0 }}
											allowFullScreen
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										/>
									</div>
									<p className="text-sm text-gray-300">โทร: 02-291-8889</p>
								</div>

								{/* Talingchan */}
								<div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
									<h5 className="font-medium text-base mb-3 text-white">
										สาขาตลิ่งชัน
									</h5>
									<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-3">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.6495454285115!2d100.40893499999999!3d13.776053000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2sBYD%20Metromobile!5e0!3m2!1sen!2sth!4v1710217344285!5m2!1sen!2sth"
											className="absolute top-0 left-0 w-full h-full"
											style={{ border: 0 }}
											allowFullScreen
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										/>
									</div>
									<p className="text-sm text-gray-300">โทร: 02-448-3999</p>
								</div>

								{/* Onnut */}
								<div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
									<h5 className="font-medium text-base mb-3 text-white">
										สาขาอ่อนนุช
									</h5>
									<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-3">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8771825118584!2d100.70593!3d13.722032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d613e36f67bc3%3A0xc752c7b40c6b573!2zQllEIE1ldHJvbW9iaWxlIOC4reC5iOC4reC4meC4meC4uOC4iA!5e0!3m2!1sen!2sth!4v1710217460636!5m2!1sen!2sth"
											className="absolute top-0 left-0 w-full h-full"
											style={{ border: 0 }}
											allowFullScreen
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										/>
									</div>
									<p className="text-sm text-gray-300">โทร: 080-416-1888</p>
								</div>

								{/* Ramindra */}
								<div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
									<h5 className="font-medium text-base mb-3 text-white">
										สาขารามอินทรา กม.9
									</h5>
									<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-3">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.343180311472!2d100.66649121169309!3d13.832594395359672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6300152470d1%3A0xb40e702132cf177a!2zQllEIOC4o-C4suC4oeC4reC4tOC4meC4l-C4o-C4siDguIHguKEuOSDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1741852565855!5m2!1sth!2sth"
											className="absolute top-0 left-0 w-full h-full"
											style={{ border: 0 }}
											allowFullScreen
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										/>
									</div>
									<p className="text-sm text-gray-300">โทร: 081-665-6888</p>
								</div>
							</div>
						</div>
					</div>

					{/* Copyright */}
					<div className="pt-8 border-t border-gray-700 text-center">
						<p className="text-gray-400">
							&copy; {new Date().getFullYear()} BYD Metromobile. สงวนลิขสิทธิ์
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}
