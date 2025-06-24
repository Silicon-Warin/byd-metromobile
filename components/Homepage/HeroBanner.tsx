"use client";

import Image from "next/image";

export const HeroBanner = () => (
	<div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex justify-center items-center overflow-hidden">
		{/* Background gradient ที่จะแสดงขณะโหลดและเป็น fallback */}
		<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 z-0" />

		{/* รูปเดียวสำหรับทุก device */}
		<Image
			src="/images/banners/byd-banner-1.webp"
			alt="BYD Banner - รถยนต์ไฟฟ้าจาก BYD Metromobile"
			fill
			priority
			fetchPriority="high"
			className="object-contain md:object-cover object-center transition-opacity duration-500 z-10"
			sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 75vw, 70vw"
			quality={75}
			placeholder="blur"
			blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
		/>

		{/* Overlay gradient สำหรับความสวยงามและอ่านข้อความง่าย */}
		<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 z-20" />
	</div>
);
