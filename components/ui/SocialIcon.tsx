"use client";

import { SocialIconProps } from "@/types/social";
import Link from "next/link";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "./LineIcon";

const platformConfig = {
	line: {
		Icon: LineIcon,
		hoverColor: "hover:text-[#06C755]",
		label: "Line",
	},
	facebook: {
		Icon: BrandFacebook,
		hoverColor: "hover:text-blue-400",
		label: "Facebook",
	},
	instagram: {
		Icon: BrandInstagram,
		hoverColor: "hover:text-pink-400",
		label: "Instagram",
	},
	tiktok: {
		Icon: BrandTiktok,
		hoverColor: "hover:text-red-400",
		label: "TikTok",
	},
};

export function SocialIcon({
	platform,
	size = 32,
	className = "",
	href,
}: SocialIconProps) {
	const config = platformConfig[platform];
	const Icon = config.Icon;

	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`text-gray-300 ${config.hoverColor} transition-colors duration-300 ${className}`}
			aria-label={config.label}
		>
			{platform === "line" ? <Icon /> : <Icon size={size} />}
		</Link>
	);
}
