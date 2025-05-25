import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/about-metromobile",
				destination: "/we-are-byd",
				permanent: true, // 301 redirect
			},
		];
	},
};

export default nextConfig;
