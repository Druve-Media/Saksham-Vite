import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function MaintenanceReportPage() {
	const [reportType, setReportType] = useState("monthly");
	const [month, setMonth] = useState("September");
	const [year, setYear] = useState("2025");

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-2 pt-2 pb-4">
				<h1 className="text-3xl font-bold">Maintenance Report</h1>
				<p className="text-muted-foreground">Maintenance Report Description</p>
			</div>

			{/* Report Settings Card */}
			<Card className="bg-background border rounded-lg shadow p-4">
				<CardHeader>
					<CardTitle>Report Settings</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Report Type */}
					<div className="space-y-2">
						<Label className="font-semibold">Report Type</Label>
						<div className="flex flex-col md:flex-row gap-2">
							<Button
								variant="outline"
								style={{
									backgroundColor:
										reportType === "monthly" ? "#ffb400" : undefined,
									color: reportType === "monthly" ? "#1a5fd8" : undefined,
									border: reportType === "monthly" ? "none" : undefined,
									cursor: "pointer",
								}}
								className="flex-1 justify-start"
								onClick={() => setReportType("monthly")}
							>
								<span className="mr-2">
									<span
										className={`inline-block w-4 h-4 rounded-full border-2 ${reportType === "monthly" ? "bg-[#ffb400] border-[#ffb400]" : "border-gray-300"}`}
									></span>
								</span>
								Monthly
								<span className="ml-2 text-xs text-muted-foreground">
									Detailed monthly breakdown
								</span>
							</Button>
							<Button
								variant="outline"
								style={{
									backgroundColor:
										reportType === "annually" ? "#ffb400" : undefined,
									color: reportType === "annually" ? "#1a5fd8" : undefined,
									border: reportType === "annually" ? "none" : undefined,
									cursor: "pointer",
								}}
								className="flex-1 justify-start"
								onClick={() => setReportType("annually")}
							>
								<span className="mr-2">
									<span
										className={`inline-block w-4 h-4 rounded-full border-2 ${reportType === "annually" ? "bg-[#ffb400] border-[#ffb400]" : "border-gray-300"}`}
									></span>
								</span>
								Annually
								<span className="ml-2 text-xs text-muted-foreground">
									Year-over-year analysis
								</span>
							</Button>
						</div>
					</div>

					{/* Month & Year Selectors */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="month">Month</Label>
							<Select value={month} onValueChange={setMonth}>
								<SelectTrigger id="month" className="border-gray-300">
									<SelectValue placeholder="Select Month" />
								</SelectTrigger>
								<SelectContent>
									{[
										"January",
										"February",
										"March",
										"April",
										"May",
										"June",
										"July",
										"August",
										"September",
										"October",
										"November",
										"December",
									].map((m) => (
										<SelectItem key={m} value={m}>
											{m}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="year">Year</Label>
							<Select value={year} onValueChange={setYear}>
								<SelectTrigger id="year" className="border-gray-300">
									<SelectValue placeholder="Select Year" />
								</SelectTrigger>
								<SelectContent>
									{["2023", "2024", "2025", "2026"].map((y) => (
										<SelectItem key={y} value={y}>
											{y}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Download PDF Button */}
					<div>
						<Button
							style={{
								backgroundColor: "#ffb400",
								color: "#1a5fd8",
								border: "none",
								cursor: "pointer",
							}}
							className="font-semibold px-6 py-2 rounded-lg"
						>
							<Download className="h-4 w-4 mr-2" />
							Download PDF
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
