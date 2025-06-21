"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Car,
	Calendar,
	MapPin,
	Phone,
	User,
	Mail,
	Clock,
	Loader2,
} from "lucide-react";
import { toast } from "sonner";
import TestDriveButton from "../TestDriveButton";
import { submitTestDrive } from "@/actions/test-drive";

interface TestDriveFormProps {
	children?: React.ReactNode;
	defaultModel?: string;
}

const carModels = [
	"BYD ATTO 3",
	"BYD DOLPHIN",
	"BYD SEAL",
	"BYD SEALION 7",
	"BYD SEALION 6 DM-i",
	"BYD M6",
];

const timeSlots = [
	"09:00-10:00",
	"10:00-11:00",
	"11:00-12:00",
	"13:00-14:00",
	"14:00-15:00",
	"15:00-16:00",
	"16:00-17:00",
];

const locations = [
	"ตลิ่งชัน",
	"พระราม 3",
	"อ่อนนุช",
	"รามอินทรา",
	"RCA-พระราม 9",
	"อื่นๆ (ระบุในหมายเหตุ)",
];

export default function TestDriveForm({
	children,
	defaultModel,
}: TestDriveFormProps) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(submitTestDrive, null);

	// Handle form submission result
	useEffect(() => {
		if (state) {
			if (state.success) {
				toast.success("ส่งคำขอสำเร็จ!", {
					description: state.message,
					duration: 4000,
				});
				setOpen(false);
			} else {
				toast.error("เกิดข้อผิดพลาด", {
					description: state.message,
					duration: 4000,
				});
			}
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children || (
					<TestDriveButton
						size="lg"
						className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-6 text-lg"
					>
						<span className="flex items-center">จองทดลองขับ</span>
					</TestDriveButton>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Car className="h-5 w-5 text-primary" />
						จองทดลองขับรถไฟฟ้า BYD
					</DialogTitle>
					<DialogDescription>
						กรอกข้อมูลเพื่อจองทดลองขับ ทีมงานจะติดต่อกลับเพื่อยืนยันการนัดหมาย
					</DialogDescription>
				</DialogHeader>

				<form action={formAction} className="space-y-4">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name" className="flex items-center gap-2">
								<User className="h-4 w-4" />
								ชื่อ-นามสกุล *
							</Label>
							<Input
								id="name"
								name="name"
								placeholder="กรอกชื่อ-นามสกุล"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone" className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								เบอร์โทรศัพท์ *
							</Label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								placeholder="กรอกเบอร์โทรศัพท์"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email" className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								อีเมล (ไม่บังคับ)
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="กรอกอีเมล"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="model" className="flex items-center gap-2">
								<Car className="h-4 w-4" />
								รุ่นรถที่สนใจ *
							</Label>
							<Select name="model" defaultValue={defaultModel} required>
								<SelectTrigger>
									<SelectValue placeholder="เลือกรุ่นรถ" />
								</SelectTrigger>
								<SelectContent>
									{carModels.map((model) => (
										<SelectItem key={model} value={model}>
											{model}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="preferredDate"
								className="flex items-center gap-2"
							>
								<Calendar className="h-4 w-4" />
								วันที่ต้องการ *
							</Label>
							<Input
								id="preferredDate"
								name="preferredDate"
								type="date"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="preferredTime"
								className="flex items-center gap-2"
							>
								<Clock className="h-4 w-4" />
								เวลาที่ต้องการ
							</Label>
							<Select name="preferredTime">
								<SelectTrigger>
									<SelectValue placeholder="เลือกเวลา" />
								</SelectTrigger>
								<SelectContent>
									{timeSlots.map((time) => (
										<SelectItem key={time} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="location" className="flex items-center gap-2">
								<MapPin className="h-4 w-4" />
								สถานที่
							</Label>
							<Select name="location">
								<SelectTrigger>
									<SelectValue placeholder="เลือกสาขา" />
								</SelectTrigger>
								<SelectContent>
									{locations.map((location) => (
										<SelectItem key={location} value={location}>
											{location}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="notes">หมายเหตุ</Label>
							<Textarea
								id="notes"
								name="notes"
								placeholder="ข้อมูลเพิ่มเติม (ถ้ามี)"
								rows={3}
							/>
						</div>
					</div>

					<Button
						variant="outline"
						type="submit"
						disabled={isPending}
						className="w-full bg-bydblue hover:bg-bydblue/80 text-white"
					>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								กำลังส่งข้อมูล...
							</>
						) : (
							"ส่งคำขอจองทดลองขับ"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
