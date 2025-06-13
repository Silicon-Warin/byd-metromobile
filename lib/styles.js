import React from "react";

const NoiseBackground = () => {
	// Generate noise pattern programmatically
	const generateNoisePattern = () => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		canvas.width = 300;
		canvas.height = 300;

		const imageData = ctx.createImageData(canvas.width, canvas.height);

		for (let i = 0; i < imageData.data.length; i += 4) {
			const noise = Math.random() * 255;
			imageData.data[i] = noise; // Red
			imageData.data[i + 1] = noise; // Green
			imageData.data[i + 2] = noise; // Blue
			imageData.data[i + 3] = 40; // Alpha (reduced for subtlety)
		}

		ctx.putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	};

	const [noisePattern, setNoisePattern] = React.useState("");

	React.useEffect(() => {
		setNoisePattern(generateNoisePattern());
	}, []);

	return (
		<div className="min-h-screen w-full relative overflow-hidden bg-gray-950">
			{/* Dark Base Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

			{/* Subtle Noise Background */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: noisePattern ? `url(${noisePattern})` : "none",
					backgroundRepeat: "repeat",
					backgroundSize: "200px 200px",
					animation: "subtle-noise 10s linear infinite",
				}}
			/>

			{/* Growing Light Orbs */}
			<div className="absolute inset-0">
				{/* Main Glow */}
				<div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
					style={{
						animation: "glow-grow 4s ease-in-out infinite alternate",
					}}
				/>

				<div
					className="absolute top-2/3 right-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
					style={{
						animation: "glow-grow 6s ease-in-out infinite alternate-reverse",
					}}
				/>

				<div
					className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500/12 rounded-full blur-2xl"
					style={{
						animation: "glow-grow 5s ease-in-out infinite alternate",
					}}
				/>

				{/* Secondary Glows */}
				<div
					className="absolute top-1/2 right-1/4 w-48 h-48 bg-cyan-400/6 rounded-full blur-3xl"
					style={{
						animation: "glow-grow 7s ease-in-out infinite alternate",
					}}
				/>

				<div
					className="absolute bottom-1/3 right-2/3 w-56 h-56 bg-violet-500/8 rounded-full blur-2xl"
					style={{
						animation: "glow-grow 8s ease-in-out infinite alternate-reverse",
					}}
				/>
			</div>

			{/* CSS Animation Keyframes */}
			<style>{`
        @keyframes subtle-noise {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-2px) translateY(-3px); }
          50% { transform: translateX(2px) translateY(2px); }
          75% { transform: translateX(-1px) translateY(3px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes glow-grow {
          0% { 
            transform: scale(0.8) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.6;
          }
          100% { 
            transform: scale(1.3) rotate(360deg);
            opacity: 0.4;
          }
        }
        
        @keyframes light-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .light-particle {
          animation: floating 6s ease-in-out infinite;
        }
      `}</style>

			{/* Subtle Light Particles */}
			<div className="absolute inset-0">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-white/20 rounded-full light-particle"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 6}s`,
							boxShadow: "0 0 10px rgba(255,255,255,0.3)",
						}}
					/>
				))}
			</div>

			{/* Interactive Light Spots */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-1/3 left-1/3 w-2 h-2 bg-white/40 rounded-full"
					style={{
						boxShadow:
							"0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)",
						animation: "light-pulse 3s ease-in-out infinite",
					}}
				/>

				<div
					className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-blue-300/50 rounded-full"
					style={{
						boxShadow:
							"0 0 15px rgba(147,197,253,0.8), 0 0 30px rgba(147,197,253,0.4)",
						animation: "light-pulse 4s ease-in-out infinite 1s",
					}}
				/>

				<div
					className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-purple-300/60 rounded-full"
					style={{
						boxShadow:
							"0 0 12px rgba(196,181,253,0.9), 0 0 25px rgba(196,181,253,0.5)",
						animation: "light-pulse 5s ease-in-out infinite 2s",
					}}
				/>
			</div>

			{/* Content Layer */}
			<div className="relative z-10 flex items-center justify-center min-h-screen p-4">
				<div className="text-center space-y-6">
					<h1
						className="text-4xl md:text-6xl font-bold text-white mb-4"
						style={{
							textShadow:
								"0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
						}}
					>
						DARK GLOW
					</h1>
					<p className="text-lg text-gray-300 max-w-md mx-auto">
						Dark theme with growing light effects และ subtle noise texture
					</p>

					{/* Demo Cards with Dark Glass Effect */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
						<div
							className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300"
							style={{
								boxShadow:
									"0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
							}}
						>
							<h3 className="text-xl font-semibold text-white mb-2">
								Dark Card
							</h3>
							<p className="text-gray-400">เห็น growing light effects ไหม?</p>
						</div>
						<div
							className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 transition-all duration-300"
							style={{
								boxShadow:
									"0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
							}}
						>
							<h3 className="text-xl font-semibold text-white mb-2">
								Glow Card
							</h3>
							<p className="text-gray-400">แสงเติบโต + noise texture!</p>
						</div>
					</div>

					{/* Interactive Glow Button */}
					<button
						onClick={() => setNoisePattern(generateNoisePattern())}
						className="group mt-8 px-8 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/20 rounded-full text-white font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105"
						style={{
							boxShadow:
								"0 0 20px rgba(59,130,246,0.3), 0 0 40px rgba(147,51,234,0.2)",
						}}
					>
						<span className="group-hover:text-blue-300 transition-colors duration-300">
							✨ Regenerate Glow Effect
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoiseBackground;
