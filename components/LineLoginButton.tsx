"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { LineProfile } from "@/types/line";

declare global {
	interface Window {
		liff: any;
	}
}

interface LineLoginButtonProps {
	onLoginSuccess?: (profile: LineProfile) => void;
	className?: string;
	buttonText?: string;
}

export default function LineLoginButton({
	onLoginSuccess,
	className = "",
	buttonText = "เข้าสู่ระบบด้วย LINE",
}: LineLoginButtonProps) {
	const [isLineSDKLoaded, setIsLineSDKLoaded] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const loadLineSDK = async () => {
			try {
				const liffScript = document.createElement("script");
				liffScript.src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
				liffScript.async = true;
				liffScript.onload = () => initLIFF();
				document.body.appendChild(liffScript);
			} catch (error) {
				console.error("Line SDK load error:", error);
			}
		};

		const initLIFF = async () => {
			try {
				const liffID = process.env.NEXT_PUBLIC_LINE_LIFF_ID;
				if (!liffID) throw new Error("LIFF ID not found");

				await window.liff.init({ liffId: liffID });
				setIsLineSDKLoaded(true);
			} catch (error) {
				console.error("LIFF initialization failed:", error);
			}
		};

		loadLineSDK();
	}, []);

	const handleLineLogin = async () => {
		if (!isLineSDKLoaded) return;

		try {
			if (!window.liff.isLoggedIn()) {
				window.liff.login();
			} else {
				const profile = await window.liff.getProfile();
				const lineProfile: LineProfile = {
					userId: profile.userId,
					displayName: profile.displayName,
					pictureUrl: profile.pictureUrl,
					statusMessage: profile.statusMessage,
				};

				await saveUserToCookie(lineProfile);

				if (onLoginSuccess) {
					onLoginSuccess(lineProfile);
				}
			}
		} catch (error) {
			console.error("Line login error:", error);
		}
	};

	const saveUserToCookie = async (lineProfile: LineProfile) => {
		try {
			const response = await fetch("/api/line-login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ lineProfile }),
			});

			if (response.ok) {
				// เก็บข้อมูลใน client-side cookie เพื่อให้สามารถใช้งานได้ทันที
				setCookie("line_user_id", lineProfile.userId, {
					maxAge: 60 * 60 * 24 * 30,
				});
				setCookie("line_display_name", lineProfile.displayName, {
					maxAge: 60 * 60 * 24 * 30,
				});
				if (lineProfile.pictureUrl) {
					setCookie("line_picture_url", lineProfile.pictureUrl, {
						maxAge: 60 * 60 * 24 * 30,
					});
				}

				router.refresh();
				return true;
			}
			return false;
		} catch (error) {
			console.error("Save user to cookie error:", error);
			return false;
		}
	};

	return (
		<Button
			onClick={handleLineLogin}
			className={`bg-[#06C755] hover:bg-[#06C755]/90 text-white w-full ${className}`}
		>
			{buttonText}
		</Button>
	);
}
