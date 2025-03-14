import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "เกี่ยวกับเรา | เมโทรโมบิล ผู้นำด้านรถยนต์ไฟฟ้า BYD ในประเทศไทย",
	description:
		"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย พร้อมให้คำปรึกษาด้านรถยนต์ไฟฟ้าครบวงจร โดย เมโทรโมบิล",
	keywords: [
		"เมโทรโมบิล",
		"BYD",
		"รถยนต์ไฟฟ้า",
		"Metromobile",
		"ศูนย์บริการ BYD",
	],
};

export default function AboutPage() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="py-16 md:py-24 bg-background">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl md:text-5xl font-prompt font-bold text-center mb-8">
						เกี่ยวกับเรา
					</h1>

					{/* BYD Section */}
					<div id="about-byd" className="max-w-4xl mx-auto mb-20 ">
						<h2 className="text-3xl font-prompt font-bold mb-8">
							เกี่ยวกับ BYD
						</h2>
						<div className="flex justify-center mb-8">
							<Image
								src="/images/BYD_Logo.png"
								alt="BYD โลโก้ - บริษัทรถยนต์ไฟฟ้าชั้นนำ"
								width={300}
								height={100}
								className="h-auto"
							/>
						</div>

						<div className="space-y-6 text-lg">
							<p>
								<span className="font-bold">Build Your Dreams</span> หรือ{" "}
								<span className="font-bold">BYD</span>{" "}
								เป็นบริษัทเทคโนโลยีชั้นนำจากประเทศจีนที่มุ่งมั่นในการพัฒนานวัตกรรมเพื่อชีวิตที่ดีกว่า
								ด้วยความเชี่ยวชาญมากกว่า 30 ปี
							</p>
							<p>
								BYD เป็นผู้นำในอุตสาหกรรมต่าง ๆ ไม่ว่าจะเป็นรถยนต์ พลังงานสะอาด
								ชิ้นส่วนและอุปกรณ์อิเล็กทรอนิกส์ และการขนส่งทางรถไฟ
								และมีสำนักงานทั่วโลกกว่า 70+ ประเทศ ด้วยเทคโนโลยี{" "}
								<Link
									href="https://www.byd.com/en/blade-battery"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									Blade Battery
								</Link>{" "}
								ที่ปฏิวัติวงการแบตเตอรี่รถยนต์ไฟฟ้า
							</p>
							<p>
								ในบริบทของประเทศไทย บริษัท{" "}
								<span className="font-bold">RÊVER AUTOMOTIVE</span>{" "}
								เป็นผู้นำเข้ารถยนต์ BYD อย่างเป็นทางการแต่เพียงผู้เดียว
								สามารถศึกษาข้อมูลเพิ่มเติมได้ที่{" "}
								<Link
									href="https://www.byd.com/en-th"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									เว็บไซต์ BYD ประเทศไทย
								</Link>
							</p>
						</div>
					</div>

					{/* Brand Showcase Image */}
					<div className="relative w-full h-[400px] md:h-[500px] mb-20 rounded-xl overflow-hidden">
						<Image
							src="/images/byd-showcase.jpg"
							alt="รถยนต์ไฟฟ้า BYD โดย เมโทรโมบิล - ผู้จำหน่ายอย่างเป็นทางการ"
							fill
							className="object-cover"
						/>
					</div>

					{/* Metromobile Section */}
					<div id="about-metromobile" className="max-w-4xl mx-auto mb-20 ">
						<h2 className="text-3xl font-prompt font-bold text-center mb-8">
							เกี่ยวกับ เมโทรโมบิล
						</h2>

						<div className="flex justify-center mb-8">
							<Image
								src="/images/metromobile-logo.png"
								alt="เมโทรโมบิล โลโก้ - ผู้จำหน่ายรถยนต์ BYD อย่างเป็นทางการ"
								width={300}
								height={100}
								className="h-auto"
							/>
						</div>

						<h3 className="text-2xl font-prompt font-bold text-center mb-6">
							Metromobile
						</h3>

						<div className="space-y-6 text-lg">
							<p>
								บริษัท เมโทรโมบิล จำกัด (Metromobile) เป็นผู้จำหน่ายรถยนต์ BYD
								อย่างเป็นทางการ ภายใต้แบรนด์ BYD Metromobile
							</p>
							<p>
								Metromobile คือ ศูนย์รวมนวัตกรรมยานยนต์แห่งโลกอนาคต
								ที่พร้อมจะพาคุณขับเคลื่อน สู่โลกเเละสิ่งเเวดล้อมในฝันที่ดีขึ้น
								ผ่านเทคโนโลยีและยานยนต์พลังงานรูปแบบใหม่ที่นอกจากจะเป็นมิตรกับสิ่งเเวดล้อมเเล้ว
								Metromobile
								ยังพร้อมให้บริการดูเเลรักษาให้คําปรึกษาทุกเรื่องที่เกี่ยวกับรถยนต์
								ผ่านบริการหลังการขาย
								ที่ครบวงจรโดยผู้เชี่ยวชาญเพื่อให้ทุกการเดินทางของคุณอบอุ่น
								ปลอดภัย ในทุกเส้นทาง
							</p>
							<p>
								เพราะเราเชื่อว่า "รถ" ไม่ใช่เเค่ยานพาหนะเเต่ "รถ"
								ยังเปรียบเสมือนจุดเชื่อมต่อ ประสบการณ์
								เเละความทรงจําตลอดระยะเส้นทางการเดินทางของชีวิต
								มาร่วมขับเคลื่อนไปสู่โลกอนาคตในฝัน อย่างมั่งคง
								เเละปลอดภัยด้วยกันที่ "Metromobile"
							</p>
						</div>

						<div className="bg-background p-8 rounded-xl mt-12">
							<p className="text-xl font-prompt font-bold text-center mb-4">
								"เพราะเราเชื่อว่า "รถ" ไม่ใช่เเค่ยานพาหนะ"
							</p>
							<p className="text-lg text-center">
								แต่มันคือจุดเชื่อมต่อของ Lifestyle ที่บ่งบอกถึงคุณค่า
								ความภาคภูมิใจ ประสบการณ์ และความทรงจำ
								ตลอดระยะเวลาการเดินทางของชีวิต
							</p>
						</div>

						<div className="mt-12 space-y-6 text-lg">
							<p>
								บริษัท เมโทรโมบิล จำกัด (Metromobile) ผู้จำหน่ายรถยนต์ BYD
								อย่างเป็นทางการ ในนาม BYD Metromobile
								พร้อมยืนหนึ่งในด้านประสบการณ์ และความชำนาญ
								ตั้งแต่นวัตกรรมเครื่องยนต์ สมรรถนะการซ่อมแซม และบำรุงรักษา
								ที่สามารถตอบโจทย์ให้แก่ผู้ใช้บริการมาหลายยุคหลายสมัย
							</p>
							<p>
								ภายใต้ "ความเชื่อมั่นและไว้วางใจ"
								ที่ลูกค้าทุกท่านมีให้แก่เราทีมงาน Metromobile
								ขอให้คำมั่นสัญญาที่จะดูแล ให้คำแนะนำ และส่งมอบรถยนต์ BYD
								พร้อมกับการบริการหลังการขายที่จะสร้างรอยยิ้มและความประทับใจ
								ให้แก่ลูกค้าทุกท่านตลอดไป
							</p>
							<p>
								เรียนรู้เพิ่มเติมเกี่ยวกับเทคโนโลยีรถยนต์ไฟฟ้าได้ที่{" "}
								<Link
									href="https://www.evat.or.th/15708383/ev-knowledge"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									สมาคมยานยนต์ไฟฟ้าไทย
								</Link>
							</p>
						</div>
					</div>

					{/* Business Partners Section */}
					<div id="business-partners" className="max-w-4xl mx-auto mb-20 ">
						<h2 className="text-3xl font-prompt font-bold text-center mb-12">
							พันธมิตรทางธุรกิจ
						</h2>

						<p className="text-xl text-center mb-10">
							"Metromobile" เป็นบริษัทที่ก่อตั้งโดยพันธมิตรทางธุรกิจ ได้แก่
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-white p-6 rounded-xl shadow-md">
								<h3 className="text-xl font-bold mb-4">
									บริษัท เอ มอเตอร์ กรุ๊ป จำกัด
								</h3>
								<div className="flex justify-center mb-8">
									<Image
										src="/images/AMotor_Logo.png"
										alt="โลโก้ เอ มอเตอร์ กรุ๊ป - พันธมิตรของ เมโทรโมบิล"
										width={300}
										height={100}
										className="h-auto"
									/>
								</div>
								<p>
									ผู้นำเข้า และจำหน่ายรถยนต์หรู
									และผู้เชี่ยวชาญในวงการรถยนต์หรูที่มีประสบการณ์ด้านงานซ่อมบำรุง
									รถยนต์มายาวนานกว่า 30 ปี
								</p>
								<p className="mt-4">
									<Link
										href="https://www.amotorgroup.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary underline"
									>
										เยี่ยมชมเว็บไซต์
									</Link>
								</p>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-md">
								<h3 className="text-xl font-bold mb-4">ดร. ภัทร จึงกานต์กุล</h3>
								<div className="flex justify-center mb-8">
									<Image
										src="/images/DrPat_Photo.jpg"
										alt="ดร. ภัทร จึงกานต์กุล - พันธมิตรของ เมโทรโมบิล"
										width={200}
										height={200}
										className="h-auto rounded-full"
									/>
								</div>
								<p>
									นักธุรกิจ-นักลงทุน ด้านธุรกิจพลังงานทางเลือก และ
									Sustainability ecosystem
									ผู้เชี่ยวชาญด้านการสื่อสารประชาสัมพันธ์ด้วยประสบการณ์ด้านสื่อสารมวลชนมากกว่า
									20 ปี
								</p>
							</div>
						</div>

						<div className="bg-background p-8 rounded-xl mt-12">
							<p className="text-xl font-prompt font-bold text-center">
								"เพราะเราเชื่อว่า "รถ" ไม่ใช่เเค่ยานพาหนะ"
							</p>
						</div>
					</div>

					{/* Services Section */}
					<div id="our-services" className="max-w-4xl mx-auto ">
						<h2 className="text-3xl font-prompt font-bold text-center mb-12">
							บริการของเรา
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							<div className="bg-white p-8 rounded-xl shadow-md">
								<h3 className="text-2xl font-bold mb-4">
									รถเก่าแลกใหม่ (Trade-in)
								</h3>
								<div className="relative w-full h-[200px] mb-6 rounded-lg overflow-hidden">
									<Image
										src="/images/trade-in-service.jpg"
										alt="บริการรถเก่าแลกใหม่ โดย เมโทรโมบิล"
										fill
										className="object-cover"
									/>
								</div>
								<p className="text-lg">
									Metromobile ร่วมกับบริษัทพันธมิตรในเครือ
									รับซื้อรถยนต์คันเก่าเพื่อแลกรถยนต์คันใหม่
								</p>
								<p className="text-lg mt-4">
									ด้วยความเชี่ยวชาญและความพร้อมให้บริการ Metromobile
									มั่นใจว่าเราพร้อมที่จะให้ข้อเสนอที่ดีกว่าและคุณค่ากว่าตลาด
								</p>
								<p className="mt-6">
									<Link
										href="/services/trade-in"
										className="text-primary underline"
									>
										ดูรายละเอียดเพิ่มเติม
									</Link>
								</p>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-md">
								<h3 className="text-2xl font-bold mb-4">
									บริการหลังการขายและงานซ่อมบำรุง (After-sales)
								</h3>
								<div className="relative w-full h-[200px] mb-6 rounded-lg overflow-hidden">
									<Image
										src="/images/after-sales-service.jpg"
										alt="บริการหลังการขายและซ่อมบำรุง โดย เมโทรโมบิล"
										fill
										className="object-cover"
									/>
								</div>
								<p className="text-lg">
									Metromobile
									มีผู้เชี่ยวชาญในอุตสาหกรรมยานยนต์ที่มีประสบการณ์กว่า 30
									ปีในงานบริการหลังการขายและซ่อมบำรุง
									เราพร้อมที่จะให้คำปรึกษาและบริการที่ครบวงจรไม่ว่าจะเป็นบริการซ่อมสีและตัวถัง
									และยังมี EV Expert
									ที่สามารถซ่อมบำรุงรถยนต์พลังงานไฟฟ้าที่แรกๆของไทย
								</p>
								<p className="mt-6">
									<Link
										href="/services/after-sales"
										className="text-primary underline"
									>
										ดูรายละเอียดเพิ่มเติม
									</Link>
								</p>
							</div>
						</div>

						{/* FAQ Section */}
						<div className="mt-20">
							<h3 className="text-2xl font-prompt font-bold text-center mb-8">
								คำถามที่พบบ่อย
							</h3>

							<div className="space-y-4">
								<div className="bg-white p-6 rounded-xl shadow-sm">
									<h4 className="text-xl font-bold mb-2">
										เมโทรโมบิลมีสาขาที่ไหนบ้าง?
									</h4>
									<p>
										ปัจจุบัน เมโทรโมบิลมีสาขาให้บริการในกรุงเทพฯ และปริมณฑล
										สามารถดูรายละเอียดสาขาทั้งหมดได้ที่หน้า{" "}
										<Link href="/contact" className="text-primary underline">
											ติดต่อเรา
										</Link>
									</p>
								</div>

								<div className="bg-white p-6 rounded-xl shadow-sm">
									<h4 className="text-xl font-bold mb-2">
										รถยนต์ BYD มีรุ่นอะไรบ้างในประเทศไทย?
									</h4>
									<p>
										BYD มีรถยนต์หลากหลายรุ่นในประเทศไทย ทั้ง ATTO 3, DOLPHIN,
										SEAL และอื่นๆ สามารถดูรายละเอียดทั้งหมดได้ที่หน้า{" "}
										<Link href="/models" className="text-primary underline">
											รุ่นรถยนต์
										</Link>
									</p>
								</div>

								<div className="bg-white p-6 rounded-xl shadow-sm">
									<h4 className="text-xl font-bold mb-2">
										มีบริการซ่อมบำรุงรถยนต์ไฟฟ้าหรือไม่?
									</h4>
									<p>
										เมโทรโมบิลมีบริการซ่อมบำรุงรถยนต์ไฟฟ้าครบวงจร
										โดยทีมช่างผู้เชี่ยวชาญที่ผ่านการอบรมจาก BYD โดยตรง
										สามารถดูรายละเอียดเพิ่มเติมได้ที่หน้า{" "}
										<Link
											href="/services/after-sales"
											className="text-primary underline"
										>
											บริการหลังการขาย
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
