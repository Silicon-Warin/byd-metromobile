import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WrenchIcon } from "lucide-react";

export default function MaintenancePage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center px-4">
				<WrenchIcon className="mx-auto h-16 w-16 text-bydblue mb-6" />
				<h1 className="text-4xl font-bold mb-4">ระบบอยู่ระหว่างการปรับปรุง</h1>
				<p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
					ขออภัยในความไม่สะดวก เรากำลังปรับปรุงระบบเพื่อประสบการณ์ที่ดียิ่งขึ้น
				</p>
				<Link href="/">
					<Button className="bg-bydblue hover:bg-bydblue/80">
						กลับสู่หน้าหลัก
					</Button>
				</Link>
			</div>
		</div>
	);
}
