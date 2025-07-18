"use client";

import React from "react";
import { AuthContext, useAuthState } from "@/hooks/useAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const auth = useAuthState();

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
