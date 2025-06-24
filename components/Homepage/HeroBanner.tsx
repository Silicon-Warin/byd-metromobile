import Image from "next/image";

export const HeroBanner = () => (
	<div className="relative w-full h-full bg-transparent flex justify-center items-center overflow-hidden">
		{/* Responsive BYD Banner - Optimized for LCP */}
		<Image
			src="/images/banners/byd-banner-1.webp"
			alt="BYD Banner"
			fill
			priority
			fetchPriority="high"
			className="object-contain md:object-cover object-center"
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
			quality={85}
			placeholder="blur"
			blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
		/>
	</div>
);
