"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, X } from "tabler-icons-react";
import { SocialIcon } from "@/app/utils/SocialIcon";

export default function ContactFAB() {
	const [isOpen, setIsOpen] = useState(false);
	const fabRef = useRef<HTMLDivElement>(null);

	// Close menu on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [fabRef]);

	// Contact options
	const contactOptions = [
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

	const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	};

	const handleContactClick = (option: (typeof contactOptions)[0]) => {
		if (isMobile()) {
			window.location.href = option.fallbackHref || option.href;
		} else {
			window.open(option.href, "_blank", "noopener,noreferrer");
		}
		setIsOpen(false);
	};

	return (
		<div ref={fabRef} className="fixed bottom-6 right-6 z-50">
			{/* Contact Menu */}
			<div
				className={cn(
					"absolute bottom-16 right-0 flex flex-col-reverse items-end gap-3 transition-all duration-300 ease-in-out",
					{
						"opacity-0 -translate-y-4 pointer-events-none": !isOpen,
						"opacity-100 translate-y-0": isOpen,
					}
				)}
			>
				{contactOptions.map((option, index) => (
					<button
						key={`contact-${index}`}
						onClick={() => handleContactClick(option)}
						className={cn(
							"flex items-center gap-2 rounded-full p-3 text-white cursor-pointer border-none",
							option.color,
							"hover:scale-105 active:scale-95 transition-transform duration-200",
							"transform-gpu transition-all duration-300 ease-in-out",
							{
								"opacity-0 translate-y-2": !isOpen,
								"opacity-100 translate-y-0": isOpen,
							}
						)}
						style={{
							boxShadow: `0 0 15px rgba(${option.glowColor}, 0.6)`,
							transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
						}}
						aria-label={`Contact via ${option.label}`}
					>
						<span className="text-sm font-medium mr-1 hidden md:inline-block whitespace-nowrap">
							{option.label}
						</span>
						<div className="[&>svg]:fill-white flex-shrink-0">
							{option.icon}
						</div>
					</button>
				))}
			</div>

			{/* Main FAB Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex h-14 w-14 items-center justify-center rounded-full relative overflow-hidden",
					"bg-gradient-to-r from-purple-600 to-blue-500 text-white",
					"shadow-[0_0_20px_rgba(147,51,234,0.7)]",
					"hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.9)]",
					"active:scale-95",
					"transition-all duration-300 ease-in-out"
				)}
				aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
				type="button"
			>
				<div
					className={cn(
						"absolute transition-all duration-300 ease-in-out transform",
						{
							"opacity-0 -rotate-90 scale-50": isOpen,
							"opacity-100 rotate-0 scale-100": !isOpen,
						}
					)}
				>
					<MessageCircle className="h-6 w-6" />
				</div>
				<div
					className={cn(
						"absolute transition-all duration-300 ease-in-out transform",
						{
							"opacity-100 rotate-0 scale-100": isOpen,
							"opacity-0 rotate-90 scale-50": !isOpen,
						}
					)}
				>
					<X className="h-6 w-6" />
				</div>
			</button>
		</div>
	);
}
