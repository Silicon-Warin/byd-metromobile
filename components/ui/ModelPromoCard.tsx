import React, { useState, useEffect } from "react";
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
import { generateLineLoginUrl } from "@/lib/line";
import { useRouter, useSearchParams } from "next/navigation";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [lineProfile, setLineProfile] = useState<any>(null);
	const router = useRouter();
	const searchParams = useSearchParams();

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
	}, [searchParams, model.id]);

	// Handle LINE login callback
	const handleLineLoginCallback = async (code: string) => {
		try {
			setIsLoading(true);

			// Exchange code for token and get user profile
			const response = await fetch("/api/line/callback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code,
					redirectUri: `http://localhost:3000/promotions`,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to authenticate with LINE");
			}

			const data = await response.json();
			setLineProfile(data.profile);

			// Open inquiry form after successful login
			setOpen(true);

			// Send initial message to user
			await sendLineWelcomeMessage(data.profile.userId);
		} catch (error) {
			console.error("LINE Login Error:", error);
			toast.error("ไม่สามารถเข้าสู่ระบบด้วย LINE ได้ กรุณาลองใหม่อีกครั้ง");
		} finally {
			setIsLoading(false);

			// Clean URL parameters
			router.replace(window.location.pathname);
		}
	};

	// Send welcome message to user via LINE
	const sendLineWelcomeMessage = async (userId: string) => {
		try {
			const response = await fetch("/api/line/message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					modelName: model.name,
					modelId: model.id,
					price: model.price,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to send LINE message");
			}
		} catch (error) {
			console.error("LINE Message Error:", error);
		}
	};

	// Handle inquiry with LINE login
	const handleInquiryWithLine = () => {
		try {
			setIsLoading(true);

			// Generate state for security
			const state = Math.random().toString(36).substring(2, 15);

			// Generate LINE login URL - make sure this matches exactly what's registered in LINE Developer Console
			const redirectUri = `http://localhost:3000/promotions`;
			const loginUrl = new URL("https://access.line.me/oauth2/v2.1/authorize");
			loginUrl.searchParams.append("response_type", "code");
			loginUrl.searchParams.append(
				"client_id",
				process.env.NEXT_PUBLIC_LINE_CHANNEL_ID || "2007075802"
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
						<Button
							className="w-full transition-all duration-300 bg-white/90 hover:bg-white text-black"
							onClick={handleInquiryWithLine}
							disabled={isLoading}
						>
							{isLoading ? "กำลังดำเนินการ..." : "สนใจสั่งจอง"}
						</Button>
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
