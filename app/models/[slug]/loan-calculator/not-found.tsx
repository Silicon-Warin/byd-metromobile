"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function LoanCalculatorNotFound() {
	const params = useParams();
	const slug = params?.slug as string;

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center text-foreground">
				<h1 className="text-3xl font-bold mb-4">ไม่พบข้อมูลตารางผ่อน</h1>
				<div className="flex gap-4 justify-center">
					<Button
						className="bg-bydblue hover:bg-bydblue/80"
						onClick={() => window.history.back()}
					>
						ย้อนกลับ
					</Button>
					<Link href={`/models/${slug}`}>
						<Button
							variant="outline"
							className="border-bydblue text-bydblue hover:bg-bydblue hover:text-bydblue-foreground"
						>
							กลับไปยังหน้ารถยนต์
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
