"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Calendar } from "lucide-react";
import TestDriveForm from "@/components/Line/TestDriveForm";

interface TestDriveButtonProps extends ComponentPropsWithoutRef<typeof Button> {
	children?: ReactNode;
	size?: "default" | "sm" | "lg" | "icon";
	fullWidth?: boolean;
	defaultModel?: string;
	variant?: "default" | "outline";
}

export default function TestDriveButton({
	children,
	className,
	size = "default",
	fullWidth = false,
	defaultModel,
	variant = "default",
	...props
}: TestDriveButtonProps) {
	// Base styles for both variants
	const baseStyles = cn(
		"relative overflow-hidden group transition-all duration-300",
		"hover:shadow-lg hover:shadow-purple-500/25",
		"before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
		"before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
		fullWidth ? "w-full" : ""
	);

	// Variant-specific styles
	const variantStyles = {
		default:
			"bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40",
		outline:
			"!bg-transparent hover:!bg-white/5 !text-gray-700 !border !border-gray-300 hover:!border-blue-500 hover:!text-blue-600",
	};

	return (
		<TestDriveForm defaultModel={defaultModel}>
			<Button
				size={size}
				variant="ghost" // Use ghost variant to avoid default shadcn styling conflicts
				className={cn(
					baseStyles,
					variantStyles[variant],
					"px-8 py-6 text-lg", // Size styling
					className // This ensures any passed className will override these defaults
				)}
				{...props}
			>
				<Calendar className="mr-2 h-5 w-5" />
				{children || "จองทดลองขับ"}
			</Button>
		</TestDriveForm>
	);
}
