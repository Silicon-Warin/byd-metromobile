"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
	}, [error]);

	return null;
}
