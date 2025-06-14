import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

interface PromotionButtonProps extends ComponentPropsWithoutRef<typeof Button> {
	fullWidth?: boolean;
	children?: React.ReactNode;
}

export default function PromotionButton({
	fullWidth = false,
	className = "",
	children,
	...props
}: PromotionButtonProps) {
	return (
		<Link href="/promotions" className={fullWidth ? "w-full" : ""}>
			<Button
				className={`${fullWidth ? "w-full" : ""} ${className}`}
				{...props}
			>
				{children || (
					<>
						<Gift className="mr-2 h-5 w-5" />
						โปรโมชั่น
					</>
				)}
			</Button>
		</Link>
	);
}
