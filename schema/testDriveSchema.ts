import { z } from "zod";

export const testDriveSchema = z.object({
	name: z.string().min(1, "กรุณากรอกชื่อ"),
	phone: z.string().regex(/^0[0-9]{8,9}$/, "เบอร์โทรไม่ถูกต้อง"),
	email: z.string().email("อีเมลไม่ถูกต้อง").or(z.literal("")).optional(),
	model: z.string().min(1, "กรุณาเลือกรุ่นรถ"),
	preferredDate: z.string().min(1, "กรุณาเลือกวันที่"),
	preferredTime: z.string().optional(),
	location: z.string().optional(),
	notes: z.string().optional(),
});

export type TestDriveFormData = z.infer<typeof testDriveSchema>;
