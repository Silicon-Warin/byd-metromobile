import React, { useState, useEffect, useCallback } from "react";
import { CarModel } from "@/data/Model";
import { Button } from "./button";
import Image from "next/image";
import { toast } from "sonner";
import { InquiryForm } from "@/components/InquiryForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import LineLoginButton from "@/components/LineLoginButton";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import { NextResponse } from "next/server";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [lineProfile, setLineProfile] = useState<any>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoggedInWithLine, setIsLoggedInWithLine] = useState(false);

	// Handle LINE login callback
	const handleLineLoginCallback = useCallback(
		async (code: string) => {
			try {
				setIsLoading(true);

				// แลกเปลี่ยน code เป็น access token
				const tokenResponse = await axios.post(
					"https://api.line.me/oauth2/v2.1/token",
					null,
					{
						params: {
							grant_type: "authorization_code",
							code,
							redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/promotions`,
							client_id: process.env.LINE_LOGIN_CHANNEL_ID,
							client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
						},
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
					}
				);

				const accessToken = tokenResponse.data.access_token;

				// ดึงข้อมูลโปรไฟล์ผู้ใช้
				const profileResponse = await axios.get(
					"https://api.line.me/v2/profile",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				const lineProfile = profileResponse.data;

				// ตรวจสอบ lineProfile และดำเนินการต่อ
				if (!lineProfile || !lineProfile.userId) {
					throw new Error("ข้อมูลโปรไฟล์ LINE ไม่ถูกต้อง");
				}

				// สร้าง response object และเก็บข้อมูลใน cookies
				const response = NextResponse.json({ success: true });

				// เก็บข้อมูลเพิ่มเติมตามต้องการ
				if (lineProfile.displayName) {
					response.cookies.set("line_display_name", lineProfile.displayName, {
						maxAge: 60 * 60 * 24 * 30,
						path: "/",
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
					});
				}

				if (lineProfile.pictureUrl) {
					response.cookies.set("line_picture_url", lineProfile.pictureUrl, {
						maxAge: 60 * 60 * 24 * 30,
						path: "/",
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
					});
				}

				// ส่งข้อความต้อนรับด้วย API /api/send-line-message แทน /api/line/message
				const messageData = {
					modelName: model.name,
					modelId: model.id,
					price: model.price,
					customer: { name: getCookie("line_display_name") },
					interest: { comments: "สนใจรถรุ่นนี้ผ่านหน้าโปรโมชั่น" },
				};

				await fetch("/api/send-line-message", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(messageData),
				});

				// เปิดฟอร์มหลังจากล็อกอินสำเร็จ
				setOpen(true);
			} catch (error) {
				console.error("LINE Login Error:", error);
				toast.error("ไม่สามารถเข้าสู่ระบบด้วย LINE ได้ กรุณาลองใหม่อีกครั้ง");
			} finally {
				setIsLoading(false);
				router.replace(window.location.pathname);
			}
		},
		[model, router]
	);

	// Check for LINE login callback
	useEffect(() => {
		const code = searchParams.get("code");
		const state = searchParams.get("state");

		// Retrieve stored model ID
		const storedModelId = localStorage.getItem("selectedModelId");

		if (code && state && storedModelId) {
			// Clear stored model ID
			localStorage.removeItem("selectedModelId");

			// Only process if this component's model matches the stored ID
			if (storedModelId === model.id.toString()) {
				handleLineLoginCallback(code);
			}
		}
	}, [searchParams, model.id, handleLineLoginCallback]);

	// Handle inquiry with LINE login
	const handleInquiryWithLine = () => {
		try {
			setIsLoading(true);

			// Generate state for security
			const state = Math.random().toString(36).substring(2, 15);

			// Generate LINE login URL - make sure this matches exactly what's registered in LINE Developer Console
			const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/promotions`;
			const loginUrl = new URL("https://access.line.me/oauth2/v2.1/authorize");
			loginUrl.searchParams.append("response_type", "code");
			loginUrl.searchParams.append(
				"client_id",
				process.env.LINE_LOGIN_CHANNEL_ID || ""
			);
			loginUrl.searchParams.append("redirect_uri", redirectUri);
			loginUrl.searchParams.append("state", state);
			loginUrl.searchParams.append("scope", "profile openid email");

			// Store model ID in localStorage to retrieve after redirect
			localStorage.setItem("selectedModelId", model.id.toString());

			// Redirect to LINE login
			window.location.href = loginUrl.toString();
		} catch (error) {
			console.error("LINE Login Error:", error);
			toast.error("ไม่สามารถเข้าสู่ระบบด้วย LINE ได้ กรุณาลองใหม่อีกครั้ง");
			setIsLoading(false);
		}
	};

	// ตรวจสอบการล็อกอินเมื่อโหลด component
	useEffect(() => {
		const lineUserId = getCookie("line_user_id");
		if (lineUserId) {
			setIsLoggedInWithLine(true);

			// ถ้าหากมีการกลับมาหลังจากการล็อกอิน (มีการเก็บ modelId ไว้)
			const storedModelId = localStorage.getItem("selectedModelId");
			if (storedModelId === model.id.toString()) {
				// ลบ selectedModelId จาก localStorage
				localStorage.removeItem("selectedModelId");
				// เปิดหน้าฟอร์มทันที
				setOpen(true);
			}
		}
	}, [model.id]);

	// แก้ไขปุ่ม "สนใจสั่งจอง" ให้ตรวจสอบสถานะล็อกอินก่อน
	const handleOrderButtonClick = () => {
		if (isLoggedInWithLine) {
			// ถ้าล็อกอินแล้ว เปิดฟอร์มได้เลย
			setOpen(true);
		} else {
			// ถ้ายังไม่ได้ล็อกอิน ให้ไปล็อกอินก่อน
			handleInquiryWithLine();
		}
	};

	return (
		<>
			<div className="relative group h-full flex flex-col w-full rounded-lg overflow-hidden shadow-lg">
				<div className="relative flex-grow w-full h-full transition duration-300 bg-gradient-to-b from-gray-800 to-gray-900">
					<Image
						src={model.imageUrlPromo}
						alt={model.name}
						width={model.imageWidth}
						height={model.imageHeight}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>

					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

					{/* Model Info Container */}
					<div className="absolute top-0 left-0 right-0 p-4 z-10">
						<h3 className="text-xl md:text-2xl font-bold text-white">
							{model.name}
						</h3>
						<p className="text-sm text-gray-200 mt-1">
							ราคาเริ่มต้น {model.price.toLocaleString()} บาท
						</p>
					</div>

					{/* Bottom Section: Order Now Button */}
					<div className="absolute bottom-0 left-0 right-0 p-4 z-10">
						<Button onClick={handleOrderButtonClick}>สนใจสั่งจอง</Button>
					</div>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>สนใจสั่งจอง {model.name}</DialogTitle>
					</DialogHeader>
					<InquiryForm model={model} lineProfile={lineProfile} />
				</DialogContent>
			</Dialog>
		</>
	);
}
