"use client";

import Link from "next/link";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "./LineIcon";
// ข้อมูล Icon และสีที่ใช้
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

// ทำเป็น Function Component ธรรมดา ไม่มี Type
export function SocialIcon({ platform, size = 36, className = "", href }) {
	// แปลงเป็นตัวพิมพ์เล็กเพื่อความสม่ำเสมอ
	const platformKey = platform.toLowerCase();

	// ถ้าไม่มี icon ที่ต้องการ ให้ใช้ icon ทั่วไปแทน
	if (!platformConfig[platformKey]) {
		console.error(`Platform ${platform} is not supported`);
		return (
			<Link
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={`text-gray-300 hover:text-blue-400 transition-colors duration-300 ${className}`}
				aria-label={platform}
			>
				<div
					style={{ width: size, height: size }}
					className="flex items-center justify-center"
				>
					<svg
						width={size * 0.7}
						height={size * 0.7}
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
					</svg>
				</div>
			</Link>
		);
	}

	const config = platformConfig[platformKey];
	const Icon = config.Icon;

	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`text-gray-300 ${config.hoverColor} transition-colors duration-300 ${className}`}
			aria-label={config.label}
		>
			<Icon size={size} />
		</Link>
	);
}
