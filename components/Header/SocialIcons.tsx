import React from "react";
import Link from "next/link";
import { BrandFacebook, BrandInstagram, BrandTiktok } from "tabler-icons-react";
import LineIcon from "@/components/ui/LineIcon";

export function SocialIcons() {
	return (
		<>
			<Link
				href="https://www.facebook.com/BYDBANGKOK"
				className="text-white hover:text-blue-400 transition-colors"
				aria-label="Facebook"
				target="_blank"
				rel="noopener noreferrer"
			>
				<BrandFacebook size={28} />
			</Link>

			<Link
				href="https://www.instagram.com/byd.metromobile"
				className="text-white hover:text-pink-400 transition-colors"
				aria-label="Instagram"
				target="_blank"
				rel="noopener noreferrer"
			>
				<BrandInstagram size={28} />
			</Link>

			<Link
				href="https://line.me/R/ti/p/@429xjvpr"
				className="text-white hover:text-green-400 transition-colors"
				aria-label="Line"
				target="_blank"
				rel="noopener noreferrer"
			>
				<LineIcon />
			</Link>

			<Link
				href="https://www.tiktok.com/@byd_metromobile"
				className="text-white hover:text-red-400 transition-colors"
				aria-label="TikTok"
				target="_blank"
				rel="noopener noreferrer"
			>
				<BrandTiktok size={28} />
			</Link>
		</>
	);
}
