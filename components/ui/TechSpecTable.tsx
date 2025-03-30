"use client";
import { TechSpec } from "@/data/carModel";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TechSpecTableProps {
	techSpec?: TechSpec;
	variantName?: string;
	variantsList?: { id: string; name: string; techSpec?: TechSpec }[];
	onVariantChange?: (variantId: string) => void;
	selectedVariantId?: string;
}

export const TechSpecTable: React.FC<TechSpecTableProps> = ({
	techSpec,
	variantName,
	variantsList,
	onVariantChange,
	selectedVariantId,
}) => {
	// ถ้ามีหลายรุ่นย่อย (variants) ให้แสดงเป็น tabs
	if (variantsList && variantsList.length > 0) {
		return (
			<div className="w-full">
				<Tabs
					defaultValue={selectedVariantId || variantsList[0].id}
					onValueChange={onVariantChange}
					className="w-full"
				>
					<TabsList className="w-full grid grid-cols-3 mb-6">
						{variantsList.map((variant) => (
							<TabsTrigger
								key={variant.id}
								value={variant.id}
								className="text-center"
							>
								{variant.name}
							</TabsTrigger>
						))}
					</TabsList>

					{variantsList.map((variant) => (
						<TabsContent key={variant.id} value={variant.id}>
							<SpecTable
								techSpec={variant.techSpec}
								variantName={variant.name}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		);
	}

	// ถ้ามีเพียงรุ่นเดียว ให้แสดงเป็นตารางปกติ
	return <SpecTable techSpec={techSpec} variantName={variantName} />;
};

// Component ย่อยสำหรับแสดงตารางข้อมูล
const SpecTable: React.FC<{ techSpec?: TechSpec; variantName?: string }> = ({
	techSpec,
	variantName,
}) => {
	if (!techSpec) {
		return (
			<div className="text-center text-muted-foreground p-4">
				ไม่มีข้อมูลสเปค
			</div>
		);
	}

	return (
		<div className="border rounded-lg overflow-hidden">
			{variantName && (
				<div className="p-4 bg-card/50 border-b">
					<h3 className="text-xl font-bold">{variantName}</h3>
				</div>
			)}

			<Table variant="modern">
				<TableHeader>
					<TableRow>
						<TableHead variant="modern" className="w-1/2">
							รายการ
						</TableHead>
						<TableHead>ข้อมูล</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{/* ขนาดและมิติ */}
					{techSpec.dimensions && (
						<>
							<TableRow className="bg-muted/50">
								<TableCell colSpan={2} className="font-semibold">
									ขนาดและมิติ
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>ความยาว</TableCell>
								<TableCell>{techSpec.dimensions.length}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>ความกว้าง</TableCell>
								<TableCell>{techSpec.dimensions.width}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>ความสูง</TableCell>
								<TableCell>{techSpec.dimensions.height}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>ระยะห่างล้อ</TableCell>
								<TableCell>{techSpec.dimensions.wheelbase}</TableCell>
							</TableRow>
						</>
					)}

					{/* น้ำหนัก */}
					{techSpec.weights && (
						<>
							<TableRow className="bg-muted/50">
								<TableCell colSpan={2} className="font-semibold">
									น้ำหนัก
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>น้ำหนักรถเปล่า</TableCell>
								<TableCell>{techSpec.weights.curb}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>น้ำหนักรวมภาระ</TableCell>
								<TableCell>{techSpec.weights.gross}</TableCell>
							</TableRow>
						</>
					)}

					{/* ข้อมูลอื่นๆ */}
					{techSpec.clearance && (
						<TableRow>
							<TableCell>ระยะห่างจากพื้น</TableCell>
							<TableCell>{techSpec.clearance}</TableCell>
						</TableRow>
					)}

					{techSpec.tiresAndWheels && (
						<TableRow>
							<TableCell>ขนาดล้อและยาง</TableCell>
							<TableCell>{techSpec.tiresAndWheels}</TableCell>
						</TableRow>
					)}

					{/* แบตเตอรี่และการชาร์จ */}
					{(techSpec.batteryCapacity || techSpec.chargingTime) && (
						<TableRow className="bg-muted/50">
							<TableCell colSpan={2} className="font-semibold">
								แบตเตอรี่และการชาร์จ
							</TableCell>
						</TableRow>
					)}

					{techSpec.batteryCapacity && (
						<TableRow>
							<TableCell>ความจุแบตเตอรี่</TableCell>
							<TableCell>{techSpec.batteryCapacity}</TableCell>
						</TableRow>
					)}

					{techSpec.chargingTime?.acCharging && (
						<TableRow>
							<TableCell>เวลาชาร์จ AC</TableCell>
							<TableCell>{techSpec.chargingTime.acCharging}</TableCell>
						</TableRow>
					)}

					{techSpec.chargingTime?.dcCharging && (
						<TableRow>
							<TableCell>เวลาชาร์จ DC</TableCell>
							<TableCell>{techSpec.chargingTime.dcCharging}</TableCell>
						</TableRow>
					)}

					{/* สมรรถนะ */}
					{techSpec.performance && (
						<>
							<TableRow className="bg-muted/50">
								<TableCell colSpan={2} className="font-semibold">
									สมรรถนะ
								</TableCell>
							</TableRow>

							{techSpec.performance.topSpeed && (
								<TableRow>
									<TableCell>ความเร็วสูงสุด</TableCell>
									<TableCell>{techSpec.performance.topSpeed}</TableCell>
								</TableRow>
							)}

							{techSpec.performance.acceleration && (
								<TableRow>
									<TableCell>อัตราเร่ง 0-100 กม./ชม.</TableCell>
									<TableCell>{techSpec.performance.acceleration}</TableCell>
								</TableRow>
							)}

							{techSpec.performance.range && (
								<TableRow>
									<TableCell>ระยะทางขับขี่</TableCell>
									<TableCell>{techSpec.performance.range}</TableCell>
								</TableRow>
							)}
						</>
					)}

					{/* ข้อมูลเพิ่มเติม */}
					{techSpec.misc && Object.keys(techSpec.misc).length > 0 && (
						<>
							<TableRow className="bg-muted/50">
								<TableCell colSpan={2} className="font-semibold">
									ข้อมูลเพิ่มเติม
								</TableCell>
							</TableRow>

							{Object.entries(techSpec.misc).map(([key, value]) => (
								<TableRow key={key}>
									<TableCell>{key}</TableCell>
									<TableCell>{value}</TableCell>
								</TableRow>
							))}
						</>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default TechSpecTable;
