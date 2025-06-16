// DesktopNavbar.tsx - Desktop navigation component
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navItems } from "@/data/navigation";
import { navCarModels } from "@/data/navCarModels";
import TestDriveButton from "../TestDriveButton";

interface DesktopNavbarProps {
	isScrolled: boolean;
	pathname: string;
}

export default function DesktopNavbar({
	isScrolled,
	pathname,
}: DesktopNavbarProps) {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	// React 19 optimized outside click handler with useCallback for stability
	const setupOutsideClickHandler = useCallback(
		(element: HTMLElement | null) => {
			if (!element || !activeDropdown) return;

			const handleClickOutside = () => setActiveDropdown(null);
			document.addEventListener("click", handleClickOutside);

			// React 19 feature: return cleanup function
			return () => document.removeEventListener("click", handleClickOutside);
		},
		[activeDropdown]
	);
	// Setup outside click when dropdown is active
	useEffect(() => {
		if (activeDropdown) {
			const cleanup = setupOutsideClickHandler(document.body);
			return cleanup;
		}
	}, [activeDropdown, setupOutsideClickHandler]);

	// Toggle desktop dropdown
	const toggleDesktopDropdown = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		setActiveDropdown(activeDropdown === id ? null : id);
	};

	return (
		<div className="flex justify-between items-center h-20">
			{/* Logo */}
			<Link href="/" className="flex items-center group">
				<div className="relative h-16 w-52">
					<Image
						src="/images/metromobile-logo.png"
						alt="Metromobile Logo"
						fill
						className="object-contain"
						sizes="13rem"
						priority
					/>
				</div>
			</Link>

			{/* Desktop Navigation */}
			<nav className="flex items-center space-x-8">
				{navItems.map((item) => (
					<div key={item.id} className="relative group">
						{item.hasDropdown ? (
							<>
								<button
									onClick={(e) => toggleDesktopDropdown(item.id, e)}
									className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
										isScrolled
											? "text-gray-300 hover:text-white hover:bg-white/10"
											: "text-white/90 hover:text-white hover:bg-white/10"
									} ${
										activeDropdown === item.id
											? "text-cyan-400 bg-white/10"
											: ""
									}`}
								>
									<span>{item.label}</span>
									<ChevronDown
										className={`h-4 w-4 transition-transform duration-300 ${
											activeDropdown === item.id ? "rotate-180" : ""
										}`}
									/>
								</button>

								{/* Desktop Dropdown */}
								{activeDropdown === item.id && (
									<div className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
										<div className="py-2">
											{navCarModels.map((model) => (
												<a
													key={model.href}
													href={model.href}
													className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-200 border-l-2 border-transparent hover:border-cyan-400"
													onClick={() => setActiveDropdown(null)}
												>
													{model.name}
												</a>
											))}
										</div>
									</div>
								)}
							</>
						) : (
							<a
								href={item.href}
								className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
									isScrolled
										? "text-gray-300 hover:text-white hover:bg-white/10"
										: "text-white/90 hover:text-white hover:bg-white/10"
								} ${pathname === item.href ? "text-cyan-400 bg-white/10" : ""}`}
							>
								{item.label}
							</a>
						)}
					</div>
				))}

				<TestDriveButton
					size="lg"
					className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-6 text-lg"
				>
					<span className="flex items-center">จองทดลองขับ</span>
				</TestDriveButton>
			</nav>
		</div>
	);
}
