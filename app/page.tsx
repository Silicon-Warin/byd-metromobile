"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroBannerCarousel } from "../components/HeroBannerCarousel";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "../components/ui/LineIcon";
import { defaultBanners } from "@/types/BannerData";
import { defaultModels } from "@/types/Model";
import { ModelCarsCarousel } from "@/components/ModelCarsCarousel";
import { ServiceCarousel } from "../components/ServiceCarousel";
import { BottomNav } from "../components/BottomNav";

export default function Home() {
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
					<div className="w-32 h-auto">
						<Image
							src="/images/BYD_Logo.png"
							alt="BYD Logo"
							width={1536}
							height={135}
							className="w-full h-full"
						/>
					</div>

					<button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
						รับใบเสนอราคา
					</button>
				</div>
			</nav>

			{/* Main content */}
			<main className="flex flex-col gap-4 md:gap-8 pt-16">
				{/* Hero Section */}
				<section className="relative min-h-[70vh] md:min-h-screen w-full">
					<HeroBannerCarousel banners={defaultBanners} />
				</section>

				{/* Car Models Section  */}
				<section id="car-models" className="py-16 bg-background">
					<div className="container mx-auto px-4">
						<h1 className="text-3xl font-bold text-center mb-12">Model BYD</h1>
						<ModelCarsCarousel models={defaultModels} />
					</div>
				</section>

				{/* Services Section */}
				<section className="py-16 bg-background">
					<div className="container mx-auto px-4">
						<h1 className="text-3xl font-bold text-center mb-12">
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
							<button className="px-6 md:px-8 py-3 bg-red-600 text-white text-base md:text-lg rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto">
								รับใบเสนอราคา
							</button>
							<button className="px-6 md:px-8 py-3 bg-transparent border-2 border-white text-white text-base md:text-lg rounded-md hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto">
								นัดหมายทดลองขับ
							</button>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="py-8 md:py-10 bg-gray-800 text-white">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
							<div>
								<h3 className="text-xl font-bold mb-4">BYD Metromobile</h3>
								<p className="text-gray-400">
									ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ
								</p>
							</div>

							<div>
								<h4 className="text-lg font-semibold mb-4">ติดต่อเรา</h4>

								<p className="text-gray-400 mb-2">
									<span className="block font-medium mb-1">โทรศัพท์:</span>
									<span className="block">สาขาพระราม 3: 02-291-8889</span>
									<span className="block">สาขาตลิ่งชัน: 02-448-3999</span>
									<span className="block">สาขาอ่อนนุช: 080-416-1888</span>
								</p>
								<p className="text-gray-400">อีเมล: bydmetromobile@gmail.com</p>
							</div>

							<div className="sm:col-span-2 lg:col-span-2">
								<h4 className="text-lg font-semibold mb-4">สาขาของเรา</h4>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{/* สาขาพระราม 3 */}
									<div>
										<h5 className="font-medium text-base mb-2">สาขาพระราม 3</h5>
										<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-1">
											<iframe
												src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.2497911530595!2d100.511054!3d13.6898373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2sBYD%20Metromobile%20Rama%203!5e0!3m2!1sen!2sth!4vYOUR_GENERATED_CODE"
												className="absolute top-0 left-0 w-full h-full"
												style={{ border: 0 }}
												allowFullScreen={true}
												loading="lazy"
												referrerPolicy="no-referrer-when-downgrade"
											></iframe>
										</div>
										<p className="text-sm text-gray-400">โทร: 02-291-8889</p>
									</div>

									{/* สาขาตลิ่งชัน */}
									<div>
										<h5 className="font-medium text-base mb-2">สาขาตลิ่งชัน</h5>
										<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-1">
											<iframe
												src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.6495454285115!2d100.40893499999999!3d13.776053000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2sBYD%20Metromobile!5e0!3m2!1sen!2sth!4v1710217344285!5m2!1sen!2sth"
												className="absolute top-0 left-0 w-full h-full"
												style={{ border: 0 }}
												allowFullScreen={true}
												loading="lazy"
												referrerPolicy="no-referrer-when-downgrade"
											></iframe>
										</div>
										<p className="text-sm text-gray-400">โทร: 02-448-3999</p>
									</div>

									{/* สาขาอ่อนนุช */}
									<div>
										<h5 className="font-medium text-base mb-2">สาขาอ่อนนุช</h5>
										<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-md mb-1">
											<iframe
												src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8771825118584!2d100.70593!3d13.722032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d613e36f67bc3%3A0xc752c7b40c6b573!2zQllEIE1ldHJvbW9iaWxlIOC4reC5iOC4reC4meC4meC4uOC4iA!5e0!3m2!1sen!2sth!4v1710217460636!5m2!1sen!2sth"
												className="absolute top-0 left-0 w-full h-full"
												style={{ border: 0 }}
												allowFullScreen={true}
												loading="lazy"
												referrerPolicy="no-referrer-when-downgrade"
											></iframe>
										</div>
										<p className="text-sm text-gray-400">โทร: 080-416-1888</p>
									</div>
								</div>
							</div>

							<div>
								<h4 className="text-lg font-semibold mb-4">ติดตามเรา</h4>
								<div className="flex flex-wrap gap-4">
									<a
										href="https://www.facebook.com/BYDBANGKOK"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										<BrandFacebook size={36} />
									</a>
									<a
										href="https://www.instagram.com/byd.metromobile?fbclid=IwZXh0bgNhZW0CMTAAAR3IWNwhXtqGZN6b_FOt2PvBOHBkaaFrBMlXNX6kReGOEqWmXvWQDM9pmrU_aem_eR8kP7vfbJgynuukHj_I2A"
										className="text-gray-400 hover:text-pink-400 transition-colors"
									>
										<BrandInstagram size={36} />
									</a>
									<a
										href="https://line.me/R/ti/p/@429xjvpr"
										className="text-gray-400 hover:text-green-400 transition-colors"
									>
										<LineIcon />
									</a>
									<a
										href="https://www.tiktok.com/@byd_metromobile?fbclid=PAZXh0bgNhZW0CMTEAAaYKRj0FB8zFO2weVJ0czVSPWWVnmq8eiJi6TSeydBfYv5SYYBG98LOVCi0_aem_h_ED2hfyoe4PG45pkUEh1g"
										className="text-gray-400 hover:text-red-400 transition-colors"
									>
										<BrandTiktok size={36} />
									</a>
								</div>
							</div>
						</div>

						<div className="pt-6 md:pt-8 border-t border-gray-700 text-center text-gray-400">
							<p>© 2025 BYD Metromobile. สงวนลิขสิทธิ์</p>
						</div>
					</div>
				</footer>
			</main>

			{/* Bottom Navigation that appears when scrolling to bottom */}
			<BottomNav />
		</>
	);
}
