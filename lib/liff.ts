import liff from "@line/liff";

export const initializeLiff = async () => {
	try {
		await liff.init({
			liffId: process.env.NEXT_PUBLIC_LIFF_ID || "",
		});

		if (!liff.isLoggedIn()) {
			liff.login();
		}

		return true;
	} catch (error) {
		console.error("LIFF initialization failed:", error);
		return false;
	}
};

export const sendMessageToLine = async (message: string) => {
	try {
		if (!liff.isInClient()) {
			throw new Error("Not in LINE app");
		}

		await liff.sendMessages([
			{
				type: "text",
				text: message,
			},
		]);

		return true;
	} catch (error) {
		console.error("Failed to send message:", error);
		return false;
	}
};

export { liff };
