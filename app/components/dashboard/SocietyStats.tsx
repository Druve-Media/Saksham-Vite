"use client";

import {
	IconBuilding,
	IconHome,
	IconUser,
	IconUsers,
} from "@tabler/icons-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SocietyStatLabel } from "@/enums/society/societyEnums";
import { useGetSociety } from "@/hooks/dashboard/useGetSociety";

export default function SocietyStats() {
	const { data } = useGetSociety();

	const stats = [
		{
			id: "wings",
			value: data?.overview?.total_wings ?? 0,
			label: SocietyStatLabel.Wings,
			icon: <IconBuilding size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
		{
			id: "apartments",
			value: data?.overview?.total_apartments ?? 0,
			label: SocietyStatLabel.Apartments,
			icon: <IconHome size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
		{
			id: "residents",
			value: data?.overview?.total_residents ?? 0,
			label: SocietyStatLabel.Residents,
			icon: <IconUsers size={28} style={{ color: "#ffb400" }} />,
			bg: "bg-[#ffb400]/10",
		},
		{
			id: "owners",
			value: data?.overview?.roles?.Owner ?? 0,
			label: SocietyStatLabel.Owners,
			icon: <IconUser size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
		{
			id: "tenants",
			value: data?.overview?.roles?.Resident ?? 0,
			label: SocietyStatLabel.Tenants,
			icon: <IconUsers size={28} style={{ color: "#ffb400" }} />,
			bg: "bg-[#ffb400]/10",
		},
		{
			id: "secretary",
			value: data?.overview?.roles?.Secretary ?? 0,
			label: SocietyStatLabel.Secretary,
			icon: <IconUser size={28} style={{ color: "#1a5fd8" }} />,
			bg: "bg-[#1a5fd8]/10",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
			{stats.map((item) => (
				<Card
					key={item.id}
					className="p-4 flex flex-col items-center justify-center h-full"
				>
					<div className={`p-2 rounded-full ${item.bg} mb-2`}>{item.icon}</div>
					<CardTitle className="text-2xl font-bold">{item.value}</CardTitle>
					<CardDescription className="text-base text-muted-foreground">
						{item.label}
					</CardDescription>
				</Card>
			))}
		</div>
	);
}
