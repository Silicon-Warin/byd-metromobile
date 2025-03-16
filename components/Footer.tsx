"use client";

import Link from "next/link";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "@/components/ui/LineIcon";

export function Footer() {
	return (
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
						&copy; {new Date().getFullYear()} BYD Metromobile. Copyright All
						Right Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
