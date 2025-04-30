"use client";

import Link from "next/link";
import { navCarModels } from "@/data/navCarModels";
import { useState } from "react";
import SocialIcons from "@/app/utils/SocialIcon";

export function Footer() {
	const [openSection, setOpenSection] = useState<string | null>(null);

	const toggleSection = (section: string) => {
		if (openSection === section) {
			setOpenSection(null);
		} else {
			setOpenSection(section);
		}
	};

	return (
		<footer className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Main footer content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
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

							<SocialIcons size={40} />
						</div>
					</div>

					{/* Contact info */}
					<div className="lg:col-span-3">
						<h4 className="text-lg font-semibold mb-5 text-white">ติดต่อเรา</h4>

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
					<h4 className="text-lg font-semibold mb-5 text-white">สาขาของเรา</h4>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{/* Rama 3 */}
						<div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-700/70 transition-colors duration-300 border border-gray-700 hover:border-primary/30">
							<h5 className="font-medium text-base mb-3 text-white">
								สาขาพระราม 3
							</h5>
							<div className="space-y-2 mb-3">
								<p className="text-sm text-gray-300">
									455/2 ถ. พระรามที่ 3 แขวงบางโคล่ เขตบางคอแหลม กรุงเทพมหานคร
									10120
								</p>
								<a
									href="https://maps.app.goo.gl/XwUZTfTeDM7b6SJ67"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200"
								>
									<span>ดูแผนที่</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
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
							<div className="space-y-2 mb-3">
								<p className="text-sm text-gray-300">
									64,1 ถ.กาญจนาภิเษก บางระมาด ตลิ่งชัน กรุงเทพฯ 10170
								</p>
								<a
									href="https://maps.app.goo.gl/kbCCdjg27oYPT3tn8"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200"
								>
									<span>ดูแผนที่</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
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
							<div className="space-y-2 mb-3">
								<p className="text-sm text-gray-300">
									909 เขตประเวศ กรุงเทพมหานคร 10250
								</p>
								<a
									href="https://maps.app.goo.gl/tc25PTPPgp2P2wNi9"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200"
								>
									<span>ดูแผนที่</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
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
							<div className="space-y-2 mb-3">
								<p className="text-sm text-gray-300">
									591 ถ. รามอินทรา แขวงรามอินทรา เขตคันนายาว กรุงเทพมหานคร 10230
								</p>
								<a
									href="https://maps.app.goo.gl/bLQ16KsJcoFk5BjJ6"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200"
								>
									<span>ดูแผนที่</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
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

			{/* Quick links - Desktop only */}
			<div className="hidden md:grid grid-cols-4 gap-0 mb-12 container mx-auto mt-8 max-w-7xl px-4">
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
			<div className="pt-8 border-t border-gray-800">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-gray-400 text-center md:text-left">
						&copy; {new Date().getFullYear()} BYD Metromobile. Copyright All
						Rights Reserved.
					</p>
					<div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
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
		</footer>
	);
}
