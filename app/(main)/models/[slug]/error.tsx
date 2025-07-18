"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ModelError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center text-foreground">
				<h1 className="text-3xl font-bold mb-4">
					เกิดข้อผิดพลาดในการโหลดข้อมูล
				</h1>
				<p className="mb-6 text-muted-foreground">
					กรุณาลองใหม่อีกครั้ง หรือกลับไปยังหน้ารถยนต์ทั้งหมด
				</p>
				<div className="flex gap-4 justify-center">
					<Button
						className="bg-bydblue hover:bg-bydblue/80"
						onClick={() => reset()}
					>
						ลองใหม่
					</Button>
					<Link href="/models">
						<Button
							variant="outline"
							className="border-bydblue text-bydblue hover:bg-bydblue hover:text-bydblue-foreground"
						>
							ดูรถยนต์ทั้งหมด
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
