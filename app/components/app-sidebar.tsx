"use client";

import type { LucideIcon } from "lucide-react";
import {
	Building2,
	Calendar,
	FileText,
	Home,
	Key,
	Megaphone,
	MessageSquare,
	Package,
	Receipt,
	Settings,
	Settings2,
	Shield,
	Ticket,
	UserCheck,
	Users,
	UserX,
} from "lucide-react";
import type * as React from "react";
import { useLocation } from "react-router";
import type { Society } from "@/beans/auth/login";
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
import { useAuthStore } from "@/stores/auth-store";

interface NavSubItem {
	title: string;
	url: string;
	isActive?: boolean;
}

interface NavItem {
	title: string;
	url: string;
	icon: LucideIcon;
	items?: NavSubItem[];
	isActive?: boolean;
}

// Sidebar data object
const navData: { navMain: NavItem[]; projects: [] } = {
	navMain: [
		{
			title: "Home",
			url: "/",
			icon: Home,
		},
		{
			title: "Society Admin",
			url: "/society-admin/dashboard",
			icon: Settings2,
		},
		{
			title: "User",
			url: "/society-admin/users",
			icon: Users,
		},
		{
			title: "Owner",
			url: "/society-admin/owners",
			icon: Shield,
		},
		{
			title: "Tenant",
			url: "#",
			icon: UserCheck,
			items: [
				{ title: "Tenant", url: "/society-admin/tenants" },
				{ title: "Rent", url: "/society-admin/bills" },
			],
		},
		{
			title: "Apartment",
			url: "#",
			icon: Building2,
			items: [
				{ title: "Wing", url: "/society-admin/wing" },
				{ title: "Floor", url: "/society-admin/floors" },
				{ title: "Apartment", url: "/society-admin/apartments" },
				{ title: "Parking", url: "/society-admin/parkings" },
			],
		},
		{
			title: "Amenities",
			url: "#",
			icon: Key,
			items: [
				{ title: "Amenities", url: "/society-admin/amenities" },
				{ title: "Book Amenity", url: "/society-admin/book-amenity" },
			],
		},
		{
			title: "Bills",
			url: "#",
			icon: Receipt,
			items: [
				{ title: "Utility Bills", url: "/society-admin/utilityBills" },
				{ title: "Common Area Bill", url: "/society-admin/common-area-bill" },
				{ title: "Maintenance", url: "/society-admin/maintenance" },
			],
		},
		{
			title: "Assets",
			url: "#",
			icon: Package,
			items: [
				{ title: "Assets", url: "/society-admin/assets" },
				{
					title: "Maintenance Schedule",
					url: "/society-admin/asset-maintenance",
				},
				{ title: "Issue Report", url: "/society-admin/asset-issue" },
			],
		},
		{
			title: "Tickets",
			url: "/society-admin/tickets",
			icon: Ticket,
		},
		{
			title: "Notice Board",
			url: "/society-admin/notices",
			icon: Megaphone,
		},
		{
			title: "Services",
			url: "#",
			icon: Settings,
			items: [
				{ title: "Services", url: "/society-admin/service-management" },
				{
					title: "Clock-in/Clock-out",
					url: "/society-admin/service-clock-in-out",
				},
			],
		},
		{
			title: "Visitors",
			url: "/society-admin/visitors",
			icon: UserX,
		},
		{
			title: "Events",
			url: "/society-admin/events",
			icon: Calendar,
		},
		{
			title: "Society Forum",
			url: "/society-admin/society-forum",
			icon: MessageSquare,
		},
		{
			title: "Report",
			url: "#",
			icon: FileText,
			items: [
				{
					title: "Maintenance Report",
					url: "/society-admin/maintenance-report",
				},
				{
					title: "Financial Report",
					url: "/society-admin/financial-report",
				},
			],
		},
		{
			title: "Settings",
			url: "/society-admin/settings",
			icon: Settings,
		},
	],
	projects: [],
};

function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	const societies = useAuthStore((s) => s.societies);
	const setSelectedSociety = useAuthStore((s) => s.setSelectedSociety);

	const handleTeamSelect = (team: { name: string; plan: string }) => {
		const selectedSociety = societies?.find((s) => s.name === team.name);
		if (selectedSociety) {
			setSelectedSociety(selectedSociety.society_id);
		}
	};

	const teams =
		societies?.map((society: Society) => ({
			name: society.name,
			logo: Users,
			plan: society.role,
		})) || [];
	const user = {
		name: societies?.[0]?.name || "Green Valley Apartments",
		email: "m@example.com",
		avatar: "",
	};

	// Recursively set isActive for current path
	function markActive(items: NavItem[]): NavItem[] {
		return items.map((item: NavItem) => {
			const isActive =
				item.url && item.url !== "#" && location.pathname.startsWith(item.url);
			if (item.items) {
				return {
					...item,
					isActive:
						isActive ||
						item.items.some((sub: NavSubItem) =>
							location.pathname.startsWith(sub.url),
						) ||
						false,
					items: item.items.map((subItem: NavSubItem) => ({
						...subItem,
						isActive: location.pathname.startsWith(subItem.url) || false,
					})),
				};
			}
			return { ...item, isActive: isActive || false };
		});
	}

	const navItems = markActive(navData.navMain);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={teams} onTeamSelect={handleTeamSelect} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

export { AppSidebar };
