"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Car, Home } from "tabler-icons-react";

export const BottomNav = () => {
	// State for tracking if we're at the bottom of the page
	const [isAtBottom, setIsAtBottom] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Check if user has scrolled to the bottom
			// We consider "bottom" to be when user has scrolled to 90% of the page or more
			const scrollPosition = window.scrollY + window.innerHeight;
			const pageHeight = document.documentElement.scrollHeight;
			const scrollPercentage = (scrollPosition / pageHeight) * 100;

			setIsAtBottom(scrollPercentage >= 90);
		};

		window.addEventListener("scroll", handleScroll);
		// Initial check
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ${
				isAtBottom ? "translate-y-0" : "translate-y-full"
			}`}
		>
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					{/* Home button */}
					<a
						href="#"
						className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
					>
						<Home size={24} />
						<span className="text-xs mt-1">หน้าหลัก</span>
					</a>

					{/* Models button */}
					<a
						href="#car-models"
						className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
					>
						<Car size={24} />
						<span className="text-xs mt-1">รุ่นรถ</span>
					</a>

					{/* Contact Sales button - Main CTA */}
					<a
						href=""
						className="flex flex-col items-center justify-center px-6 py-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
					>
						<MessageCircle size={24} />
						<span className="text-xs mt-1">ติดต่อเซลล์</span>
					</a>

					{/* Call button */}
					<a
						href="tel:022918889"
						className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
					>
						<Phone size={24} />
						<span className="text-xs mt-1">โทร</span>
					</a>

					{/* Get Quote button */}
					<a
						href="#"
						className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
					>
						<span className="w-6 h-6 flex items-center justify-center border-2 border-current rounded-full text-sm font-bold">
							฿
						</span>
						<span className="text-xs mt-1">ใบเสนอราคา</span>
					</a>
				</div>
			</div>
		</nav>
	);
};
