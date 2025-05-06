export default function BackgroundEffects() {
	return (
		<>
			{/* Gradient background and blur effects */}
			<div className="pointer-events-none fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
				<div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
				<div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
			</div>

			{/* Background with gradient and blur effects */}
			<div className="absolute inset-0 z-0">
				{/* Blur effects similar to cursor.so */}
				<div className="absolute top-1/4 left-1/3 w-1/2 h-1/2 bg-[#3765ff] opacity-10 blur-[120px] rounded-full"></div>
				<div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#afb5ff] opacity-10 blur-[100px] rounded-full"></div>
			</div>
		</>
	);
}
