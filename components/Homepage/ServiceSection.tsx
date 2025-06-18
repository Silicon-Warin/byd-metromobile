// components/ServiceSection.tsx หรือ pages/your-page/ServiceSection.tsx (ตามโครงสร้างโปรเจกต์ของคุณ)

import { Button } from "@/components/ui/button"; // ตรวจสอบพาธให้ถูกต้องตามโครงสร้างจริง
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Wrench, Phone, Clock } from "lucide-react"; // ตรวจสอบว่าได้ติดตั้ง lucide-react แล้ว
import LineOALinkButton from "../Line/line-button"; // ตรวจสอบพาธให้ถูกต้องตามโครงสร้างจริง
import ServiceInfoCards from "./ServiceInfoCards"; // ตรวจสอบพาธให้ถูกต้องตามโครงสร้างจริง
import BranchMapButton from "@/components/BranchMapButton"; // ตรวจสอบพาธให้ถูกต้องตามโครงสร้างจริง

export default function ServiceSection() {
	return (
		<section className="relative py-4 md:py-20 overflow-hidden bg-gray-800">
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
					// classNames สำหรับ Mobile: h-[500px] เป็นความสูงที่กำหนดเอง, pt-8 เป็น padding-top เพื่อเลื่อนรูปภาพลง
					// block sm:hidden: แสดงบนหน้าจอขนาดเล็กกว่า sm, ซ่อนบน sm ขึ้นไป
					className="object-cover w-full h-[500px] pt-8 block sm:hidden"
					quality={80}
				/>
			</div>

			{/* Seamless gradient overlay that blends with models section */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-gray-900/70 to-gray-800/40" />

			{/* Additional blending overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />

			{/* Content Section */}

			<div className="relative w-full h-full px-4 md:px-8 pb-8 md:pb-16 z-20">
				<div className="max-w-7xl mx-auto flex flex-col h-full justify-between ">
					{/* Info Cards Mobile Top */}

					<div className="block md:hidden mb-6 pt-2">
						<ServiceInfoCards />
					</div>

					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
						{/* Left Content (Title and Description) */}
						<div className="flex-1 max-w-3xl">
							{/* Headings: ปรับขนาด font และ margin ตาม breakpoint */}
							<h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
								เยี่ยมชมโชว์รูม
								<br />
								<span className="text-gradient-metro-pulse bg-clip-text text-transparent">
									Metromobile
								</span>
							</h2>
							{/* Description: ปรับขนาด font และ margin ตาม breakpoint */}
							<p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
								"สัมผัส BYD ทุกรุ่น พร้อมโชว์รูมที่ทันสมัย"
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:flex-col xl:flex-row">
							<BranchMapButton />
							<LineOALinkButton className="text-white">
								นัดหมายเข้าชม
							</LineOALinkButton>
						</div>
					</div>

					{/* Info Cards Desktop Bottom */}
					{/* hidden md:block: ซ่อนบนหน้าจอขนาดเล็กกว่า md, แสดงบน md ขึ้นไป */}
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
