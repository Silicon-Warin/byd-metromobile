"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { LineProfile } from "@/types/line";
import LineLoginButton from "./LineLoginButton";

interface LineLoginWidgetProps {
	onLoginSuccess?: (profile: LineProfile) => void;
	showTitle?: boolean;
	title?: string;
	className?: string;
	buttonText?: string;
}

export default function LineLoginWidget({
	onLoginSuccess,
	showTitle = true,
	title = "เชื่อมต่อบัญชี LINE เพื่อความสะดวกในการติดต่อ",
	className = "",
	buttonText,
}: LineLoginWidgetProps) {
	const [isLoggedInWithLine, setIsLoggedInWithLine] = useState(false);
	const [lineDisplayName, setLineDisplayName] = useState<string | null>(null);

	// ตรวจสอบสถานะการล็อกอินจาก cookie เมื่อโหลดคอมโพเนนต์
	useEffect(() => {
		const lineUserId = getCookie("line_user_id");
		const displayName = getCookie("line_display_name");

		if (lineUserId) {
			setIsLoggedInWithLine(true);
			if (displayName) {
				setLineDisplayName(displayName as string);
			}
		}
	}, []);

	// handler สำหรับการล็อกอินสำเร็จ
	const handleLoginSuccess = (profile: LineProfile) => {
		setIsLoggedInWithLine(true);
		setLineDisplayName(profile.displayName);

		if (onLoginSuccess) {
			onLoginSuccess(profile);
		}
	};

	return (
		<div className={`${className}`}>
			{isLoggedInWithLine ? (
				<div className="bg-[#06C755]/10 p-2 rounded-lg flex items-center gap-2">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="#06C755">
						<path d="M19.952 12.994c0-4.667-4.678-8.461-10.422-8.461-5.743 0-10.42 3.794-10.42 8.461 0 4.18 3.703 7.683 8.708 8.349.34.073.803.224.92.514.11.265.07.683.035.951 0 0-.123.741-.15.9-.45.213-.21.836.723.456.932-.38 5.034-2.964 6.866-5.075 1.267-1.39 1.88-2.8 1.88-4.234z" />
					</svg>
					<span className="text-xs">
						{lineDisplayName
							? `เข้าสู่ระบบแล้วในชื่อ ${lineDisplayName}`
							: "เชื่อมต่อกับ LINE แล้ว"}
					</span>
				</div>
			) : (
				<div className="bg-gray-100 p-4 rounded-lg">
					{showTitle && <p className="text-sm mb-2">{title}</p>}
					<LineLoginButton
						onLoginSuccess={handleLoginSuccess}
						buttonText={buttonText}
					/>
				</div>
			)}
		</div>
	);
}
