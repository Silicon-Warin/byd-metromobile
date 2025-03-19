import { cn } from "@/lib/utils";

export default function GridBackground() {
	return (
		<div className="relative flex h-[50rem] w-full items-center justify-center bg-background dark:bg-background">
			{/* Grid background using your theme colors */}
			<div
				className={cn(
					"absolute inset-0",
					"[background-size:40px_40px]",
					"[background-image:linear-gradient(to_right,oklch(0.922_0_0)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.922_0_0)_1px,transparent_1px)]",
					"dark:[background-image:linear-gradient(to_right,oklch(27.95%_0.0368_260.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(27.95%_0.0368_260.03)_1px,transparent_1px)]"
				)}
			/>
			{/* Radial gradient using your theme colors */}
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
			{/* Text with gradient matching your theme */}
			<p className="relative z-20 bg-gradient-to-b from-primary to-muted-foreground bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl font-thai">
				Backgrounds
			</p>
		</div>
	);
}
