"use client";
import {
	IconBuildingStore as TablerBuildingStore,
	IconChecklist as TablerChecklist,
	IconDeviceDesktopAnalytics as TablerDeviceDesktopAnalytics,
	IconHome as TablerHome,
	IconPackages as TablerPackages,
	IconReceipt as TablerReceipt,
	IconSettings as TablerSettings,
} from "@tabler/icons-react";
import type { LucideIcon } from "lucide-react";
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
// Adapter: Tabler icons render as components. We coerce them to `LucideIcon`
// so they can be passed to `NavMain` without changing that component's types.
const asLucideIcon = (
	IconComponent: React.ComponentType<Record<string, unknown>>,
): LucideIcon => {
	return IconComponent as unknown as LucideIcon;
};

const data = {
	user: {
		name: "Druve Media",
		email: "druvemedi@druvemedia.in",
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
			icon: asLucideIcon(TablerHome),
		},
		{
			title: "Society",
			url: "/super-admin/society",
			icon: asLucideIcon(TablerBuildingStore),
		},
		{
			title: "Packages",
			url: "/super-admin/packages",
			icon: asLucideIcon(TablerPackages),
		},
		{
			title: "Billing",
			url: "/super-admin/billing",
			icon: asLucideIcon(TablerReceipt),
		},
		{
			title: "Offline Request",
			url: "/super-admin/offline-request",
			icon: asLucideIcon(TablerChecklist),
		},
		{
			title: "Landing Site",
			url: "/super-admin/landing-site",
			icon: asLucideIcon(TablerDeviceDesktopAnalytics),
		},
		{
			title: "Settings",
			url: "/super-admin/settings",
			icon: asLucideIcon(TablerSettings),
		},
	],
	projects: [],
};

function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();

	// Set isActive for current path (flat items only) and ensure boolean type
	const navItems = data.navMain.map((item) => ({
		...item,
		isActive: !!(
			item.url &&
			item.url !== "#" &&
			location.pathname.startsWith(item.url)
		),
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
