interface NavItem {
	id: string;
	label: string;
	href: string;
	hasDropdown?: boolean;
}

export const navItems: NavItem[] = [
	{ id: "home", label: "หน้าแรก", href: "/" },
	{ id: "models", label: "รุ่นรถ", href: "#", hasDropdown: true },
	{ id: "promotions", label: "โปรโมชั่น", href: "/promotions" },
	{ id: "service", label: "SERVICE", href: "/service" },
	{ id: "blog", label: "ข่าวสารและกิจกรรม", href: "/blog" },
	{ id: "about", label: "เกี่ยวกับเรา", href: "/we-are-byd" },
	{ id: "contact", label: "ติดต่อเรา", href: "/contact" },
];
