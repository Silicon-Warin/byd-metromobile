"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import React from "react";

interface BranchMapButtonProps {
	className?: string;
	variant?:
		| "default"
		| "outline"
		| "destructive"
		| "secondary"
		| "ghost"
		| "link";
	children?: React.ReactNode;
}

const BranchMapButton: React.FC<BranchMapButtonProps> = ({
	className = "",
	variant = "outline",
	children,
}) => {
	return (
		<Button asChild variant={variant} className={className}>
			<Link href="/contact-us">
				<MapPin className="mr-2 h-4 w-4" />
				{children || "ดูแผนที่สาขา"}
			</Link>
		</Button>
	);
};

export default BranchMapButton;
