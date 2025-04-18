"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft, X } from "lucide-react";
import { MenuBar } from "@/components/Header/menu-bar";

// Model sections for mobile navigation
const modelSections = [
	{ id: "overview", label: "ภาพรวม" },
	{ id: "showcase", label: "จุดเด่น" },
	{ id: "colors", label: "สีรถ" },
	{ id: "variants", label: "รุ่นย่อย" },
	{ id: "specs", label: "สเปค" },
];

export function ModelHeader() {
	const pathname = usePathname();
	const [scrollY, setScrollY] = useState(0);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const isScrolled = scrollY > 50;

	// Get model name from URL
	const modelName = pathname.split("/").pop()?.toUpperCase() || "";

	// Handle scroll events
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Scroll to section
	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
			setMobileMenuOpen(false);
		}
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
					{/* Logo and Back Button */}
					<div className="flex items-center space-x-4">
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
						<Link
							href="/models"
							className={`flex items-center text-sm font-medium ${
								isScrolled ? "text-gray-800" : "text-white"
							} hover:text-primary-dark transition-colors`}
						>
							<ChevronLeft className="h-4 w-4 mr-1" />
							กลับไปหน้ารุ่นรถทั้งหมด
						</Link>
					</div>

					{/* Model Name and Navigation */}
					<div className="flex items-center space-x-6">
						<span
							className={`font-bold text-lg ${
								isScrolled ? "text-gray-800" : "text-white"
							}`}
						>
							{modelName}
						</span>

						{/* Fancy Menu Bar */}
						<MenuBar onSectionClick={scrollToSection} />

						<Button
							variant="default"
							size="sm"
							className="bg-red-600 hover:bg-red-700 text-white ml-2"
						>
							สั่งจองรถยนต์
						</Button>
					</div>
				</div>

				{/* Mobile Header */}
				<div className="flex md:hidden items-center justify-between">
					{/* Logo */}
					<div className="flex items-center space-x-2">
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
						<span
							className={`font-bold text-sm ${
								isScrolled ? "text-gray-800" : "text-white"
							}`}
						>
							{modelName}
						</span>
					</div>

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
									<span className="font-bold">{modelName}</span>
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
									<Link
										href="/models"
										className="flex items-center text-gray-800 font-medium mb-6"
										onClick={() => setMobileMenuOpen(false)}
									>
										<ChevronLeft className="h-5 w-5 mr-1" />
										กลับไปหน้ารุ่นรถทั้งหมด
									</Link>

									<ul className="space-y-4">
										{modelSections.map((section) => (
											<li key={section.id}>
												<button
													onClick={() => scrollToSection(section.id)}
													className="block w-full text-left py-2 text-gray-800 font-medium"
												>
													{section.label}
												</button>
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
										สั่งจองรถยนต์
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
