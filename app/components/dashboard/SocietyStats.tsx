"use client";

import {
	IconAlertCircle,
	IconBuilding,
	IconHome,
	IconUser,
	IconUsers,
} from "@tabler/icons-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useGetSociety } from "@/hooks/dashboard/useGetSociety";

export default function SocietyStats() {
	const { data } = useGetSociety();

	const stats = [
		{
			id: "wings",
			value: data?.wings ?? 0,
			label: "Wings",
			icon: <IconBuilding size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
		{
			id: "unsold",
			value: data?.unsoldApartments ?? 0,
			label: "Unsold Apartments",
			icon: <IconHome size={28} style={{ color: "#ffb400" }} />,
			bg: "bg-[#ffb400]/10",
		},
		{
			id: "apartments",
			value: data?.apartments ?? 0,
			label: "Apartments",
			icon: <IconHome size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
		{
			id: "dues",
			value: data?.maintenanceDues ?? 0,
			label: "Maintenance Dues",
			icon: <IconAlertCircle size={28} style={{ color: "#ffb400" }} />,
			bg: "bg-[#ffb400]/10",
		},
		{
			id: "owners",
			value: data?.owners ?? 0,
			label: "Owners",
			icon: <IconUser size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
		{
			id: "tenants",
			value: data?.tenants ?? 0,
			label: "Tenants",
			icon: <IconUsers size={28} style={{ color: "#ffb400" }} />,
			bg: "bg-[#ffb400]/10",
		},
	];

	return (
		<div>
			{/* Cards always render */}
			<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
				{stats.map((item) => (
					<Card
						key={item.id}
						className="p-4 flex flex-col items-center justify-center h-full"
					>
						<div className={`p-2 rounded-full ${item.bg} mb-2`}>
							{item.icon}
						</div>
						<CardTitle className="text-2xl font-bold">{item.value}</CardTitle>
						<CardDescription className="text-base text-muted-foreground">
							{item.label}
						</CardDescription>
					</Card>
				))}
			</div>
		</div>
	);
}
