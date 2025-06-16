// MainHeader.tsx - Main header component
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DesktopNavbar from "./DesktopNavbar";
import TabletNavbar from "./TabletNavbar";
import MobileNavbar from "./MobileNavbar";

export function MainHeader() {
	const pathname = usePathname();
	const [scrollY, setScrollY] = useState(0);

	const isScrolled = scrollY > 50;
	const isModelDetailPage = pathname.startsWith("/model/");

	// React 19 optimized scroll handler with ref callback
	const setupScrollListener = (element: HTMLElement | null) => {
		if (!element || typeof window === "undefined") return;

		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);

		// React 19 feature: return cleanup function
		return () => window.removeEventListener("scroll", handleScroll);
	};

	// Initialize scroll listener on mount
	useEffect(() => {
		const cleanup = setupScrollListener(document.body);
		return cleanup;
	}, []);

	if (isModelDetailPage) {
		return null;
	}

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled
					? "bg-black/95 border-b border-white/10 shadow-2xl"
					: "bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm"
			}`}
		>
			<div className="container mx-auto px-4 lg:px-8 2xl:px-0">
				{/* Desktop Navbar (1376px and up) */}
				<div className="hidden min-[1376px]:block">
					<DesktopNavbar isScrolled={isScrolled} pathname={pathname} />
				</div>

				{/* Tablet Navbar (768px to 1375px) */}
				<div className="hidden md:block min-[1376px]:hidden">
					<TabletNavbar isScrolled={isScrolled} pathname={pathname} />
				</div>

				{/* Mobile Navbar (below 768px) */}
				<div className="block md:hidden">
					<MobileNavbar isScrolled={isScrolled} pathname={pathname} />
				</div>
			</div>
		</header>
	);
}
