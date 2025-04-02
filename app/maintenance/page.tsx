"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WrenchIcon } from "lucide-react";

export default function MaintenancePage() {
	const router = useRouter();
	const [countdown, setCountdown] = useState(10);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					router.push("/");
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [router]);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center px-4">
				<WrenchIcon className="mx-auto h-16 w-16 text-bydblue mb-6 animate-bounce" />
				<h1 className="text-4xl font-bold mb-4">ระบบอยู่ระหว่างการปรับปรุง</h1>
				<p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
					ขออภัยในความไม่สะดวก เรากำลังปรับปรุงระบบเพื่อประสบการณ์ที่ดียิ่งขึ้น
				</p>
				<p className="text-gray-400 mb-4">
					กำลังกลับสู่หน้าหลักในอีก {countdown} วินาที
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
