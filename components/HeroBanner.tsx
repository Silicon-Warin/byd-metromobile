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
			sizes="100vw"
		/>

		{/* Glow effects - ปรับให้เหมาะกับ mobile */}
		<div className="absolute top-4 right-4 md:top-10 md:right-10 w-16 h-16 md:w-32 md:h-32 bg-blue-500/30 rounded-full blur-2xl md:blur-3xl animate-pulse pointer-events-none" />
		<div className="absolute bottom-8 left-4 md:bottom-20 md:left-10 w-12 h-12 md:w-24 md:h-24 bg-cyan-400/20 rounded-full blur-xl md:blur-2xl animate-pulse delay-1000 pointer-events-none" />
		<div className="absolute top-1/2 right-1/4 w-20 h-20 md:w-40 md:h-40 bg-purple-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse delay-2000 pointer-events-none" />
	</div>
);
