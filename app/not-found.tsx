import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center text-foreground">
				<h1 className="text-3xl font-bold mb-4">
					ขออภัย ไม่พบหน้าหรือข้อมูลที่คุณร้องขอ
				</h1>
				<div className="flex gap-4 justify-center">
					<Link href="/">
						<Button
							variant="outline"
							className="border-bydblue text-bydblue hover:bg-bydblue hover:text-bydblue-foreground"
						>
							กลับสู่หน้าแรก
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
