"use client";

import Link from "next/link";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "@/components/ui/LineIcon";
import { navCarModels } from "@/data/navCarModels";

export function Footer() {
	return (
		<footer className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Main footer content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-12">
					{/* Company info */}
					<div className="lg:col-span-3">
						<h3 className="text-2xl font-bold mb-4 text-white">
							BYD Metromobile
						</h3>
						<p className="text-gray-300 mb-6">
							ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ
						</p>

						{/* Social media icons */}
						<div>
							<h4 className="text-lg font-semibold mb-4 text-white">
								ติดตามเรา
							</h4>
							<div className="flex gap-5">
								<Link
									href="https://line.me/R/ti/p/%40bydmetromobile"
									className="text-gray-300 hover:text-green-400 transition-colors duration-300"
									aria-label="Line"
								>
									<LineIcon />
								</Link>

								<Link
									href="https://www.facebook.com/BYDBANGKOK"
									className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
									aria-label="Facebook"
								>
									<BrandFacebook size={32} />
								</Link>

								<Link
									href="https://www.instagram.com/byd.metromobile"
									className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
									aria-label="Instagram"
								>
									<BrandInstagram size={32} />
								</Link>

								<Link
									href="https://www.tiktok.com/@byd_metromobile"
									className="text-gray-300 hover:text-red-400 transition-colors duration-300"
									aria-label="TikTok"
								>
									<BrandTiktok size={32} />
								</Link>
							</div>
						</div>
					</div>

					{/* Contact info */}
					<div className="lg:col-span-3">
						<h4 className="text-lg font-semibold mb-5 text-white">ติดต่อเรา</h4>

						<div className="space-y-5">
							<div>
								<p className="text-gray-200 font-medium mb-3">โทรศัพท์:</p>
								<ul className="space-y-2 text-gray-400">
									<li className="flex items-center hover:text-primary transition-colors duration-200">
										<span className="w-32">สาขาพระราม 3:</span>
										<a href="tel:022918889" className="hover:text-primary">
											02-291-8889
										</a>
									</li>
									<li className="flex items-center hover:text-primary transition-colors duration-200">
										<span className="w-32">สาขาตลิ่งชัน:</span>
										<a href="tel:024483999" className="hover:text-primary">
											02-448-3999
										</a>
									</li>
									<li className="flex items-center hover:text-primary transition-colors duration-200">
										<span className="w-32">สาขาอ่อนนุช:</span>
										<a href="tel:0804161888" className="hover:text-primary">
											080-416-1888
										</a>
									</li>
									<li className="flex items-center hover:text-primary transition-colors duration-200">
										<span className="w-32">รามอินทรา กม.9:</span>
										<a href="tel:0816656888" className="hover:text-primary">
											081-665-6888
										</a>
									</li>
								</ul>
							</div>

							<div>
								<p className="text-gray-200 font-medium mb-2">อีเมล:</p>
								<a
									href="mailto:bydmetromobile@gmail.com"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									bydmetromobile@gmail.com
								</a>
							</div>
						</div>
					</div>

					{/* Branch locations */}
					<div className="lg:col-span-6">
						<h4 className="text-lg font-semibold mb-5 text-white">
							สาขาของเรา
						</h4>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{/* Rama 3 */}
							<div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-700/70 transition-colors duration-300 border border-gray-700 hover:border-primary/30">
								<h5 className="font-medium text-base mb-3 text-white">
									สาขาพระราม 3
								</h5>
								<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-lg mb-3 shadow-lg">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.2497911530595!2d100.511054!3d13.6898373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e6d154c2af%3A0x3bc70940eac34a9a!2sBYD%20Metromobile%20Rama%203!5e0!3m2!1sen!2sth!4vYOUR_GENERATED_CODE"
										className="absolute top-0 left-0 w-full h-full"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
								<a
									href="tel:022918889"
									className="text-sm text-gray-300 hover:text-primary transition-colors duration-200 flex items-center"
								>
									โทร: 02-291-8889
								</a>
							</div>

							{/* Talingchan */}
							<div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-700/70 transition-colors duration-300 border border-gray-700 hover:border-primary/30">
								<h5 className="font-medium text-base mb-3 text-white">
									สาขาตลิ่งชัน
								</h5>
								<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-lg mb-3 shadow-lg">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.6495454285115!2d100.40893499999999!3d13.776053000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2979ff9e31b47%3A0x6d0aeb32f5db409d!2sBYD%20Metromobile!5e0!3m2!1sen!2sth!4v1710217344285!5m2!1sen!2sth"
										className="absolute top-0 left-0 w-full h-full"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
								<a
									href="tel:024483999"
									className="text-sm text-gray-300 hover:text-primary transition-colors duration-200 flex items-center"
								>
									โทร: 02-448-3999
								</a>
							</div>

							{/* Onnut */}
							<div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-700/70 transition-colors duration-300 border border-gray-700 hover:border-primary/30">
								<h5 className="font-medium text-base mb-3 text-white">
									สาขาอ่อนนุช
								</h5>
								<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-lg mb-3 shadow-lg">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8771825118584!2d100.70593!3d13.722032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d613e36f67bc3%3A0xc752c7b40c6b573!2zQllEIE1ldHJvbW9iaWxlIOC4reC5iOC4reC4meC4meC4uOC4iA!5e0!3m2!1sen!2sth!4v1710217460636!5m2!1sen!2sth"
										className="absolute top-0 left-0 w-full h-full"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
								<a
									href="tel:0804161888"
									className="text-sm text-gray-300 hover:text-primary transition-colors duration-200 flex items-center"
								>
									โทร: 080-416-1888
								</a>
							</div>

							{/* Ramindra */}
							<div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-700/70 transition-colors duration-300 border border-gray-700 hover:border-primary/30">
								<h5 className="font-medium text-base mb-3 text-white">
									สาขารามอินทรา กม.9
								</h5>
								<div className="relative w-full h-0 pb-[75%] overflow-hidden rounded-lg mb-3 shadow-lg">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5150.343180311472!2d100.66649121169309!3d13.832594395359672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6300152470d1%3A0xb40e702132cf177a!2zQllEIOC4o-C4suC4oeC4reC4tOC4meC4l-C4o-C4siDguIHguKEuOSDguYDguKHguYLguJfguKPguYLguKHguJrguLTguKU!5e1!3m2!1sth!2sth!4v1741852565855!5m2!1sth!2sth"
										className="absolute top-0 left-0 w-full h-full"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
								</div>
								<a
									href="tel:0816656888"
									className="text-sm text-gray-300 hover:text-primary transition-colors duration-200 flex items-center"
								>
									โทร: 081-665-6888
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Quick links */}
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
					<div>
						<h5 className="font-medium text-white mb-3">รถยนต์</h5>
						<ul className="space-y-2">
							{navCarModels.map((model) => (
								<li key={model.name}>
									<Link
										href={model.href}
										className="text-gray-400 hover:text-primary transition-colors duration-200"
									>
										{model.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h5 className="font-medium text-white mb-3">บริการ</h5>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									ทดลองขับ
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									บริการหลังการขาย
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									ศูนย์บริการ
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									อะไหล่และอุปกรณ์
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="font-medium text-white mb-3">โปรโมชั่น</h5>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									โปรโมชั่นปัจจุบัน
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									ข้อเสนอพิเศษ
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									แคมเปญ
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="font-medium text-white mb-3">เกี่ยวกับเรา</h5>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									เกี่ยวกับ BYD
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									ข่าวสาร
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									ร่วมงานกับเรา
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-primary transition-colors duration-200"
								>
									ติดต่อเรา
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="pt-8 border-t border-gray-800 text-center">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-400">
							&copy; {new Date().getFullYear()} BYD Metromobile. Copyright All
							Rights Reserved.
						</p>
						<div className="flex gap-6">
							<Link
								href="#"
								className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
							>
								นโยบายความเป็นส่วนตัว
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
							>
								เงื่อนไขการใช้งาน
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
							>
								แผนผังเว็บไซต์
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
