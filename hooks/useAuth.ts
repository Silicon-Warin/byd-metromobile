"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, type UserProfile } from "@/lib/supabase";

interface AuthContextType {
	user: User | null;
	profile: UserProfile | null;
	session: Session | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const useAuthState = () => {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Get initial session
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setUser(session?.user ?? null);

			if (session?.user) {
				await fetchUserProfile(session.user.id);
			}

			setLoading(false);
		};

		getInitialSession();

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			setSession(session);
			setUser(session?.user ?? null);

			if (session?.user) {
				await fetchUserProfile(session.user.id);
			} else {
				setProfile(null);
			}

			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const fetchUserProfile = async (userId: string) => {
		try {
			const { data, error } = await supabase
				.from("user_profiles")
				.select("*")
				.eq("id", userId)
				.single();

			if (error && error.code !== "PGRST116") {
				console.error("Error fetching user profile:", error);
			} else if (data) {
				setProfile(data);
			}
		} catch (error) {
			console.error("Error fetching user profile:", error);
		}
	};

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
		} catch (error) {
			console.error("Error signing in:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const signOut = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			console.error("Error signing out:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const isAdmin = profile?.role === "admin";

	return {
		user,
		profile,
		session,
		loading,
		signIn,
		signOut,
		isAdmin,
	};
};

export { AuthContext };
