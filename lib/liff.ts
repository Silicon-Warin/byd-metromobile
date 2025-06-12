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

export type LineMessage =
	| { type: "text"; text: string }
	| { type: "flex"; altText: string; contents: any };

export const sendMessageToLine = async (
	message: LineMessage | LineMessage[]
) => {
	try {
		const messagesArray: LineMessage[] = Array.isArray(message)
			? message
			: [message];

		// If not in LINE client, we cannot use liff.sendMessages
		if (!liff.isInClient()) {
			throw new Error(
				"Not in LINE in-app browser. Cannot send message on behalf of the user"
			);
		}

		await liff.sendMessages(messagesArray as any);
		return true;
	} catch (error) {
		console.error("Failed to send message:", error);
		return false;
	}
};

// Convenience helper for text message
export const buildTextMessage = (text: string): LineMessage => ({
	type: "text",
	text,
});

export { liff };
