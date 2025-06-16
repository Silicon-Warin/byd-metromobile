export default function BackgroundEffects() {
	return (
		<div className="fixed inset-0 -z-50 overflow-hidden bg-black">
			{/* Base static gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 to-black" />

			{/* Animated glowing orbs - Now with responsive sizing */}
			<div className="animate-orb-1 absolute -top-40 -left-40 w-[25rem] h-[25rem] lg:w-[40rem] lg:h-[40rem] bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-full blur-[120px] lg:blur-[180px]" />
			<div className="animate-orb-2 absolute -bottom-40 -right-40 w-[25rem] h-[25rem] lg:w-[40rem] lg:h-[40rem] bg-gradient-to-r from-cyan-500/40 to-teal-500/40 rounded-full blur-[120px] lg:blur-[180px] opacity-80 lg:opacity-100" />
			<div className="animate-orb-3 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] lg:w-[35rem] lg:h-[35rem] bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full blur-[100px] lg:blur-[150px] opacity-50 lg:opacity-70" />
		</div>
	);
}
