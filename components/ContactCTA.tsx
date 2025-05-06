import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function ContactCTA() {
	return (
		<div className="relative z-10 max-w-4xl mx-auto text-center px-4">
			<div className="flex flex-col sm:flex-row gap-4 justify-center p-8">
				<Button
					size="lg"
					className="bg-white hover:bg-white/90 text-black group"
				>
					<Phone className="mr-2 h-5 w-5" />
					ติดต่อเรา
				</Button>

				<Button
					size="lg"
					variant="outline"
					className="border-gray-700 text-white hover:bg-gray-800"
				>
					นัดหมายทดลองขับ
				</Button>
			</div>
		</div>
	);
}
