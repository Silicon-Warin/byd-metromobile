"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Plus } from "tabler-icons-react";
import { SocialIcon } from "@/app/utils/SocialIcon";

export default function ContactFAB() {
	const [isExpanded, setIsExpanded] = useState(false);
	const fabRef = useRef<HTMLDivElement>(null);

	// Close menu on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
				setIsExpanded(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [fabRef]);

	// Main contact options (always visible)
	const mainContactOptions = [
		{
			icon: (
				<SocialIcon
					type="line"
					size={24}
					url="https://line.me/R/ti/p/%40bydmetromobile"
				/>
			),
			label: "Line Official",
			href: "https://line.me/R/ti/p/%40bydmetromobile",
			fallbackHref: "https://line.me/R/ti/p/%40bydmetromobile",
			color: "bg-gradient-to-r from-green-500 to-green-600",
			glowColor: "34, 197, 94",
		},
		{
			icon: (
				<SocialIcon
					type="facebook"
					size={24}
					url="https://facebook.com/bydbangkok"
				/>
			),
			label: "Facebook",
			href: "https://facebook.com/bydbangkok",
			fallbackHref: "https://m.facebook.com/bydbangkok",
			color: "bg-gradient-to-r from-blue-600 to-blue-700",
			glowColor: "37, 99, 235",
		},
	];

	// Additional contact options (show when expanded)
	const additionalContactOptions = [
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
			color: "bg-gradient-to-r from-pink-500 to-purple-600",
			glowColor: "236, 72, 153",
		},
		{
			icon: (
				<SocialIcon
					type="tiktok"
					size={20}
					url="https://tiktok.com/@byd_metromobile"
				/>
			),
			label: "TikTok",
			href: "https://www.tiktok.com/@byd_metromobile",
			fallbackHref: "https://www.tiktok.com/@byd_metromobile",
			color: "bg-gradient-to-r from-gray-800 to-black",
			glowColor: "0, 0, 0",
		},
	];

	const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	};

	const handleContactClick = (option: any) => {
		if (isMobile()) {
			window.location.href = option.fallbackHref || option.href;
		} else {
			window.open(option.href, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<div ref={fabRef} className="fixed bottom-6 right-6 z-50">
			<div className="flex flex-col items-end gap-3">
				{/* Additional Contact Options (when expanded) */}
				<div
					className={cn(
						"flex flex-col items-end gap-3 transition-all duration-300 ease-in-out",
						{
							"opacity-0 -translate-y-4 pointer-events-none": !isExpanded,
							"opacity-100 translate-y-0": isExpanded,
						}
					)}
				>
					{additionalContactOptions.map((option, index) => (
						<button
							key={`additional-contact-${index}`}
							onClick={() => handleContactClick(option)}
							className={cn(
								"flex items-center gap-2 rounded-full px-4 py-3 text-white cursor-pointer border-none",
								option.color,
								"hover:scale-105 active:scale-95 transition-transform duration-200",
								"transform-gpu transition-all duration-300 ease-in-out shadow-lg",
								{
									"opacity-0 translate-y-2": !isExpanded,
									"opacity-100 translate-y-0": isExpanded,
								}
							)}
							style={{
								boxShadow: `0 4px 15px rgba(${option.glowColor}, 0.4)`,
								transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
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

				{/* Main Contact Options (Always Visible) */}
				<div className="flex flex-col items-end gap-3">
					{mainContactOptions.map((option, index) => (
						<button
							key={`main-contact-${index}`}
							onClick={() => handleContactClick(option)}
							className={cn(
								"flex items-center gap-3 rounded-full px-5 py-4 text-white cursor-pointer border-none",
								option.color,
								"hover:scale-105 active:scale-95 transition-all duration-200",
								"shadow-lg hover:shadow-xl"
							)}
							style={{
								boxShadow: `0 4px 20px rgba(${option.glowColor}, 0.5)`,
							}}
							aria-label={`Contact via ${option.label}`}
						>
							<span className="text-sm font-semibold mr-1 hidden md:inline-block whitespace-nowrap">
								{option.label}
							</span>
							<div className="[&>svg]:fill-white flex-shrink-0">
								{option.icon}
							</div>
						</button>
					))}
				</div>

				{/* Expand/Collapse FAB Button */}
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className={cn(
						"flex h-14 w-14 items-center justify-center rounded-full relative overflow-hidden",
						"bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-white",
						"shadow-[0_0_20px_rgba(59,130,246,0.7)]",
						"hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.9)]",
						"active:scale-95",
						"transition-all duration-300 ease-in-out"
					)}
					aria-label={isExpanded ? "Hide more options" : "Show more options"}
					type="button"
				>
					<div
						className={cn(
							"absolute transition-all duration-300 ease-in-out transform",
							{
								"opacity-0 -rotate-180 scale-50": isExpanded,
								"opacity-100 rotate-0 scale-100": !isExpanded,
							}
						)}
					>
						<Plus className="h-6 w-6" />
					</div>
					<div
						className={cn(
							"absolute transition-all duration-300 ease-in-out transform",
							{
								"opacity-100 rotate-0 scale-100": isExpanded,
								"opacity-0 rotate-180 scale-50": !isExpanded,
							}
						)}
					>
						<X className="h-6 w-6" />
					</div>
				</button>
			</div>
		</div>
	);
}
