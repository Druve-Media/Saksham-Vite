// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
	token: string;
	sub: string;
	society_id: string;
	role: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: AuthUser | null;
	login: (user: AuthUser) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			isAuthenticated: false,
			user: null,
			login: (user) => {
				console.log("🟢 Saving user to store:", user);
				set({ isAuthenticated: true, user });
				console.log("📦 Current store state after login:", get());
			},
			logout: () => {
				console.log("🔴 Clearing user from store");
				set({ isAuthenticated: false, user: null });
				console.log("📦 Current store state after logout:", get());
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				user: state.user,
			}),
		},
	),
);
