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
	return (
		<TestDriveForm defaultModel={defaultModel}>
			<Button
				size={size}
				variant="ghost"
				className={cn(
					// Base styles - simplified
					"group transition-all duration-200",
					"hover:scale-[1.02] hover:shadow-md",

					// Variant styles - much simpler
					variant === "default" && [
						"bg-transparent hover:bg-white/5",
						"text-white border border-white/20 hover:border-white/40",
					],
					variant === "outline" && [
						"bg-transparent hover:bg-white/5",
						"text-gray-700 border border-gray-300",
						"hover:border-blue-500 hover:text-blue-600",
					],

					// Size handling
					size === "lg" && "px-8 py-6 text-lg",

					// Full width
					fullWidth && "w-full",

					// Custom className override
					className
				)}
				{...props}
			>
				<Calendar className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
				{children || "จองทดลองขับ"}
			</Button>
		</TestDriveForm>
	);
}
