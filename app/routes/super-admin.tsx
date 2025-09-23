import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/super-admin/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";

export default function SocietyAdminLayout() {
	// Zustand persist hydration check
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const [hasHydrated, setHasHydrated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsub = useAuthStore.persist.onFinishHydration(() =>
			setHasHydrated(true),
		);
		if (useAuthStore.persist.hasHydrated()) setHasHydrated(true);
		return unsub;
	}, []);

	useEffect(() => {
		if (hasHydrated && !isAuthenticated) {
			navigate("/auth/login", { replace: true });
		}
	}, [isAuthenticated, hasHydrated, navigate]);

	if (!hasHydrated) return null;
	if (!isAuthenticated) return null;

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<span className="font-semibold text-lg">Super Admin</span>
					</div>
					<div className="ml-auto flex items-center gap-2 px-4">
						<ModeToggle />
						{/* <Avatar className="h-8 w-8">
							<AvatarImage src="/avatars/shadcn.jpg" alt="User" />
							<AvatarFallback>U</AvatarFallback>
						</Avatar> */}
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
