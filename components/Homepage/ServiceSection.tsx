import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Wrench, Phone, Clock } from "lucide-react";
import LineOALinkButton from "../Line/line-button";
import ServiceInfoCards from "./ServiceInfoCards";

export default function ServiceSection() {
	return (
		<section className="relative py-20 overflow-hidden bg-gray-800">
			{/* Fade from previous section */}
			<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-800 to-transparent z-10"></div>

			{/* Background Images Carousel */}
			<div className="absolute inset-0 animate-fade-in-up">
				{/* Desktop Image */}
				<Image
					src="/images/showroom/byd-showroom-1.webp"
					alt="โชว์รูม BYD"
					fill
					className="object-cover w-full h-full hidden sm:block"
					quality={90}
					priority
				/>
				{/* Mobile Image */}
				<Image
					src="/images/showroom/byd-showroom-mobile-1.webp"
					alt="โชว์รูม BYD (Mobile)"
					fill
					className="object-cover w-full h-[500px] pt-8 block sm:hidden"
					quality={80}
				/>
			</div>

			{/* Seamless gradient overlay that blends with models section */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-gray-900/70 to-gray-800/40" />

			{/* Additional blending overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

			{/* Content Section */}
			<div className="relative z-10 w-full h-full px-4 md:px-8 pb-8 md:pb-16">
				<div className="max-w-7xl mx-auto flex flex-col h-full justify-between">
					{/* Info Cards Mobile Top */}
					<div className="block md:hidden mb-6 pt-2">
						<ServiceInfoCards />
					</div>
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
						{/* Left Content */}
						<div className="flex-1 max-w-3xl">
							<h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
								เยี่ยมชมโชว์รูม
								<br />
								<span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
									BYD Metromobile
								</span>
							</h2>
							<p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
								สัมผัสประสบการณ์จริงกับรถยนต์ไฟฟ้า BYD ทุกรุ่น
								พร้อมทีมงานผู้เชี่ยวชาญให้คำปรึกษาและบริการครบวงจร
								ในบรรยากาศโชว์รูมที่ทันสมัย
							</p>
						</div>

						{/* Right Content */}
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:flex-col xl:flex-row">
							<Button
								size="lg"
								className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-900 group px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20"
								asChild
							>
								<Link
									href="/contact-us"
									className="flex items-center justify-center"
								>
									<MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
									ดูแผนที่สาขา
								</Link>
							</Button>
							<Button
								size="lg"
								className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white group px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
								asChild
							>
								<LineOALinkButton className="flex items-center justify-center">
									<Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
									นัดหมายเข้าชม
								</LineOALinkButton>
							</Button>
						</div>
					</div>

					{/* Info Cards Desktop Bottom */}
					<div className="hidden md:block mt-8">
						<ServiceInfoCards />
					</div>
				</div>
			</div>
			{/* Fade to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
		</section>
	);
}
