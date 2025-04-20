"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, X } from "tabler-icons-react";
import { SocialIcon } from "@/app/utils/SocialIcon";

export default function ContactFAB() {
	const [isOpen, setIsOpen] = useState(false);
	const fabRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (fabRef.current && !fabRef.current.contains(event.target) && isOpen) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const contactOptions = [
		{
			icon: <SocialIcon type="line" size={20} />,
			label: "Line",
			href: "https://line.me/R/ti/p/%40bydmetromobile",
			color: "bg-green-500",
		},
		{
			icon: <SocialIcon type="facebook" size={20} />,
			label: "Facebook",
			href: "https://facebook.com/bydbangkok",
			color: "bg-blue-600",
		},
		{
			icon: <SocialIcon type="instagram" size={20} />,
			label: "Instagram",
			href: "https://instagram.com/byd.metromobile",
			color: "bg-pink-500",
		},
		{
			icon: <SocialIcon type="tiktok" size={20} />,
			label: "TikTok",
			href: "https://www.tiktok.com/@byd_metromobile",
			color: "bg-black",
		},
	];

	return (
		<div
			ref={fabRef}
			className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3"
		>
			<div
				className={cn(
					"flex flex-col gap-3 items-end transition-all duration-500",
					isOpen ? "opacity-100 visible" : "opacity-0 invisible h-0"
				)}
			>
				{contactOptions.map((option, index) => (
					<a
						key={index}
						href={option.href}
						className={cn(
							"flex items-center gap-2 rounded-full p-3 text-white",
							option.color,
							"shadow-[0_0_15px_rgba(var(--neon-glow-color),0.7)]",
							"hover:shadow-[0_0_25px_rgba(var(--neon-glow-color),0.9)] hover:scale-110",
							"transition-all duration-300 contact-option",
							isOpen ? "animate-contact-in" : "animate-contact-out"
						)}
						style={{
							"--neon-glow-color":
								getComputedStyle(document.documentElement)
									.getPropertyValue(option.color.replace("bg-", "--"))
									.trim() || "255, 255, 255",
							animationDelay: `${index * 0.08}s`,
						}}
						aria-label={option.label}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="text-sm font-medium mr-1 hidden md:inline-block">
							{option.label}
						</span>
						<div className="[&>svg]:fill-white">{option.icon}</div>
					</a>
				))}
			</div>

			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white",
					"shadow-[0_0_20px_rgba(147,51,234,0.7)]",
					"hover:shadow-[0_0_25px_rgba(147,51,234,0.9)]",
					"active:scale-95 transition-all duration-300",
					isOpen ? "" : "animate-pulse-subtle"
				)}
				aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
			>
				<div
					className={cn(
						"transition-transform duration-500",
						isOpen ? "rotate-[360deg]" : ""
					)}
				>
					{isOpen ? (
						<X className="h-6 w-6" />
					) : (
						<MessageCircle className="h-6 w-6" />
					)}
				</div>
			</button>
		</div>
	);
}
