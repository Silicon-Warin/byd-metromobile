"use client";

import React, {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { Liff } from "@line/liff";

const LiffContext = createContext<{
	liff: Liff | null;
	liffError: string | null;
}>({
	liff: null,
	liffError: null,
});

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<PropsWithChildren<{ liffId: string }>> = ({
	children,
	liffId,
}) => {
	const [liff, setLiff] = useState<Liff | null>(null);
	const [liffError, setLiffError] = useState<string | null>(null);

	useEffect(() => {
		const initLiff = async () => {
			try {
				const liffModule = await import("@line/liff");
				const liffInstance = liffModule.default;
				await liffInstance.init({ liffId });
				setLiff(liffInstance);
			} catch (error) {
				setLiffError((error as Error).message);
			}
		};

		initLiff();
	}, [liffId]);

	return (
		<LiffContext.Provider value={{ liff, liffError }}>
			{children}
		</LiffContext.Provider>
	);
};
