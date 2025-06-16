import Image from "next/image";

export const HeroBanner = () => (
	<div className="relative w-full h-full bg-transparent flex justify-center items-center overflow-hidden">
		{/* Responsive BYD Banner */}
		<Image
			src="/images/banners/byd-banner-1.webp"
			alt="BYD Banner"
			fill
			priority
			className="object-contain md:object-cover object-center"
			sizes="(max-width: 768px) 100vw, 70vw"
			quality={80}
		/>
	</div>
);
