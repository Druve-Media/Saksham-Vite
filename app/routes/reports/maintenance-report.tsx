import {
	AlertTriangle,
	Calendar,
	CheckCircle,
	Clock,
	Download,
	Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const maintenanceData = {
	totalRequests: 147,
	completedRequests: 89,
	pendingRequests: 42,
	inProgressRequests: 16,
	averageResolutionTime: "3.2 days",
	maintenanceCost: "$23,450",
	recentRequests: [
		{
			id: "MT-001",
			apartment: "A-101",
			category: "Plumbing",
			issue: "Kitchen faucet leak",
			status: "Completed",
			priority: "Medium",
			dateReported: "2024-01-15",
			dateCompleted: "2024-01-17",
			cost: "$85",
			technician: "John Smith",
		},
		{
			id: "MT-002",
			apartment: "B-205",
			category: "Electrical",
			issue: "Light fixture not working",
			status: "In Progress",
			priority: "High",
			dateReported: "2024-01-16",
			dateCompleted: "--",
			cost: "$120",
			technician: "Mike Johnson",
		},
		{
			id: "MT-003",
			apartment: "C-302",
			category: "HVAC",
			issue: "AC not cooling properly",
			status: "Pending",
			priority: "High",
			dateReported: "2024-01-17",
			dateCompleted: "--",
			cost: "$200",
			technician: "--",
		},
		{
			id: "MT-004",
			apartment: "A-504",
			category: "General",
			issue: "Door lock malfunction",
			status: "Completed",
			priority: "Low",
			dateReported: "2024-01-14",
			dateCompleted: "2024-01-16",
			cost: "$65",
			technician: "Sarah Wilson",
		},
		{
			id: "MT-005",
			apartment: "B-403",
			category: "Plumbing",
			issue: "Bathroom drain clogged",
			status: "In Progress",
			priority: "Medium",
			dateReported: "2024-01-16",
			dateCompleted: "--",
			cost: "$95",
			technician: "John Smith",
		},
	],
	categoryBreakdown: [
		{ category: "Plumbing", count: 45, percentage: "31%" },
		{ category: "Electrical", count: 38, percentage: "26%" },
		{ category: "HVAC", count: 32, percentage: "22%" },
		{ category: "General", count: 22, percentage: "15%" },
		{ category: "Security", count: 10, percentage: "6%" },
	],
};

const getStatusIcon = (status: string) => {
	switch (status.toLowerCase()) {
		case "completed":
			return <CheckCircle className="h-4 w-4 text-green-600" />;
		case "in progress":
			return <Clock className="h-4 w-4 text-blue-600" />;
		case "pending":
			return <AlertTriangle className="h-4 w-4 text-orange-600" />;
		default:
			return <Wrench className="h-4 w-4 text-gray-600" />;
	}
};

const getStatusBadgeVariant = (status: string) => {
	switch (status.toLowerCase()) {
		case "completed":
			return "default";
		case "in progress":
			return "secondary";
		case "pending":
			return "destructive";
		default:
			return "outline";
	}
};

const getPriorityBadgeVariant = (priority: string) => {
	switch (priority.toLowerCase()) {
		case "high":
			return "destructive";
		case "medium":
			return "secondary";
		case "low":
			return "outline";
		default:
			return "outline";
	}
};

export default function MaintenanceReportPage() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold">Maintenance Report</h1>
					<p className="text-muted-foreground">
						Track maintenance requests, completion rates, and technician
						performance
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						<Calendar className="h-4 w-4 mr-2" />
						Select Period
					</Button>
					<Button size="sm">
						<Download className="h-4 w-4 mr-2" />
						Export Report
					</Button>
				</div>
			</div>

			{/* Maintenance Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Requests
						</CardTitle>
						<Wrench className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{maintenanceData.totalRequests}
						</div>
						<p className="text-xs text-muted-foreground">
							All maintenance requests
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Completed</CardTitle>
						<CheckCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							{maintenanceData.completedRequests}
						</div>
						<p className="text-xs text-muted-foreground">
							{Math.round(
								(maintenanceData.completedRequests /
									maintenanceData.totalRequests) *
									100,
							)}
							% completion rate
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pending</CardTitle>
						<AlertTriangle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">
							{maintenanceData.pendingRequests}
						</div>
						<p className="text-xs text-muted-foreground">Awaiting assignment</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Avg Resolution
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{maintenanceData.averageResolutionTime}
						</div>
						<p className="text-xs text-muted-foreground">
							Average completion time
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Category Breakdown and Cost Summary */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Category Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle>Requests by Category</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{maintenanceData.categoryBreakdown.map((item) => (
							<div key={item.category} className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{item.category}</span>
									<div className="flex items-center gap-2">
										<Badge variant="secondary">{item.percentage}</Badge>
										<span className="text-sm font-semibold">
											{item.count} requests
										</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-blue-600 h-2 rounded-full"
										style={{ width: item.percentage }}
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Cost and Performance */}
				<Card>
					<CardHeader>
						<CardTitle>Cost & Performance</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<div className="text-2xl font-bold text-blue-600">
									{maintenanceData.maintenanceCost}
								</div>
								<div className="text-sm text-muted-foreground">
									Total Maintenance Cost
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="text-center p-3 bg-green-50 rounded-lg">
									<div className="text-lg font-bold text-green-600">89%</div>
									<div className="text-xs text-muted-foreground">
										Completion Rate
									</div>
								</div>
								<div className="text-center p-3 bg-orange-50 rounded-lg">
									<div className="text-lg font-bold text-orange-600">3.2</div>
									<div className="text-xs text-muted-foreground">Avg Days</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Maintenance Requests Table */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Maintenance Requests</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Request ID</TableHead>
								<TableHead>Apartment</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Issue</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Priority</TableHead>
								<TableHead>Reported</TableHead>
								<TableHead>Cost</TableHead>
								<TableHead>Technician</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{maintenanceData.recentRequests.map((request) => (
								<TableRow key={request.id}>
									<TableCell className="font-medium">{request.id}</TableCell>
									<TableCell>{request.apartment}</TableCell>
									<TableCell>{request.category}</TableCell>
									<TableCell className="max-w-[200px] truncate">
										{request.issue}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											{getStatusIcon(request.status)}
											<Badge variant={getStatusBadgeVariant(request.status)}>
												{request.status}
											</Badge>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant={getPriorityBadgeVariant(request.priority)}>
											{request.priority}
										</Badge>
									</TableCell>
									<TableCell>{request.dateReported}</TableCell>
									<TableCell className="font-semibold">
										{request.cost}
									</TableCell>
									<TableCell>{request.technician}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
