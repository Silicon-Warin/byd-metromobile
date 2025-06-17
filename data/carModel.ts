// data/carModel.ts

export interface CarModel {
	id: number | string;
	name: string;
	slug?: string;
	tagline?: string;
	description: string;
	price: number;
	imageUrlPromo: string;
	imageUrlModel: string;
	imageUrlHero?: string;
	imageUrlReal?: string;
	imageUrlDataLeft?: string;
	imageUrlDataRight?: string;
	imageWidth: number;
	imageHeight: number;
	featuresTitle: string;
	specialFeature: string;
	specialFeatureDescription: string;
	specialFeatureImage: string;
	specs?: {
		acceleration: string;
		range: string;
		drivetrain?: string;
		motor: string;
		battery?: string;
		charging?: string;
		annotate?: string;
	};
	colors?: CarColor[];
	variants: CarVariant[];
	specialOffers: string[];
	features: string[] | CarFeature[];
	gallery?: {
		exterior?: string[]; // รูปภาพภายนอก
		interior?: string[]; // รูปภาพภายใน
	};
	techHighlight?: hightlightSpec[];
	techSpec?: TechSpec;
	promotion?: any; // เพิ่ม property promotion
}

export interface CarColor {
	name: string;
	code: string;
	image: string;
	gradient?: string;
	shadow?: string;
	border?: string;
}

export interface CarFeature {
	title: string;
	description: string;
	image: string;
}

export interface CarVariant {
	id: string;
	name: string;
	price: number;
	range: string;
	power?: string;
	acceleration?: string;
	accelerationData?: {
		value: string;
		unit: string;
		description: string;
	};
	techSpec?: TechSpec;
}

export interface hightlightSpec {
	title: string;
	description: string;
	image: string;
}

export function findModelBySlug(slug: string): CarModel | undefined {
	// First try to find by explicit slug
	let model = defaultModels.find(
		(model) => model.slug === slug || model.id.toString() === slug
	);

	if (!model) {
		console.log(`No model found with slug: ${slug}`);
	}

	return model;
}

export const defaultModels: CarModel[] = [
	{
		id: 1,
		name: "BYD SEALION 7",
		slug: "byd-sealion7",
		description: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
		price: 1249900,
		imageUrlPromo: "/images/promotions/sealion7.webp",
		imageUrlModel: "/images/models/byd-sealion7/sealion7-card.webp",
		imageUrlHero: "/images/models/byd-sealion7/sealion7-hero.jpg",
		imageUrlReal: "/images/models/byd-sealion7/sealion7-real.jpg",
		imageUrlDataLeft: "/images/models/byd-sealion7/overview-img-01.webp",
		imageWidth: 1200,
		imageHeight: 800,
		featuresTitle: "ที่สุดแห่งสมรรถนะ",
		specialFeature: "INFOTAINMENT & LIFESTYLE",
		specialFeatureDescription:
			"ปลุกทุกความตื่นเต้นเร้าใจ ด้วยสุนทรียภาพของการขับขี่ เหนือระดับตลอดการเดินทางด้วยฟังก์ชันการใช้งานที่ล้ำสมัย ตอบโจทย์ไลฟ์สไตล์คนเมืองอย่างแท้จริง",
		specialFeatureImage: "/images/models/byd-sealion7/special-feature.webp",
		specs: {
			acceleration: "5.4 วินาที",
			range: "542 กิโลเมตร",
			drivetrain: "AWD Performance",
			motor: "มอเตอร์ 380 กิโลวัตต์",
			battery: "87 กิโลวัตต์-ชั่วโมง",
			charging: "AC type 2 / DC CCS 2 (150 กิโลวัตต์)",
			annotate: "*AWD Performance performance and specifications",
		},
		colors: [
			{
				name: "Horizon white",
				code: "#F5F5F5",
				gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
				image: "/images/models/byd-sealion7/sealion7-horizon-white.png",
			},
			{
				name: "Quantum Black",
				code: "#121212",
				gradient: "linear-gradient(145deg, #222222, #000000)",
				border: "1px solid rgba(255, 255, 255, 0.7)",
				image: "/images/models/byd-sealion7/sealion7-quantum-black.png",
			},
			{
				name: "Space Grey",
				code: "#2C5C8F",
				gradient: "linear-gradient(145deg, #2C5C8F, #1D3D5F)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.3)",
				image: "/images/models/byd-sealion7/sealion7-space-grey.png",
			},
			{
				name: "Shark Grey",
				code: "#7AA5CD",
				gradient: "linear-gradient(145deg, #7AA5CD, #5585B5)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.2)",
				image: "/images/models/byd-sealion7/sealion7-shark-grey.png",
			},
		],
		gallery: {
			exterior: [
				"/images/models/byd-sealion7/exterior/sealion7-ext1.webp",
				"/images/models/byd-sealion7/exterior/sealion7-ext2.webp",
				"/images/models/byd-sealion7/exterior/sealion7-ext3.webp",
				"/images/models/byd-sealion7/exterior/sealion7-ext4.webp",
				"/images/models/byd-sealion7/exterior/sealion7-ext5.webp",
			],
			interior: [
				"/images/models/byd-sealion7/interior/sealion7-int1.webp",
				"/images/models/byd-sealion7/interior/sealion7-int2.webp",
				"/images/models/byd-sealion7/interior/sealion7-int3.webp",
				"/images/models/byd-sealion7/interior/sealion7-int4.webp",
				"/images/models/byd-sealion7/interior/sealion7-int5.webp",
				"/images/models/byd-sealion7/interior/sealion7-int6.webp",
				"/images/models/byd-sealion7/interior/sealion7-int7.webp",
				"/images/models/byd-sealion7/interior/sealion7-int8.webp",
			],
		},
		variants: [
			{
				id: "rwd-premium",
				name: "RWD PREMIUM",
				power: "230kW",
				acceleration: "6.7 Sec",
				price: 1249900,
				range: "567 km",
				accelerationData: {
					value: "6.7",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "awd-performance",
				name: "AWD PERFORMANCE",
				power: "380kW",
				acceleration: "5.4 Sec",
				price: 1399900,
				range: "542 km",
				accelerationData: {
					value: "5.4",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
		],
		features: [
			{
				title: "ระบบกันสะเทือนอัจฉริยะ",
				description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
				image: "/images/models/byd-sealion7/sealion7-design-card1.jpg",
			},
			{
				title: "ระบบกระจายแรงบิดอัจฉริยะ",
				description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
				image: "/images/models/byd-sealion7/sealion7-design-card2.jpg",
			},
			{
				title: "โครงสร้างแบตเตอรี่แนบสนิท",
				description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
				image: "/images/models/byd-sealion7/sealion7-design-card3.jpg",
			},
		],
		techHighlight: [
			{
				title: "Advanced Cell-to-Body Technology",
				description:
					"BYD SEALION 7 เป็นยานพาหนะที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ",
				image: "/images/models/byd-sealion7/sealion7-tech1.jpg",
			},
			{
				title: "BYD SEALION 7",
				description: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
				image: "/images/models/byd-sealion7/sealion7-tech2.jpg",
			},
		],
		specialOffers: [
			"ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
			"บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
			"รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
			"รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
			"สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
			"สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
			"พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
			"ค่าจดทะเบียน",
			"ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
		],
	},
	{
		id: 2,
		name: "BYD M6",
		slug: "byd-m6",
		description: "MPV ไฟฟ้าสำหรับครอบครัว กว้างขวางและสะดวกสบาย",
		price: 799900,
		imageUrlPromo: "/images/promotions/m6.webp",
		imageUrlModel: "/images/models/byd-m6/m6-card.webp",
		imageUrlHero: "/images/models/byd-m6/m6-hero.jpg",
		imageUrlReal: "/images/models/byd-m6/m6-real.webp",
		imageWidth: 1200,
		imageHeight: 800,
		featuresTitle: "ที่สุดแห่งสมรรถนะ",
		specialFeature: "Family Comfort & Space",
		specialFeatureDescription:
			"MPV ไฟฟ้าสำหรับครอบครัว ที่ตอบโจทย์ทุกการเดินทาง ด้วยพื้นที่กว้างขวาง สะดวกสบาย และความปลอดภัยระดับพรีเมียม",
		specialFeatureImage: "/images/models/byd-m6/special-feature.webp",
		specs: {
			acceleration: "8.5 วินาที",
			range: "530 กิโลเมตร",
			drivetrain: "FWD",
			motor: "มอเตอร์ 150 กิโลวัตต์",
			battery: "71.7 กิโลวัตต์-ชั่วโมง",
			charging: "AC type 2 / DC CCS 2 (100 กิโลวัตต์)",
			annotate: "*Extended range performance and specifications",
		},
		colors: [
			{
				name: "Harbour Grey",
				code: "#8B8680",
				gradient: "linear-gradient(145deg, #9A958F, #7A756F)",
				shadow:
					"inset 2px 2px 5px rgba(170, 165, 155, 0.4), inset -2px -2px 5px rgba(100, 95, 85, 0.3)",
				image: "/images/models/byd-m6/m6-harbour-grey.webp",
			},
			{
				name: "Quantum Black",
				code: "#2C2C2C",
				gradient: "linear-gradient(145deg, #383838, #1F1F1F)",
				shadow:
					"inset 2px 2px 5px rgba(80, 80, 80, 0.3), inset -2px -2px 5px rgba(10, 10, 10, 0.4)",
				image: "/images/models/byd-m6/m6-quantum-black.webp",
			},
			{
				name: "Quartz Blue",
				code: "#4A5C73",
				gradient: "linear-gradient(145deg, #556B82, #3E4F62)",
				shadow:
					"inset 2px 2px 5px rgba(100, 120, 140, 0.4), inset -2px -2px 5px rgba(50, 65, 80, 0.3)",
				image: "/images/models/byd-m6/m6-quartz-blue.webp",
			},
			{
				name: "Crystal White",
				code: "#F8F8F8",
				gradient: "linear-gradient(145deg, #FFFFFF, #EFEFEF)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.8), inset -2px -2px 5px rgba(220, 220, 220, 0.4)",
				image: "/images/models/byd-m6/m6-crystal-white.webp",
			},
		],
		variants: [
			{
				id: "dynamic",
				name: "DYNAMIC",
				power: "150kW",
				acceleration: "8.5 Sec",
				price: 799900,
				range: "420 km",
				accelerationData: {
					value: "8.5",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "extended",
				name: "EXTENDED",
				power: "150kW",
				acceleration: "8.5 Sec",
				price: 899900,
				range: "530 km",
				accelerationData: {
					value: "8.5",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "7seat",
				name: "NEW 7 SEAT",
				power: "150kW",
				acceleration: "8.5 Sec",
				price: 899900,
				range: "420 km",
				accelerationData: {
					value: "8.5",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
		],
		features: [
			{
				title: "ระบบกันสะเทือนอัจฉริยะ",
				description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
				image: "/images/models/byd-m6/m6-design-card1.jpg",
			},
			{
				title: "ระบบกระจายแรงบิดอัจฉริยะ",
				description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
				image: "/images/models/byd-m6/m6-design-card2.jpg",
			},
			{
				title: "โครงสร้างแบตเตอรี่แนบสนิท",
				description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
				image: "/images/models/byd-m6/m6-design-card3.jpg",
			},
		],
		gallery: {
			exterior: [
				"/images/models/byd-m6/exterior/m6-ext1.webp",
				"/images/models/byd-m6/exterior/m6-ext2.webp",
				"/images/models/byd-m6/exterior/m6-ext3.webp",
				"/images/models/byd-m6/exterior/m6-ext4.webp",
				"/images/models/byd-m6/exterior/m6-ext5.webp",
			],
			interior: [
				"/images/models/byd-m6/interior/m6-int1.webp",
				"/images/models/byd-m6/interior/m6-int2.webp",
				"/images/models/byd-m6/interior/m6-int3.webp",
				"/images/models/byd-m6/interior/m6-int4.webp",
				"/images/models/byd-m6/interior/m6-int5.webp",
				"/images/models/byd-m6/interior/m6-int6.webp",
			],
		},
		techHighlight: [
			{
				title: "Advanced Cell-to-Body Technology",
				description:
					"BYD M6 เป็นยานพาหนะที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ",
				image: "/images/models/byd-m6/m6-tech1.jpg",
			},
			{
				title: "BYD M6",
				description: "MPV ไฟฟ้าสำหรับครอบครัว กว้างขวางและสะดวกสบาย",
				image: "/images/models/byd-m6/m6-tech2.jpg",
			},
		],
		specialOffers: [
			"ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
			"บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
			"รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
			"รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
			"สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
			"สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
			"พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
			"ค่าจดทะเบียน",
			"ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
		],
	},
	{
		id: 3,
		name: "BYD SEALION 6 DM i",
		slug: "byd-sealion6dmi",
		description: "SUV Plug-in Hybrid ขับเคลื่อน 4 ล้อ พลังงานสะอาด",
		price: 939900,
		imageUrlPromo: "/images/promotions/sealion6dmi.webp",
		imageUrlModel: "/images/models/byd-sealion6dmi/sealion6dmi-card.webp",
		imageUrlHero: "/images/models/byd-sealion6dmi/sealion6dmi-hero.webp",
		imageUrlReal: "/images/models/byd-sealion6dmi/sealion6dmi-real.jpg",
		imageWidth: 1200,
		imageHeight: 800,
		featuresTitle: "DM-i Hybrid System",
		specialFeature: "DM-i Hybrid Technology",
		specialFeatureDescription:
			"ยนตรกรรม DM-i Hybrid บ่มเพาะความเป็นเลิศด้านการประหยัดพลังงาน ระยะทางขับขี่รวม 1,092 กิโลเมตร ครอบคลุมทุกการเดินทาง",
		specialFeatureImage: "/images/models/byd-sealion6dmi/special-feature.webp",
		specs: {
			acceleration: "6.9 วินาที",
			range: "200 กิโลเมตร",
			drivetrain: "AWD Premium",
			motor: "มอเตอร์ 320 กิโลวัตต์",
			battery: "18.3 กิโลวัตต์-ชั่วโมง",
			charging: "AC type 2 / DC CCS 2 (80 กิโลวัตต์)",
			annotate: "*Premium performance and specifications",
		},
		colors: [
			{
				name: "Horizon white",
				code: "#F5F5F5",
				gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-horizon-white.png",
			},
			{
				name: "Quantum Black",
				code: "#121212",
				gradient: "linear-gradient(145deg, #222222, #000000)",
				border: "1px solid rgba(255, 255, 255, 0.7)",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-quantum-black.png",
			},
			{
				name: "Space Grey",
				code: "#2C5C8F",
				gradient: "linear-gradient(145deg, #2C5C8F, #1D3D5F)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.3)",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-space-grey.png",
			},
			{
				name: "Ocean Blue",
				code: "#4A90B2",
				gradient: "linear-gradient(145deg, #4A90B2, #357A9F)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.2)",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-ocean-blue.png",
			},
		],
		variants: [
			{
				id: "dynamic",
				name: "DYNAMIC",
				power: "160kW",
				acceleration: "7.9 Sec",
				price: 939900,
				range: "1000 km",
				accelerationData: {
					value: "7.9",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "premium",
				name: "PREMIUM",
				power: "320kW",
				acceleration: "6.9 Sec",
				price: 1039900,
				range: "1092 km",
				accelerationData: {
					value: "6.9",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
		],
		features: [
			{
				title: "Electric Hybrid DM-i",
				description:
					"ยนตรกรรม DM-i Hybrid บ่มเพาะความเป็นเลิศด้านการประหยัดพลังงาน",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-design-card1.jpg",
			},
			{
				title: "BYD Blade Battery",
				description: "เทคโนโลยีแบตเตอรี่ประสิทธิภาพสูง ปลอดภัยเหนือระดับ",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-design-card2.jpg",
			},
			{
				title: "1,092 กม. ระยะทางขับขี่",
				description: "ระยะทางขับขี่รวม 1,092 กิโลเมตร ครอบคลุมทุกการเดินทาง",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-design-card3.jpg",
			},
			{
				title: "Direct Engine Drive",
				description:
					"ระบบขับเคลื่อนด้วยเครื่องยนต์โดยตรง เพื่อประสิทธิภาพสูงสุด",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-design-card4.jpg",
			},
			{
				title: "EV & DM-i Mode",
				description:
					"เลือกโหมดการขับขี่ได้ทั้งแบบไฟฟ้า 100% และแบบ DM-i Hybrid",
				image: "/images/models/byd-sealion6dmi/sealion6dmi-design-card5.jpg",
			},
		],
		gallery: {
			exterior: [
				"/images/models/byd-sealion6dmi/exterior/sealion6dmi-ext1.webp",
				"/images/models/byd-sealion6dmi/exterior/sealion6dmi-ext2.webp",
				"/images/models/byd-sealion6dmi/exterior/sealion6dmi-ext3.webp",
				"/images/models/byd-sealion6dmi/exterior/sealion6dmi-ext4.webp",
				"/images/models/byd-sealion6dmi/exterior/sealion6dmi-ext5.webp",
			],
			interior: [
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int1.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int2.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int3.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int4.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int5.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int6.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int7.webp",
				"/images/models/byd-sealion6dmi/interior/sealion6dmi-int8.webp",
			],
		},
		techHighlight: [
			{
				title: "Advanced DM-i Hybrid Technology",
				description:
					"BYD SEALION 6 DM-i เป็นยานพาหนะ Plug-in Hybrid ที่นำเทคโนโลยี DM-i มาใช้ ให้ประสิทธิภาพการประหยัดเชื้อเชื้อไฟที่เหนือระดับ พร้อมระยะทางขับขี่รวมถึง 1,092 กิโลเมตร",
				image: "/images/models/byd-sealion6dmi/byd-sealion6dmi-tech1.jpg",
			},
			{
				title: "BYD SEALION 6 DM-i",
				description: "SUV Plug-in Hybrid ขับเคลื่อน 4 ล้อ พลังงานสะอาด",
				image: "/images/models/byd-sealion6dmi/byd-sealion6dmi-tech2.jpg",
			},
		],
		specialOffers: [
			"ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
			"รับประกันตัวรถ (WARRANTY) 6 ปี หรือ 150,000 กม.",
			"รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
			"บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
			"สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
			"สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
			"พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
			"ค่าจดทะเบียน",
			"ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
		],
	},
	{
		id: 4,
		name: "BYD SEAL",
		slug: "byd-seal",
		description:
			"ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
		price: 999900,
		imageUrlPromo: "/images/promotions/seal.webp",
		imageUrlModel: "/images/models/byd-seal/seal-card.webp",
		imageUrlHero: "/images/models/byd-seal/seal-hero.jpg",
		imageUrlReal: "/images/models/byd-seal/seal-real.jpg",
		imageWidth: 1200,
		imageHeight: 800,
		featuresTitle: "ที่สุดแห่งสมรรถนะ",
		specialFeature: "Silver-Plated Panoramic Glass Roof",
		specialFeatureDescription:
			"หลังคากระจกพาโนรามิก 2 ชั้น ขนาดใหญ่ถึง 1.9 ตารางเมตร ให้มุมมองที่กว้างกว่า พร้อมการเคลือบด้วย Silver-plated ที่ช่วยลดปริมาณแสงที่ผ่านเข้ามา ในห้องโดยสาร พร้อมป้องกัน แสง UV ทำให้ห้องโดยสารเย็นสบายตลอดการขับขี่",
		specialFeatureImage: "/images/models/seal/special-feature.webp",
		specs: {
			acceleration: "3.8 วินาที",
			range: "580 กิโลเมตร",
			drivetrain: "AWD Performance",
			motor: "390 kW",
			battery: "82.56 kWh",
			charging: "AC type 2 / DC CCS 2 (150 kW)",
			annotate: "*AWD Performance performance and specifications",
		},
		colors: [
			{
				name: "Horizon white",
				code: "#F5F5F5",
				gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
				image: "/images/models/seal/seal-horizon-white.png",
			},
			{
				name: "Quantum Black",
				code: "#121212",
				gradient: "linear-gradient(145deg, #222222, #000000)",
				border: "1px solid rgba(255, 255, 255, 0.7)",
				image: "/images/models/seal/seal-quantum-black.png",
			},
			{
				name: "Space Grey",
				code: "#2C5C8F",
				gradient: "linear-gradient(145deg, #2C5C8F, #1D3D5F)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.3)",
				image: "/images/models/seal/seal-space-grey.png",
			},
			{
				name: "Velocity blue",
				code: "#7AA5CD",
				gradient: "linear-gradient(145deg, #7AA5CD, #5585B5)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.2)",
				image: "/images/models/seal/seal-velocity-blue.png",
			},
		],
		gallery: {
			exterior: [
				"/images/models/seal/exterior/seal-ext1.webp",
				"/images/models/seal/exterior/seal-ext2.webp",
				"/images/models/seal/exterior/seal-ext3.webp",
				"/images/models/seal/exterior/seal-ext4.webp",
				"/images/models/seal/exterior/seal-ext5.webp",
			],
			interior: [
				"/images/models/seal/interior/seal-int1.webp",
				"/images/models/seal/interior/seal-int2.webp",
				"/images/models/seal/interior/seal-int3.webp",
				"/images/models/seal/interior/seal-int4.webp",
				"/images/models/seal/interior/seal-int5.webp",
				"/images/models/seal/interior/seal-int6.webp",
				"/images/models/seal/interior/seal-int7.webp",
				"/images/models/seal/interior/seal-int8.webp",
			],
		},
		features: [
			{
				title: "ระบบกันสะเทือนอัจฉริยะ",
				description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
				image: "/images/models/seal/seal-design-card1.jpg",
			},
			{
				title: "ระบบกระจายแรงบิดอัจฉริยะ",
				description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
				image: "/images/models/seal/seal-design-card2.jpg",
			},
			{
				title: "โครงสร้างแบตเตอรี่แนบสนิท",
				description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
				image: "/images/models/seal/seal-design-card3.jpg",
			},
		],
		variants: [
			{
				id: "dynamic",
				name: "Dynamic",
				power: "150kW",
				acceleration: "7.5 Sec",
				price: 999900,
				range: "510 km",
				accelerationData: {
					value: "7.5",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "premium",
				name: "Premium",
				power: "230kW",
				acceleration: "5.9 Sec",
				price: 1099900,
				range: "650 km",
				accelerationData: {
					value: "5.9",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "performance",
				name: "AWD Performance",
				power: "390kW",
				acceleration: "3.8 Sec",
				price: 1199900,
				range: "580 km",
				accelerationData: {
					value: "3.8",
					unit: "Sec",
					description: "0-100 km/h",
				},
				techSpec: {
					dimensions: {
						length: "4,800 มม.",
						width: "1,875 มม.",
						height: "1,460 มม.",
						wheelbase: "2,920 มม.",
					},
					weights: {
						curb: "2,185 กก.",
						gross: "2,631 กก.",
					},
					clearance: "120 มม.",
					tiresAndWheels: "245/45 R19",
					batteryCapacity: "82.56 กิโลวัตต์-ชั่วโมง",
					chargingTime: {
						acCharging: "10 ชั่วโมง (11kW)",
						dcCharging: "30 นาที (150kW, 30-80%)",
					},
					performance: {
						topSpeed: "200 กม./ชม.",
						acceleration: "3.8 วินาที",
						range: "580 กม.",
					},
					misc: {
						ประเภทแบตเตอรี่: "BYD Blade Battery (LFP)",
						มอเตอร์ไฟฟ้า: "Dual Motor (Front + Rear)",
						กำลังรวมสูงสุด: "390 กิโลวัตต์",
						แรงบิดสูงสุด: "670 นิวตันเมตร",
					},
				},
			},
		],
		specialOffers: [
			"ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
			"บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
			"รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
			"รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
			"สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
			"สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
			"พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
			"ค่าจดทะเบียน",
			"ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
		],
		techHighlight: [
			{
				title: "Advanced Cell-to-Body Technology",
				description:
					"BYD SEAL เป็นยานพาหนะแรกที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ พร้อมทั้งเพิ่มพื้นที่ภายในและปรับสมดุลการกระจายน้ำหนักให้การควบคุมรถมีประสิทธิภาพยิ่งขึ้น",
				image: "/images/models/seal/seal-tech1.jpg",
			},
			{
				title: "BYD SEAL",
				description:
					"ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
				image: "/images/models/seal/seal-tech2.jpg",
			},
		],
	},
	{
		id: 5,
		name: "BYD ATTO 3",
		slug: "byd-atto3",
		description: "SUV ไฟฟ้ากะทัดรัด สมรรถนะโดดเด่น เหมาะกับทุกการขับขี่",
		price: 899900,
		imageUrlPromo: "/images/promotions/atto3.webp",
		imageUrlModel: "/images/models/byd-atto3/atto3-card.webp",
		imageUrlHero: "/images/models/byd-atto3/atto3-hero.webp",
		imageUrlReal: "/images/models/byd-atto3/atto3-real.jpg",
		imageWidth: 1200,
		imageHeight: 800,
		featuresTitle: "ที่สุดแห่งสมรรถนะ",
		specialFeature: "Smart Connectivity & Safety",
		specialFeatureDescription:
			"SUV ไฟฟ้ากะทัดรัด ที่รวมเทคโนโลยีความปลอดภัยและระบบเชื่อมต่ออัจฉริยะ เหมาะสำหรับการใช้งานในเมืองและการเดินทางไกล",
		specialFeatureImage: "/images/models/byd-atto3/special-feature.webp",
		specs: {
			acceleration: "7.3 วินาที",
			range: "480 กิโลเมตร",
			drivetrain: "FWD",
			motor: "มอเตอร์ 150 กิโลวัตต์",
			battery: "60.48 กิโลวัตต์-ชั่วโมง",
			charging: "AC type 2 / DC CCS 2 (80 กิโลวัตต์)",
			annotate: "*Extended range performance and specifications",
		},
		colors: [
			{
				name: "Horizon white",
				code: "#F5F5F5",
				gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
				image: "/images/models/byd-atto3/byd-atto3-horizon-white.png",
			},
			{
				name: "Quantum Black",
				code: "#121212",
				gradient: "linear-gradient(145deg, #222222, #000000)",
				border: "1px solid rgba(255, 255, 255, 0.7)",
				image: "/images/models/byd-atto3/byd-atto3-quantum-black.png",
			},
			{
				name: "Forest Green",
				code: "#2E5C3E",
				gradient: "linear-gradient(145deg, #2E5C3E, #1D3D2A)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.3)",
				image: "/images/models/byd-atto3/byd-atto3-forest-green.png",
			},
			{
				name: "Electric Blue",
				code: "#4A90E2",
				gradient: "linear-gradient(145deg, #4A90E2, #357ABD)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.2)",
				image: "/images/models/byd-atto3/byd-atto3-electric-blue.png",
			},
		],
		gallery: {
			exterior: [
				"/images/models/byd-atto3/exterior/byd-atto3-ext1.webp",
				"/images/models/byd-atto3/exterior/byd-atto3-ext2.webp",
				"/images/models/byd-atto3/exterior/byd-atto3-ext3.webp",
				"/images/models/byd-atto3/exterior/byd-atto3-ext4.webp",
				"/images/models/byd-atto3/exterior/byd-atto3-ext5.webp",
			],
			interior: [
				"/images/models/byd-atto3/interior/byd-atto3-int1.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int2.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int3.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int4.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int5.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int6.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int7.webp",
				"/images/models/byd-atto3/interior/byd-atto3-int8.webp",
			],
		},
		variants: [
			{
				id: "extended",
				name: "EXTENDED",
				power: "150kW",
				acceleration: "7.3 Sec",
				price: 899900,
				range: "480 km",
				accelerationData: {
					value: "7.3",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
		],
		features: [
			{
				title: "ระบบกันสะเทือนอัจฉริยะ",
				description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
				image: "/images/models/byd-atto3/atto3-design-card1.jpg",
			},
			{
				title: "ระบบกระจายแรงบิดอัจฉริยะ",
				description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
				image: "/images/models/byd-atto3/atto3-design-card2.jpg",
			},
			{
				title: "โครงสร้างแบตเตอรี่แนบสนิท",
				description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
				image: "/images/models/byd-atto3/atto3-design-card3.jpg",
			},
		],
		techHighlight: [
			{
				title: "Advanced Cell-to-Body Technology",
				description:
					"BYD ATTO 3 เป็นยานพาหนะที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ",
				image: "/images/models/byd-atto3/atto3-tech1.jpg",
			},
			{
				title: "BYD ATTO 3",
				description: "SUV ไฟฟ้ากะทัดรัด สมรรถนะโดดเด่น เหมาะกับทุกการขับขี่",
				image: "/images/models/byd-atto3/atto3-tech2.jpg",
			},
		],
		specialOffers: [
			"ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
			"บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
			"รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
			"รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
			"ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
			"สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
			"สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
			"พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
			"ค่าจดทะเบียน",
		],
	},
	{
		id: 6,
		name: "BYD DOLPHIN",
		slug: "byd-dolphin",
		description: "แฮทช์แบคไฟฟ้า ประหยัดพลังงาน คล่องตัวสำหรับการใช้งานในเมือง",
		price: 499900,
		imageUrlPromo: "/images/promotions/dolphin.webp",
		imageUrlModel: "/images/models/byd-dolphin/dolphin-card.webp",
		imageUrlHero: "/images/models/byd-dolphin/dolphin-hero.jpg",
		imageUrlReal: "/images/models/byd-dolphin/dolphin-real.webp",
		imageUrlDataLeft: "/images/models/byd-dolphin/dolphin-data-left.webp",
		gallery: {
			exterior: [
				"/images/models/byd-dolphin/exterior/dolphin-ext1.jpg",
				"/images/models/byd-dolphin/exterior/dolphin-ext2.jpg",
				"/images/models/byd-dolphin/exterior/dolphin-ext3.jpg",
				"/images/models/byd-dolphin/exterior/dolphin-ext4.jpg",
			],
			interior: [
				"/images/models/byd-dolphin/interior/dolphin-int1.jpg",
				"/images/models/byd-dolphin/interior/dolphin-int2.jpg",
				"/images/models/byd-dolphin/interior/dolphin-int3.jpg",
				"/images/models/byd-dolphin/interior/dolphin-int4.jpg",
				"/images/models/byd-dolphin/interior/dolphin-int5.jpg",
				"/images/models/byd-dolphin/interior/dolphin-int6.jpg",
			],
		},
		imageWidth: 1200,
		imageHeight: 800,
		featuresTitle: "Dynamic Design",
		specialFeature: "VtoL (VEHICLE TO LOAD)",
		specialFeatureDescription:
			"รองรับทุกการเดินทางให้สะดวกสบายยิ่งขึ้น ด้วยระบบ VtoL การต่อไฟจากแบตเตอรี่รถยนต์กับเครื่องใช้ไฟฟ้า",
		specialFeatureImage: "/images/models/byd-dolphin/special-feature.webp",
		specs: {
			acceleration: "7 วินาที",
			range: "490 กิโลเมตร",
			drivetrain: "FWD",
			motor: "มอเตอร์ 150 กิโลวัตต์",
			battery: "60.48 กิโลวัตต์-ชั่วโมง",
			charging: "AC type 2 / DC CCS 2 (80 กิโลวัตต์)",
			annotate: "*Extended range performance and battery specifications",
		},
		colors: [
			{
				name: "Coral Pink",
				code: "#EDC2CB",
				gradient: "linear-gradient(145deg, #F5D7DE, #E5A9B5)",
				shadow:
					"inset 2px 2px 5px rgba(255, 230, 237, 0.5), inset -2px -2px 5px rgba(180, 130, 140, 0.2)",
				image: "/images/models/byd-dolphin/dolphin-coral-pink.png",
			},
			{
				name: "Coastal Cream",
				code: "#E8E3D9",
				gradient: "linear-gradient(145deg, #F2EEE6, #DDD8CE)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(180, 170, 150, 0.2)",
				image: "/images/models/byd-dolphin/dolphin-coastal-cream.png",
			},
			{
				name: "Graphite Grey",
				code: "#7C7C7C",
				gradient: "linear-gradient(145deg, #8A8A8A, #696969)",
				shadow:
					"inset 2px 2px 5px rgba(180, 180, 180, 0.3), inset -2px -2px 5px rgba(60, 60, 60, 0.3)",
				image: "/images/models/byd-dolphin/dolphin-graphite-grey.png",
			},
			{
				name: "Frost White",
				code: "#FFFFFF",
				gradient: "linear-gradient(145deg, #FFFFFF, #F0F0F0)",
				shadow:
					"inset 2px 2px 5px rgba(255, 255, 255, 0.8), inset -2px -2px 5px rgba(200, 200, 200, 0.3)",
				image: "/images/models/byd-dolphin/dolphin-frost-white.png",
			},
		],
		variants: [
			{
				id: "standard-range",
				name: "STANDARD RANGE",
				power: "130kW",
				acceleration: "7.5 Sec",
				price: 499900,
				range: "435 km",
				accelerationData: {
					value: "7.5",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
			{
				id: "extended-range",
				name: "EXTENDED RANGE",
				power: "150kW",
				acceleration: "7.0 Sec",
				price: 599900,
				range: "490 km",
				accelerationData: {
					value: "7.0",
					unit: "Sec",
					description: "0-100 km/h",
				},
			},
		],
		features: [
			{
				title: "ระบบกันสะเทือนอัจฉริยะ",
				description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
				image: "/images/models/byd-dolphin/dolphin-design-card1.jpg",
			},
			{
				title: "ระบบกระจายแรงบิดอัจฉริยะ",
				description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
				image: "/images/models/byd-dolphin/dolphin-design-card2.jpg",
			},
			{
				title: "โครงสร้างแบตเตอรี่แนบสนิท",
				description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
				image: "/images/models/byd-dolphin/dolphin-design-card3.jpg",
			},
		],
		techHighlight: [
			{
				title: "Advanced Cell-to-Body Technology",
				description:
					"BYD DOLPHIN เป็นยานพาหนะที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ",
				image: "/images/models/byd-dolphin/dolphin-tech1.jpg",
			},
			{
				title: "BYD DOLPHIN",
				description:
					"แฮทช์แบคไฟฟ้า ประหยัดพลังงาน คล่องตัวสำหรับการใช้งานในเมือง",
				image: "/images/models/byd-dolphin/dolphin-tech2.jpg",
			},
		],
		specialOffers: [
			"ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
			"บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
			"รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
			"รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
			"ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC",
			"สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
			"สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
			"พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
			"ค่าจดทะเบียน",
			"ฟรี HOME CHARGER ยี่ห้อ ZHIDA (เฉพาะรุ่น EXTENDED)",
		],
	},
];

// เพิ่ม interface สำหรับข้อมูล tech spec
export interface TechSpec {
	dimensions?: {
		length: string; // ความยาว (มิลลิเมตร)
		width: string; // ความกว้าง (มิลลิเมตร)
		height: string; // ความสูง (มิลลิเมตร)
		wheelbase: string; // ระยะห่างล้อ (มิลลิเมตร)
	};
	weights?: {
		curb: string; // น้ำหนักรถเปล่า (กิโลกรัม)
		gross: string; // น้ำหนักรถรวมภาระ (กิโลกรัม)
	};
	clearance?: string; // ระยะห่างจากพื้น (มิลลิเมตร)
	tiresAndWheels?: string; // ขนาดล้อและยาง
	batteryCapacity?: string; // ความจุแบตเตอรี่ (กิโลวัตต์-ชั่วโมง)
	chargingTime?: {
		acCharging?: string; // เวลาชาร์จด้วย AC
		dcCharging?: string; // เวลาชาร์จด้วย DC
	};
	performance?: {
		topSpeed?: string; // ความเร็วสูงสุด (กม./ชม.)
		acceleration?: string; // อัตราเร่ง 0-100 กม./ชม. (วินาที)
		range?: string; // ระยะทางขับขี่ (กม.)
	};
	misc?: Record<string, string>; // ข้อมูลอื่นๆ
}
