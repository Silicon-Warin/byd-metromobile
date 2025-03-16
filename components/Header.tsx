"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetClose,
} from "@/components/ui/sheet";
import { IconMenuDeep } from "@tabler/icons-react";
import { navItems } from "@/components/Header/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SocialIcons } from "@/components/Header/SocialIcons";

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

export function Header() {
	const [scrollY, setScrollY] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const href = e.currentTarget.getAttribute("href");
		const target = href?.startsWith("#") ? document.querySelector(href) : null;

		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			setIsOpen(false); // Close sheet after clicking
		} else {
			// Handle regular navigation
			if (href) window.location.href = href;
			setIsOpen(false);
		}
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrollY > 50
					? "bg-primary/50 backdrop-blur-md shadow-md"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				{/* Logo with proper responsive sizing */}
				<div className="w-32 md:w-40 h-auto relative">
					<Link href="/">
						<Image
							src="/images/BYD_Logo.png"
							alt="BYD Logo"
							width={150}
							height={32}
							className="object-contain"
							priority
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-6">
					{navItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className="text-white hover:text-blue-200 font-medium transition-colors"
						>
							{item.label}
						</Link>
					))}
				</div>

				{/* Mobile menu */}
				<div className="md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger
							aria-label="Open Navigation Menu"
							className="flex justify-center items-center touch-manipulation active:scale-95 transition-transform"
						>
							<IconMenuDeep className="text-[32px] text-white" />
						</SheetTrigger>
						<SheetContent
							className="flex flex-col bg-primary backdrop-blur-sm overflow-y-auto w-[85vw] max-w-md sm:max-w-md"
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
										className="flex flex-col h-full"
									>
										{/* Logo */}
										<div className="mt-12 mb-16 text-center">
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
															src="/images/BYD_Logo.png"
															alt="BYD Metromobile"
															width={200}
															height={50}
															className="h-auto w-auto mx-auto"
														/>
													</motion.div>
												</Link>
											</SheetClose>
										</div>

										{/* Nav Links */}
										<nav className="flex flex-col justify-center items-center gap-6 mb-8 flex-grow">
											{navItems.map((item, index) => (
												<motion.a
													key={index}
													href={item.href}
													onClick={handleNavClick}
													variants={navItemVariants}
													className="text-white text-xl uppercase 
                              touch-manipulation active:scale-95 
                              transition-transform hover:text-blue-200"
												>
													{item.label}
												</motion.a>
											))}

											<motion.div
												variants={navItemVariants}
												className="w-full px-8 mt-4"
											>
												<Button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
													รับใบเสนอราคา
												</Button>
											</motion.div>
										</nav>

										{/* Social Icons */}
										<motion.div
											className="flex justify-center items-center gap-6 mb-8"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: 0.4 }}
										>
											<SocialIcons />
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}
