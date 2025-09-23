"use client";
import {
	IconBuildingStore,
	IconChecklist,
	IconDeviceDesktopAnalytics,
	IconHome,
	IconPackages,
	IconReceipt,
	IconSettings,
} from "@tabler/icons-react";
import { Users } from "lucide-react";
import type * as React from "react";
import { useLocation } from "react-router";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// Sidebar data object
const data = {
	user: {
		name: "Green Valley Apartments",
		email: "m@example.com",
		avatar: "/saksham.jpg",
	},
	teams: [
		{
			name: "Saksham",
			logo: Users,
			plan: "Enterprise",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/super-admin/dashboard",
			icon: IconHome,
		},
		{
			title: "Society",
			url: "/super-admin/society",
			icon: IconBuildingStore,
		},
		{
			title: "Packages",
			url: "/super-admin/packages",
			icon: IconPackages,
		},
		{
			title: "Billing",
			url: "/super-admin/billing",
			icon: IconReceipt,
		},
		{
			title: "Offline Request",
			url: "/super-admin/offline-request",
			icon: IconChecklist,
		},
		{
			title: "Landing Site",
			url: "/super-admin/landing-site",
			icon: IconDeviceDesktopAnalytics,
		},
		{
			title: "Settings",
			url: "/super-admin/settings",
			icon: IconSettings,
		},
	],
	projects: [],
};

function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();

	// Set isActive for current path (flat items only)
	const navItems = data.navMain.map((item) => ({
		...item,
		isActive:
			item.url && item.url !== "#" && location.pathname.startsWith(item.url),
	}));

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

export { AppSidebar };
