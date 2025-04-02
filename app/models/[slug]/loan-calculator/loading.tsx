export default function LoanCalculatorLoading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="text-center text-foreground">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-bydblue mx-auto mb-4"></div>
				<p className="text-xl">กำลังโหลดข้อมูลตารางผ่อน...</p>
			</div>
		</div>
	);
}
