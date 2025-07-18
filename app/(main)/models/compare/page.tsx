"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CompareModels() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/maintenance");
	}, [router]);

	// Return null or loading state while redirecting

	return null;
}
