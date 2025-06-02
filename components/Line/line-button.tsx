"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function LineOALinkButton({
	href = "https://line.me/R/ti/p/%40bydmetromobile",
	children = "ติดต่อผ่าน LINE OA",
	className = "",
}: {
	href?: string;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<Link href={href} passHref legacyBehavior>
			<Button asChild className={className}>
				<a target="_blank" rel="noopener noreferrer">
					<MessageCircle className="mr-2 h-5 w-5" />
					{children}
				</a>
			</Button>
		</Link>
	);
}
