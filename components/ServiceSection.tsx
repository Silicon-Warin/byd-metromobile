import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
	return (
		<section className="relative w-full h-[70vh] min-h-[500px] flex items-end overflow-hidden animate-on-scroll">
			{/* Background Image */}
			<Image
				src="/images/showroom/byd-showroom-1.webp"
				alt="BYD Showroom Interior"
				fill
				className="object-cover"
				priority
				sizes="100vw"
			/>

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

			{/* Content */}
			<div className="relative z-10 w-full px-4 md:px-8 pb-8 md:pb-16">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
						{/* Left Content */}
						<div className="flex-1 animate-on-scroll-slide-left">
							<h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
								เยี่ยมชมโชว์รูม
								<br />
								<span className="text-gradient">BYD Metromobile</span>
							</h2>
							<p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-6 md:mb-8 drop-shadow leading-relaxed">
								สัมผัสประสบการณ์จริงกับรถยนต์ไฟฟ้า BYD ทุกรุ่น
								พร้อมทีมงานผู้เชี่ยวชาญให้คำปรึกษาและบริการครบวงจร
								ในบรรยากาศโชว์รูมที่ทันสมัย
							</p>
						</div>

						{/* Right Content - Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 animate-on-scroll-delay-1">
							<Button
								size="lg"
								className="bg-white hover:bg-white/90 text-black group px-6 md:px-8 py-6 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
								asChild
							>
								<Link href="/contact-us" className="flex items-center">
									<MapPin className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
									ดูแผนที่สาขา
								</Link>
							</Button>

							<Button
								size="lg"
								className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white group px-6 md:px-8 py-6 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
								asChild
							>
								<Link href="/contact-us" className="flex items-center">
									<Calendar className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
									นัดหมายเข้าชม
								</Link>
							</Button>
						</div>
					</div>

					{/* Bottom Info */}
					<div className="mt-8 md:mt-12 pt-8 border-t border-white/20 animate-on-scroll-delay-2">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
							<div>
								<h4 className="font-bold text-white mb-2">เวลาทำการ</h4>
								<p className="text-sm md:text-base">
									จันทร์ - อาทิตย์
									<br />
									08:30 - 17:30 น.
								</p>
							</div>
							<div>
								<h4 className="font-bold text-white mb-2">บริการ</h4>
								<p className="text-sm md:text-base">
									ทดลองขับ • คำปรึกษา
									<br />
									บริการหลังการขาย
								</p>
							</div>
							<div>
								<h4 className="font-bold text-white mb-2">ติดต่อ</h4>
								<p className="text-sm md:text-base">
									02-291-8889
									<br />5 สาขาทั่วกรุงเทพฯ
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
