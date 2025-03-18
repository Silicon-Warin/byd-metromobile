"use client";
import type React from "react";
import { useState, useEffect } from "react";
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
					? "bg-primary/80 backdrop-blur-lg shadow-lg"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-6 py-5 flex items-center justify-between">
				{/* Logo with enhanced responsive sizing */}
				<div className="w-40 md:w-48 lg:w-56 h-auto relative">
					<Link href="/">
						<Image
							src="/images/metromobile-logo.png"
							alt="BYD Logo"
							width={400}
							height={85}
							className="object-contain"
							priority
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-8">
					{navItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className="text-white text-base font-medium hover:text-blue-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
						>
							{item.label}
						</Link>
					))}
					<Button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition-all duration-300 hover:shadow-lg">
						รับใบเสนอราคา
					</Button>
				</div>

				{/* Mobile menu */}
				<div className="md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger
							aria-label="Open Navigation Menu"
							className="flex justify-center items-center touch-manipulation active:scale-95 transition-transform p-2 rounded-full hover:bg-primary/30"
						>
							<IconMenuDeep className="text-[28px] text-white" />
						</SheetTrigger>
						<SheetContent
							className="flex flex-col bg-gradient-to-b from-primary to-primary/90 backdrop-blur-lg overflow-y-auto w-[85vw] max-w-md sm:max-w-md border-l border-white/10"
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
										<div className="mt-10 mb-12 text-center">
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
															width={240}
															height={60}
															className="h-auto w-auto mx-auto"
														/>
													</motion.div>
												</Link>
											</SheetClose>
										</div>

										{/* Nav Links */}
										<nav className="flex flex-col justify-center items-center gap-7 mb-8 flex-grow">
											{navItems.map((item, index) => (
												<motion.a
													key={index}
													href={item.href}
													onClick={handleNavClick}
													variants={navItemVariants}
													className="text-white text-xl font-medium 
        touch-manipulation active:scale-95 
        transition-all duration-300 hover:text-blue-200 
        relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
												>
													{item.label}
												</motion.a>
											))}

											<motion.div
												variants={navItemVariants}
												className="w-full px-8 mt-6"
											>
												<Button className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium shadow-md hover:shadow-lg">
													รับใบเสนอราคา
												</Button>
											</motion.div>
										</nav>

										{/* Social Icons */}
										<motion.div
											className="flex justify-center items-center gap-8 mb-10"
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
