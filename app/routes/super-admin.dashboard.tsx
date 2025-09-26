import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

function getLastNDaysLabels(n = 7) {
	const labels = [];
	const today = new Date();
	for (let i = n - 1; i >= 0; i--) {
		const d = new Date(today);
		d.setDate(today.getDate() - i);
		const day = d.getDate();
		const month = d.toLocaleString("default", { month: "short" });
		labels.push(`${day} ${month}`);
	}
	return labels;
}

const subscriptionTrendsData = {
	labels: getLastNDaysLabels(7),
	datasets: [
		{
			label: "Subscriptions",
			data: [0, 0, 0, 0, 0, 0, 0], // Replace with live data if available
			borderColor: "#1a5fd8",
			backgroundColor: (
				context: import("chart.js").ScriptableContext<"line">,
			) => {
				const chart = context.chart as import("chart.js").Chart<"line">;
				const { ctx, chartArea } = chart;
				if (!chartArea) return "#e0eaff";
				const gradient = ctx.createLinearGradient(
					0,
					chartArea.top,
					0,
					chartArea.bottom,
				);
				gradient.addColorStop(0, "#1a5fd8aa");
				gradient.addColorStop(1, "#e0eaff00");
				return gradient;
			},
			pointBackgroundColor: "#ffb400",
			pointBorderColor: "#fff",
			pointRadius: 6,
			pointHoverRadius: 8,
			tension: 0.45,
			fill: true,
			borderWidth: 3,
		},
	],
};

const subscriptionTrendsOptions = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
		tooltip: {
			enabled: true,
			backgroundColor: "#1a5fd8",
			titleColor: "#fff",
			bodyColor: "#fff",
			borderColor: "#ffb400",
			borderWidth: 1,
			padding: 12,
			cornerRadius: 8,
			displayColors: false,
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
			ticks: {
				color: "#888",
				font: { size: 13 },
				padding: 8,
			},
		},
		y: {
			grid: {
				color: "#eee",
				borderDash: [4, 4],
			},
			ticks: {
				color: "#888",
				font: { size: 13 },
				stepSize: 0.5,
				padding: 6,
			},
			min: 0,
			max: 2,
		},
	},
	elements: {
		line: {
			borderWidth: 3,
		},
		point: {
			radius: 6,
			hoverRadius: 8,
			backgroundColor: "#ffb400",
			borderColor: "#fff",
			borderWidth: 2,
		},
	},
};

import { IconClock } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function SuperAdminDashboard() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<span className="text-sm text-muted-foreground">
					Saturday, 20 Sep, 03:56 PM
				</span>
			</div>

			<h2 className="text-xl font-semibold mb-4">Statistics</h2>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
				<Card>
					<CardContent className="py-6">
						<div className="text-lg font-medium mb-2">
							Today's Society Count
						</div>
						<div className="text-3xl font-bold">5</div>
						<div className="text-green-600 text-sm mt-2 flex items-center gap-1">
							<span>&uarr; 500%</span>
							<span className="text-muted-foreground">Since Yesterday</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="py-6">
						<div className="text-lg font-medium mb-2">Total Society Count</div>
						<div className="text-3xl font-bold">5</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="py-6">
						<div className="text-lg font-medium mb-2">
							Total Free Society Count
						</div>
						<div className="text-3xl font-bold">5</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="py-6">
						<div className="text-lg font-medium mb-2">
							Total Paid Society Count
						</div>
						<div className="text-3xl font-bold">0</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<Card>
					<CardHeader>
						<CardTitle>Subscription Trends (Last 7 Days)</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-32 flex items-center justify-center text-muted-foreground">
							<Line
								data={subscriptionTrendsData}
								options={subscriptionTrendsOptions}
								style={{ maxHeight: 120 }}
							/>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Subscription Payment</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center h-32">
						<span className="text-muted-foreground">No records found</span>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center gap-2">
						<IconClock className="h-5 w-5 text-yellow-500" />
						<CardTitle>Pending Offline Requests</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center h-20">
						<span className="text-muted-foreground">
							No offline payment requests found
						</span>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center gap-2">
						<IconClock className="h-5 w-5 text-yellow-500" />
						<CardTitle>Recent Subscription</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center h-20">
						<span className="text-muted-foreground">No invoice found.</span>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
