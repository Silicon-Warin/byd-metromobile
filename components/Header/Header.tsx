"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetClose,
} from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data/navigation";
import { navCarModels } from "@/data/navCarModels";
// Animation variants
const mobileNavVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
};

const navItemVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
		},
	},
};

const dropdownVariants = {
	hidden: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.2,
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			staggerChildren: 0.05,
		},
	},
};

const modelVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 25,
		},
	},
};

export default function Header() {
	const pathname = usePathname();
	const [scrollY, setScrollY] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// เช็คว่าอยู่ในหน้า models/[car] หรือไม่
	const isModelPage = pathname.startsWith("/models/");

	// เพิ่ม section navigation
	const modelSections = [
		{ id: "overview", label: "ภาพรวม" },
		{ id: "showcase", label: "จุดเด่น" },
		{ id: "colors", label: "สีรถ" },
		{ id: "variants", label: "รุ่นย่อย" },
		{ id: "specs", label: "สเปค" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setActiveDropdown(null);
			}
		};

		window.addEventListener("scroll", handleScroll);
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		item: (typeof navItems)[0]
	) => {
		if (item.hasDropdown) {
			e.preventDefault();
			setActiveDropdown(activeDropdown === item.id ? null : item.id);
		} else {
			setActiveDropdown(null);
			setIsOpen(false);
		}
	};

	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	const isScrolled = scrollY > 50;

	// ปรับ style ตาม condition
	const headerBg =
		isModelPage && isScrolled
			? "bg-primary/80 backdrop-blur-lg shadow-lg"
			: isScrolled
			? "bg-primary/80 backdrop-blur-lg shadow-lg"
			: "bg-transparent";

	const textColor =
		(isModelPage && isScrolled) || activeDropdown
			? "text-primary-dark"
			: isScrolled
			? "text-primary-dark"
			: "text-white";

	const hoverTextColor =
		(isModelPage && isScrolled) || activeDropdown
			? "hover:text-primary-dark/80"
			: isScrolled
			? "hover:text-primary-dark/80"
			: "hover:text-white/80";

	return (
		<nav
			className={`
				fixed top-0 left-0 right-0 z-50 transition-all duration-300 
				${headerBg}
			`}
		>
			<div className="container mx-auto px-4 py-5 flex items-center justify-between">
				{/* Logo */}
				<div className="w-24 md:w-auto h-auto relative">
					<Link href="/">
						<Image
							src="/images/metromobile-logo.png"
							alt="BYD Logo"
							width={240}
							height={90}
							className="object-contain"
							priority
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				{isModelPage ? (
					<div className="hidden lg:flex items-center space-x-8">
						{!isScrolled ? (
							// Global Navigation เมื่ออยู่บนสุด
							<>
								{navItems.map((item) => (
									<div
										key={item.id}
										className="relative"
										onMouseEnter={() => {
											setHoveredItem(item.id);
											if (item.hasDropdown) {
												setActiveDropdown(item.id);
											} else {
												setActiveDropdown(null);
											}
										}}
										onMouseLeave={() => setHoveredItem(null)}
									>
										<Link
											href={item.href}
											onClick={(e) => handleNavClick(e, item)}
											className={`text-sm font-medium transition-colors relative 
												${textColor} ${hoverTextColor}
												${pathname === item.href ? "font-bold" : ""}
												${activeDropdown === item.id ? "text-primary-dark" : ""}
											`}
										>
											{item.label}
											<span
												className={`absolute bottom-[-4px] left-0 h-[2px] bg-accent transition-all duration-300 
													${
														pathname === item.href ||
														activeDropdown === item.id ||
														hoveredItem === item.id
															? "w-full"
															: "w-0"
													}
												`}
											></span>
										</Link>
									</div>
								))}
							</>
						) : (
							// Model Navigation เมื่อ scroll
							<>
								{/* Model Name */}
								<div className="font-bold text-lg mr-8">
									{pathname.split("/").pop()?.toUpperCase() || ""}
								</div>

								{/* Section Navigation */}
								{modelSections.map((section) => (
									<button
										key={section.id}
										onClick={() => scrollToSection(section.id)}
										className={`text-sm font-medium transition-colors relative 
											${textColor} ${hoverTextColor}
										`}
									>
										{section.label}
									</button>
								))}

								{/* Order Button */}
								<Button
									variant="default"
									className="bg-red-600 hover:bg-red-700 text-white ml-4"
								>
									สั่งจองรถยนต์
								</Button>
							</>
						)}
					</div>
				) : (
					<div className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<div
								key={item.id}
								className="relative"
								onMouseEnter={() => {
									setHoveredItem(item.id);
									if (item.hasDropdown) {
										setActiveDropdown(item.id);
									} else {
										setActiveDropdown(null);
									}
								}}
								onMouseLeave={() => setHoveredItem(null)}
							>
								<Link
									href={item.href}
									onClick={(e) => handleNavClick(e, item)}
									className={`text-sm font-medium transition-colors relative 
										${textColor} ${hoverTextColor}
										${pathname === item.href ? "font-bold" : ""}
										${activeDropdown === item.id ? "text-primary-dark" : ""}
									`}
								>
									{item.label}
									<span
										className={`absolute bottom-[-4px] left-0 h-[2px] bg-accent transition-all duration-300 
											${
												pathname === item.href ||
												activeDropdown === item.id ||
												hoveredItem === item.id
													? "w-full"
													: "w-0"
											}
										`}
									></span>
								</Link>
							</div>
						))}
					</div>
				)}

				{/* <div className="hidden lg:block">
					<Button
						variant="outline"
						className={`border-2 ${
							isScrolled || activeDropdown
								? "text-primary-dark border-primary-dark hover:bg-primary-dark/10"
								: "text-white border-white hover:bg-white/10"
						}`}
					>
						MY ACCOUNT
					</Button>
				</div> */}

				{/* Mobile menu */}
				<div className="lg:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger
							aria-label="Open Navigation Menu"
							className="flex justify-center items-center p-2 rounded-full hover:bg-white/10"
						>
							<Menu
								className={`h-6 w-6 ${
									isScrolled ? "text-gray-800" : "text-white"
								}`}
							/>
						</SheetTrigger>
						<SheetContent
							className="flex flex-col bg-white overflow-y-auto w-[85vw] max-w-md"
							side="right"
						>
							<SheetTitle className="sr-only">Navigation Menu</SheetTitle>

							<AnimatePresence>
								{isOpen && (
									<motion.div
										initial="hidden"
										animate="visible"
										exit="hidden"
										variants={mobileNavVariants}
										className="flex flex-col h-full pt-8"
									>
										{/* Logo */}
										<div className="mb-8 text-center">
											<SheetClose asChild>
												<Link href="/">
													<motion.div
														initial={{ opacity: 0, scale: 0.9 }}
														animate={{ opacity: 1, scale: 1 }}
														transition={{
															duration: 0.3,
															type: "spring",
															stiffness: 300,
														}}
													>
														<Image
															src="/images/metromobile-logo.png"
															alt="BYD Logo"
															width={120}
															height={60}
															className="h-auto w-auto mx-auto"
														/>
													</motion.div>
												</Link>
											</SheetClose>
										</div>

										{/* Nav Links */}
										<nav className="flex flex-col space-y-6 px-6">
											{navItems.map((item) => (
												<motion.div key={item.id} variants={navItemVariants}>
													{item.hasDropdown ? (
														<div className="space-y-2">
															<button
																onClick={() =>
																	setActiveDropdown(
																		activeDropdown === item.id ? null : item.id
																	)
																}
																className={`text-gray-800 text-lg font-medium w-full text-left flex justify-between items-center
                                  ${
																		pathname.startsWith(item.href)
																			? "text-blue-600"
																			: ""
																	}
                                `}
															>
																{item.label}
																<ChevronDown
																	className={`h-4 w-4 transition-transform duration-200 
                                    ${
																			activeDropdown === item.id
																				? "rotate-180"
																				: ""
																		}
                                  `}
																/>
															</button>

															<AnimatePresence>
																{activeDropdown === item.id && (
																	<motion.div
																		initial={{ height: 0, opacity: 0 }}
																		animate={{ height: "auto", opacity: 1 }}
																		exit={{ height: 0, opacity: 0 }}
																		transition={{ duration: 0.3 }}
																		className="overflow-hidden pl-4"
																	>
																		<ul className="space-y-2 py-2">
																			{navCarModels.map((model) => (
																				<li key={model.href}>
																					<Link
																						href={model.href}
																						className={`block py-2 text-gray-600 hover:text-blue-600
                                              ${
																								pathname === model.href
																									? "text-blue-600 font-medium"
																									: ""
																							}
                                            `}
																						onClick={() => setIsOpen(false)}
																					>
																						{model.name}
																					</Link>
																				</li>
																			))}
																		</ul>
																	</motion.div>
																)}
															</AnimatePresence>
														</div>
													) : (
														<Link
															href={item.href}
															className={`text-gray-800 text-lg font-medium hover:text-blue-600 block
                                ${pathname === item.href ? "text-blue-600" : ""}
                              `}
															onClick={() => setIsOpen(false)}
														>
															{item.label}
														</Link>
													)}
												</motion.div>
											))}
										</nav>
									</motion.div>
								)}
							</AnimatePresence>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			{/* Models Dropdown */}
			<AnimatePresence>
				{activeDropdown === "models" && (
					<motion.div
						ref={dropdownRef}
						initial="hidden"
						animate="visible"
						exit="hidden"
						variants={dropdownVariants}
						className="absolute left-0 right-0 bg-gray-100 shadow-md z-50"
						onMouseLeave={() => setActiveDropdown(null)}
					>
						<div className="container mx-auto py-6">
							<div className="flex">
								<div className="w-32 flex items-center">
									<h3 className="text-xl font-bold text-gray-800 border-b-2 border-black pb-1">
										รุ่นรถ
									</h3>
								</div>
								<div className="flex-1">
									<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{navCarModels.map((model, index) => (
											<motion.div
												key={index}
												variants={modelVariants}
												className="flex flex-col items-center"
											>
												<h3 className="text-base font-medium text-gray-800 mb-2">
													{model.name}
												</h3>
												<div className="relative mb-2">
													<Image
														src={model.image || "/placeholder.svg"}
														alt={model.name}
														width={200}
														height={120}
														className="object-contain"
													/>
												</div>
												<Link
													href={model.href}
													className={`bg-gray-700 hover:bg-gray-800 text-white text-sm px-4 py-1 rounded-md transition-colors
                            ${
															pathname === model.href
																? "bg-blue-600 hover:bg-blue-700"
																: ""
														}
                          `}
													onClick={() => setActiveDropdown(null)}
												>
													ดูเพิ่มเติม
												</Link>
											</motion.div>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
