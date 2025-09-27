// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout as apiLogout } from "@/api/auth";
import type { Society } from "@/beans/auth/login";

export interface AuthUser {
	token: string;
	sub: string;
	society_id: string;
	role: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: AuthUser | null;
	societies: Society[] | null;
	selectedSocietyId: string | null;
	login: (user: AuthUser) => void;
	setSocieties: (societies: Society[]) => void;
	setSelectedSociety: (id: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			isAuthenticated: false,
			user: null,
			societies: null,
			selectedSocietyId: null,
			login: (user) => {
				console.log("🟢 Saving user to store:", user);
				set({
					isAuthenticated: true,
					user,
					selectedSocietyId: user.society_id,
				});
				console.log("📦 Current store state after login:", get());
			},
			setSocieties: (societies) => {
				set({ societies });
			},
			setSelectedSociety: (id) => {
				set({ selectedSocietyId: id });
			},
			logout: async () => {
				try {
					await apiLogout();
					console.log("🔴 API logout successful");
				} catch (error) {
					console.error("Logout API error:", error);
				} finally {
					console.log("🔴 Clearing user from store");
					set({
						isAuthenticated: false,
						user: null,
						societies: null,
						selectedSocietyId: null,
					});
					console.log("📦 Current store state after logout:", get());
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				societies: state.societies,
				selectedSocietyId: state.selectedSocietyId,
			}),
		},
	),
);
