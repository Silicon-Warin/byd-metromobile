import Image from "next/image";

export const HeroBanner = () => (
	<div className="relative w-full h-full bg-black flex justify-center items-center">
		{/* Responsive BYD Banner */}
		<Image
			src="/images/banners/byd-banner-1.webp"
			alt="BYD Banner"
			fill
			priority
			className="object-contain md:object-cover object-center"
			sizes="100vw"
		/>

		{/* Glow effects */}
		<div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
		<div className="absolute bottom-20 left-10 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000 pointer-events-none" />
		<div className="absolute top-1/2 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000 pointer-events-none" />
	</div>
);
