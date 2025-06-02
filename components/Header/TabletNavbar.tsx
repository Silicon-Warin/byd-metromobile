// TabletNavbar.tsx - Tablet navigation component
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
import TestDriveButton from "@/components/TestDriveButton";

interface TabletNavbarProps {
	isScrolled: boolean;
	pathname: string;
}

export default function TabletNavbar({
	isScrolled,
	pathname,
}: TabletNavbarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

	// Toggle mobile dropdown
	const toggleMobileDropdown = (id: string) => {
		setExpandedMobileItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	return (
		<div className="flex justify-between items-center h-16 lg:h-18">
			{/* Logo */}
			<Link href="/" className="flex items-center">
				<div className="relative h-12 w-40 lg:h-14 lg:w-44">
					<Image
						src="/images/metromobile-logo.png"
						alt="Metromobile Logo"
						fill
						className="object-contain"
						sizes="(max-width: 1024px) 10rem, 11rem"
						priority
					/>
				</div>
			</Link>

			{/* Tablet Menu Button */}
			<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="lg" className="p-3">
						<Menu
							className={`h-7 w-7 ${
								isScrolled ? "text-gray-300" : "text-white"
							}`}
						/>
						<span className="sr-only">เปิดเมนู</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-[350px] p-0">
					<div className="flex flex-col h-full bg-white">
						{/* Menu Header */}
						<div className="flex items-center justify-between p-6 border-b">
							<SheetTitle className="sr-only">เมนูหลัก</SheetTitle>
							<Image
								src="/images/metromobile-logo.png"
								alt="BYD Metromobile"
								width={160}
								height={60}
								className="h-10 w-auto object-contain"
							/>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setMobileMenuOpen(false)}
							>
								<X className="h-6 w-6" />
								<span className="sr-only">ปิดเมนู</span>
							</Button>
						</div>
						{/* Navigation */}
						<nav className="flex-1 overflow-y-auto p-6">
							<ul className="space-y-4">
								{navItems.map((item) => (
									<li key={item.id}>
										{item.hasDropdown ? (
											<div>
												<button
													onClick={() => toggleMobileDropdown(item.id)}
													className="flex items-center justify-between w-full text-left py-3 text-gray-800 font-medium text-lg"
												>
													{item.label}
													<ChevronDown
														className={`h-5 w-5 transition-transform ${
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
																	className="block py-2 text-gray-600 hover:text-primary text-base"
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
												className={`block py-3 text-gray-800 font-medium text-lg ${
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
						{/* Menu Footer */}
						<div className="p-6 border-t">
							<TestDriveButton
								variant="default"
								className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3"
								fullWidth={true}
							>
								ทดลองขับ
							</TestDriveButton>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
