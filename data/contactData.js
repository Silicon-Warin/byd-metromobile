import { SocialIcon } from "react-social-icons";

export const contactOptions = [
	{
		icon: (
			<SocialIcon
				type="line"
				size={20}
				url="https://line.me/R/ti/p/%40bydmetromobile"
			/>
		),
		label: "Line",
		href: "https://line.me/R/ti/p/%40bydmetromobile",
		fallbackHref: "https://line.me/R/ti/p/%40bydmetromobile",
		color: "bg-green-500",
		glowColor: "34, 197, 94",
	},
	{
		icon: (
			<SocialIcon
				type="facebook"
				size={20}
				url="https://facebook.com/bydbangkok"
			/>
		),
		label: "Facebook",
		href: "https://facebook.com/bydbangkok",
		fallbackHref: "https://m.facebook.com/bydbangkok",
		color: "bg-blue-600",
		glowColor: "37, 99, 235",
	},
	{
		icon: (
			<SocialIcon
				type="instagram"
				size={20}
				url="https://instagram.com/byd.metromobile"
			/>
		),
		label: "Instagram",
		href: "https://instagram.com/byd.metromobile",
		fallbackHref: "https://www.instagram.com/byd.metromobile",
		color: "bg-pink-500",
		glowColor: "236, 72, 153",
	},
	{
		icon: (
			<SocialIcon
				type="tiktok"
				size={20}
				url="https://tiktok.com/@bydbangkok"
			/>
		),
		label: "TikTok",
		href: "https://www.tiktok.com/@byd_metromobile",
		fallbackHref: "https://www.tiktok.com/@byd_metromobile",
		color: "bg-black",
		glowColor: "0, 0, 0",
	},
];
