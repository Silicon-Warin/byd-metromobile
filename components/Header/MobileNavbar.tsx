// MobileNavbar.tsx - Mobile navigation component
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ChevronDown, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { navCarModels } from "@/data/navCarModels";
import TestDriveButton from "../TestDriveButton";

interface MobileNavbarProps {
	isScrolled: boolean;
	pathname: string;
}

export default function MobileNavbar({
	isScrolled,
	pathname,
}: MobileNavbarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

	// Toggle mobile dropdown
	const toggleMobileDropdown = (id: string) => {
		setExpandedMobileItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	return (
		<div className="flex justify-between items-center p-4">
			{/* Logo */}
			<Link href="/" className="flex items-center">
				<div className="relative h-8 w-32 sm:h-10 sm:w-36">
					<Image
						src="/images/metromobile-logo.png"
						alt="Metromobile Logo"
						fill
						className="object-contain"
						sizes="(max-width: 640px) 8rem, 9rem"
						priority
					/>
				</div>
			</Link>

			{/* Mobile Menu Button */}
			<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="lg" className="p-2 sm:p-3">
						<Menu
							className={`h-6 w-6 sm:h-7 sm:w-7 ${
								isScrolled ? "text-gray-300" : "text-white"
							}`}
						/>
						<span className="sr-only">เปิดเมนู</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
					<div className="flex flex-col h-full bg-white">
						{/* Mobile Menu Header */}
						<div className="flex items-center justify-between p-4 border-b">
							<SheetTitle className="sr-only">เมนูหลัก</SheetTitle>
							<Image
								src="/images/metromobile-logo.png"
								alt="BYD Metromobile"
								width={120}
								height={40}
								className="h-8 w-auto object-contain"
							/>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setMobileMenuOpen(false)}
							>
								<X className="h-5 w-5" />
								<span className="sr-only">ปิดเมนู</span>
							</Button>
						</div>
						{/* Mobile Navigation */}
						<nav className="flex-1 overflow-y-auto p-4">
							<ul className="space-y-3">
								{navItems.map((item) => (
									<li key={item.id}>
										{item.hasDropdown ? (
											<div>
												<button
													onClick={() => toggleMobileDropdown(item.id)}
													className="flex items-center justify-between w-full text-left py-2 text-gray-800 font-medium"
												>
													{item.label}
													<ChevronDown
														className={`h-4 w-4 transition-transform ${
															expandedMobileItems.includes(item.id)
																? "rotate-180"
																: ""
														}`}
													/>
												</button>
												{expandedMobileItems.includes(item.id) && (
													<ul className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
														{navCarModels.map((model) => (
															<li key={model.href}>
																<Link
																	href={model.href}
																	className="block py-2 text-gray-600 hover:text-primary text-sm"
																	onClick={() => setMobileMenuOpen(false)}
																>
																	{model.name}
																</Link>
															</li>
														))}
													</ul>
												)}
											</div>
										) : (
											<Link
												href={item.href}
												className={`block py-2 text-gray-800 font-medium ${
													pathname === item.href ? "text-primary" : ""
												}`}
												onClick={() => setMobileMenuOpen(false)}
											>
												{item.label}
											</Link>
										)}
									</li>
								))}
							</ul>
						</nav>
						{/* Mobile Menu Footer */}
						<div className="p-4 border-t">
							<TestDriveButton />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
