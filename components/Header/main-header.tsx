"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { navCarModels } from "@/data/navCarModels";

export function MainHeader() {
	const pathname = usePathname();
	const [scrollY, setScrollY] = useState(0);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

	const isScrolled = scrollY > 50;

	// ไม่แสดง MainHeader ในหน้า models/[slug]
	if (pathname.match(/^\/models\/[^\/]+$/)) {
		return null;
	}

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

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-primary/90 backdrop-blur-lg shadow-lg"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-3">
				{/* Desktop Header */}
				<div className="hidden md:flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="block">
						<Image
							src="/images/metromobile-logo.png"
							alt="BYD Metromobile"
							width={180}
							height={60}
							className="h-12 w-auto object-contain"
							priority
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="flex items-center space-x-6">
						{navItems.map((item) => (
							<div key={item.id} className="relative group">
								{item.hasDropdown ? (
									<>
										<button
											onClick={() => toggleDesktopDropdown(item.id)}
											className={`flex items-center text-sm font-medium px-1 py-2 ${
												isScrolled ? "text-gray-800" : "text-white"
											} hover:text-primary-dark transition-colors`}
										>
											{item.label}
											<ChevronDown
												className={`ml-1 h-4 w-4 transition-transform ${
													activeDropdown === item.id ? "rotate-180" : ""
												}`}
											/>
										</button>

										{/* Desktop Dropdown */}
										{activeDropdown === item.id && (
											<div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
												<div className="py-2">
													{navCarModels.map((model) => (
														<Link
															key={model.href}
															href={model.href}
															className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
															onClick={() => setActiveDropdown(null)}
														>
															{model.name}
														</Link>
													))}
												</div>
											</div>
										)}
									</>
								) : (
									<Link
										href={item.href}
										className={`block text-sm font-medium px-1 py-2 ${
											isScrolled ? "text-gray-800" : "text-white"
										} hover:text-primary-dark transition-colors ${
											pathname === item.href ? "font-bold" : ""
										}`}
									>
										{item.label}
									</Link>
								)}
								<span
									className={`absolute bottom-0 left-0 h-0.5 bg-primary-dark transition-all duration-300 ${
										pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
									}`}
								></span>
							</div>
						))}

						<Button
							variant="default"
							size="sm"
							className="bg-red-600 hover:bg-red-700 text-white ml-2"
						>
							ทดลองขับ
						</Button>
					</nav>
				</div>

				{/* Mobile Header */}
				<div className="flex md:hidden items-center justify-between">
					{/* Logo */}
					<Link href="/" className="block">
						<Image
							src="/images/metromobile-logo.png"
							alt="BYD Metromobile"
							width={140}
							height={50}
							className="h-10 w-auto object-contain"
							priority
						/>
					</Link>

					{/* Mobile Menu Button */}
					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu
									className={`h-6 w-6 ${
										isScrolled ? "text-gray-800" : "text-white"
									}`}
								/>
								<span className="sr-only">เปิดเมนู</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
							<div className="flex flex-col h-full bg-white">
								{/* Mobile Menu Header */}
								<div className="flex items-center justify-between p-4 border-b">
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
									<Button
										variant="default"
										className="w-full bg-red-600 hover:bg-red-700 text-white"
									>
										ทดลองขับ
									</Button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
