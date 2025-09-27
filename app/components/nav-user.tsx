// import {
// 	BadgeCheck,
// 	Bell,
// 	ChevronsUpDown,
// 	CreditCard,
// 	LogOut,
// 	Sparkles,
// } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
// 	SidebarMenu,
// 	SidebarMenuButton,
// 	SidebarMenuItem,
// 	useSidebar,
// } from "@/components/ui/sidebar";

// export function NavUser({
// 	user,
// }: {
// 	user: {
// 		name: string;
// 		email: string;
// 		avatar: string;
// 	};
// }) {
// 	const { isMobile } = useSidebar();

import { ChevronsUpDown, LogOut, Sparkles } from "lucide-react";
import { useMemo } from "react";
// 	return (
// 		<SidebarMenu>
// 			<SidebarMenuItem>
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<SidebarMenuButton
// 							size="lg"
// 							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
// 						>
// 							<Avatar className="h-8 w-8 rounded-lg">
// 								<AvatarImage src={user.avatar} alt={user.name} />
// 								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
// 							</Avatar>
// 							<div className="grid flex-1 text-left text-sm leading-tight">
// 								<span className="truncate font-medium">{user.name}</span>
// 								<span className="truncate text-xs">{user.email}</span>
// 							</div>
// 							<ChevronsUpDown className="ml-auto size-4" />
// 						</SidebarMenuButton>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent
// 						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
// 						side={isMobile ? "bottom" : "right"}
// 						align="end"
// 						sideOffset={4}
// 					>
// 						<DropdownMenuLabel className="p-0 font-normal">
// 							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
// 								<Avatar className="h-8 w-8 rounded-lg">
// 									<AvatarImage src={user.avatar} alt={user.name} />
// 									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
// 								</Avatar>
// 								<div className="grid flex-1 text-left text-sm leading-tight">
// 									<span className="truncate font-medium">{user.name}</span>
// 									<span className="truncate text-xs">{user.email}</span>
// 								</div>
// 							</div>
// 						</DropdownMenuLabel>
// 						<DropdownMenuSeparator />
// 						<DropdownMenuGroup>
// 							<DropdownMenuItem>
// 								<Sparkles />
// 								Upgrade to Pro
// 							</DropdownMenuItem>
// 						</DropdownMenuGroup>
// 						<DropdownMenuSeparator />
// 						<DropdownMenuGroup>
// 							<DropdownMenuItem>
// 								<BadgeCheck />
// 								Account
// 							</DropdownMenuItem>
// 							<DropdownMenuItem>
// 								<CreditCard />
// 								Billing
// 							</DropdownMenuItem>
// 							<DropdownMenuItem>
// 								<Bell />
// 								Notifications
// 							</DropdownMenuItem>
// 						</DropdownMenuGroup>
// 						<DropdownMenuSeparator />
// 						<DropdownMenuItem>
// 							<LogOut />
// 							Log out
// 						</DropdownMenuItem>
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			</SidebarMenuItem>
// 		</SidebarMenu>
// 	);
// }
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";

export function NavUser({
	user,
}: {
	user: { name?: string; email?: string; avatar?: string };
}) {
	const { isMobile } = useSidebar();
	const logout = useAuthStore((s) => s.logout);
	const navigate = useNavigate();

	const getInitials = (name?: string): string => {
		if (!name || name.trim() === "") return "U";
		const words = name.trim().split(/\s+/);
		const initials = words
			.slice(0, 2)
			.map((word) => word.charAt(0)?.toUpperCase() || "")
			.join("");
		return initials || "U";
	};

	const initials = useMemo(() => getInitials(user?.name), [user?.name]);

	const handleLogout = async () => {
		await logout();
		navigate("/auth/login", { replace: true });
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								{user?.avatar &&
								typeof user.avatar === "string" &&
								user.avatar.trim() !== "" ? (
									<AvatarImage
										src={user.avatar}
										alt={`${user.name || "User"} avatar`}
									/>
								) : null}
								<AvatarFallback className="rounded-lg">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									{user?.avatar &&
									typeof user.avatar === "string" &&
									user.avatar.trim() !== "" ? (
										<AvatarImage
											src={user.avatar}
											alt={`${user.name || "User"} avatar`}
										/>
									) : null}
									<AvatarFallback className="rounded-lg">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Sparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
