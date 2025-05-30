"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ChevronDown, X, Zap } from "lucide-react"; // Added Zap
import { navItems } from "@/data/navigation";
import { navCarModels } from "@/data/navCarModels";
import TestDriveButton from "@/components/TestDriveButton";

export function MainHeader() {
	const pathname = usePathname();
	const [scrollY, setScrollY] = useState(0);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

	const isScrolled = scrollY > 50;
	// Check if the current page is a model detail page
	const isModelDetailPage = pathname.startsWith("/model/");
	// Handle scroll events
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Toggle mobile dropdown
	const toggleMobileDropdown = (id: string) => {
		setExpandedMobileItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	// Toggle desktop dropdown
	const toggleDesktopDropdown = (id: string) => {
		setActiveDropdown(activeDropdown === id ? null : id);
	};

	// ย้าย if statement มาอยู่ตรงนี้แทน
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
				{/* Desktop Header */}
				<div className="hidden md:flex justify-between items-center h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center group">
						<div className="relative h-12 w-40 md:h-16 md:w-52">
							<Image
								src="/images/metromobile-logo.png"
								alt="Metromobile Logo"
								fill
								className="object-contain"
								sizes="(max-width: 768px) 10rem, 13rem"
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
											onClick={() => toggleDesktopDropdown(item.id)} // Corrected: removed 'e'
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
										} ${
											pathname === item.href ? "text-cyan-400 bg-white/10" : ""
										}`}
									>
										{item.label}
									</a>
								)}
							</div>
						))}

						<Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105">
							Get Started
						</Button>
					</nav>
				</div>

				{/* Mobile Header */}
				<div className="lg:hidden flex justify-between p-8 items-center mx-auto bg-dark-blue z-20 relative">
					{/* Logo */}
					<Link
						href="/"
						className="flex flex-col items-start self-center cursor-pointer w-6/12"
					>
						<Image
							src="/images/metromobile-logo.png"
							alt="BYD Metromobile"
							width={250}
							height={170}
							priority
						/>
					</Link>

					{/* Mobile Menu Button */}
					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="lg"
								className="lg:hidden w-12 sm:w-16 p-2 sm:p-3"
							>
								<Menu
									className={`h-8 w-8 ${
										isScrolled ? "text-gray-800" : "text-white"
									}`}
								/>
								<span className="sr-only">เปิดเมนู</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[450px] p-0">
							<div className="flex flex-col h-full bg-white">
								{/* Mobile Menu Header */}
								<div className="flex items-center justify-between p-4 border-b">
									<SheetTitle className="sr-only">เมนูหลัก</SheetTitle>
									<Image
										src="/images/metromobile-logo.png"
										alt="BYD Metromobile"
										width={140}
										height={50}
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
									<ul className="space-y-4">
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
																			className="block py-2 text-gray-600 hover:text-primary"
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
									<TestDriveButton
										variant="default"
										className="w-full bg-red-600 hover:bg-red-700 text-white"
										fullWidth={true}
									>
										ทดลองขับ
									</TestDriveButton>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
