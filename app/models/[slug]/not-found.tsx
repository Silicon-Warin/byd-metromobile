"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ModelNotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center text-foreground">
				<h1 className="text-3xl font-bold mb-4">ไม่พบข้อมูลรถยนต์</h1>
				<div className="flex gap-4 justify-center">
					<Button
						className="bg-bydblue hover:bg-bydblue/80"
						onClick={() => window.history.back()}
					>
						ย้อนกลับ
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
