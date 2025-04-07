// components/ModernPromo.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernPromoProps {
	href: string;
	text: string;
	icon?: "arrow" | "lightning";
	className?: string;
	external?: boolean;
	darkMode?: boolean;
}

export const ModernPromo = ({
	href,
	text,
	icon = "arrow",
	className = "",
	external = false,
	darkMode = true,
}: ModernPromoProps) => {
	// Icon selection
	const IconComponent = () => {
		switch (icon) {
			case "lightning":
				return <span className="text-amber-400 mr-2 text-lg">⚡</span>;
			case "arrow":
			default:
				return <span className="ml-2">↗</span>;
		}
	};

	return (
		<Link
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className="block w-full"
		>
			<motion.div
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className={cn("flex justify-center items-center", className)}
			>
				<div
					className={cn(
						"flex items-center justify-between px-6 py-4 rounded-md border transition-all",
						darkMode
							? "bg-zinc-900/30 border-zinc-700/50 text-white hover:bg-zinc-800/40"
							: "bg-white/10 border-gray-200/20 text-gray-800 hover:bg-white/20"
					)}
				>
					<div className="flex items-center">
						{icon === "lightning" && <IconComponent />}
						<span className="text-lg font-medium">{text}</span>
					</div>
					{icon === "arrow" && <IconComponent />}
				</div>
			</motion.div>
		</Link>
	);
};

// Example usage:
//
// import { ModernPromo } from "@/components/ModernPromo";
//
// export default function Example() {
//   return (
//     <div className="bg-black p-6">
//       <ModernPromo
//         href="https://example.com"
//         text="Claude 3.7 Sonnet is available now!"
//         icon="lightning"
//         external={true}
//       />
//     </div>
//   );
// }
