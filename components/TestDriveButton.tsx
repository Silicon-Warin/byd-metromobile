"use client";

import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import TestDriveForm from "@/components/Line/TestDriveForm";

interface TestDriveButtonProps {
	variant?:
		| "default"
		| "outline"
		| "destructive"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
	children?: React.ReactNode;
	fullWidth?: boolean;
	defaultModel?: string;
}

export default function TestDriveButton({
	variant = "default",
	size = "default",
	className = "",
	children,
	fullWidth = false,
	defaultModel,
}: TestDriveButtonProps) {
	return (
		<TestDriveForm defaultModel={defaultModel}>
			<Button
				variant={variant}
				size={size}
				className={`${fullWidth ? "w-full" : ""} ${className}`}
			>
				{children || (
					<>
						<Car className="mr-2 h-4 w-4" />
						ทดลองขับ
					</>
				)}
			</Button>
		</TestDriveForm>
	);
}
