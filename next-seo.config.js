/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
	titleTemplate:
		"%s | BYD Metromobile - ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
	defaultTitle:
		"BYD Metromobile - ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
	description:
		"ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทุกรุ่น ATTO 3, SEAL, DOLPHIN พร้อมบริการหลังการขายครบวงจร ศูนย์บริการมาตรฐาน BYD",
	canonical: "https://www.bydmetromobile.com",
	openGraph: {
		type: "website",
		locale: "th_TH",
		url: "https://www.bydmetromobile.com",
		siteName: "BYD Metromobile",
		title: "BYD Metromobile - ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
		description:
			"ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทุกรุ่น ATTO 3, SEAL, DOLPHIN พร้อมบริการหลังการขายครบวงจร ศูนย์บริการมาตรฐาน BYD",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "BYD Metromobile",
			},
		],
	},
	twitter: {
		handle: "@bydmetromobile",
		site: "@bydmetromobile",
		cardType: "summary_large_image",
	},
	additionalMetaTags: [
		{
			name: "keywords",
			content:
				"รถยนต์ไฟฟ้า, BYD, รถยนต์ไฟฟ้า BYD, ATTO 3, SEAL, DOLPHIN, ศูนย์บริการ BYD, รถยนต์พลังงานไฟฟ้า, EV, รถยนต์ไฟฟ้าราคา, ตัวแทนจำหน่าย BYD, โชว์รูม BYD, ทดลองขับ BYD",
		},
		{
			name: "google-site-verification",
			content: "YOUR_GOOGLE_VERIFICATION_CODE",
		},
	],
	robotsProps: {
		nosnippet: false,
		notranslate: false,
		noimageindex: false,
		noarchive: false,
		maxSnippet: -1,
		maxImagePreview: "large",
		maxVideoPreview: -1,
	},
};

export default defaultSEOConfig;
