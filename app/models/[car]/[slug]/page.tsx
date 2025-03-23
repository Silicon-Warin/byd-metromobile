"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// หน้านี้จะทำหน้าที่เป็น redirect หรือแสดงเนื้อหาเฉพาะตารางผ่อนเท่านั้น
export default function CarDetailSlugPage() {
	const params = useParams();
	const router = useRouter();
	const { car, slug } = params as { car: string; slug: string };

	useEffect(() => {
		// นำทางไปยังหน้าหลักของรถรุ่นนั้นๆ
		router.replace(`/models/${car}`);
	}, [car, router]);

	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div className="text-center p-4">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
				<p>กำลังนำคุณไปยังหน้ารายละเอียดรถยนต์...</p>
			</div>
		</div>
	);
}
