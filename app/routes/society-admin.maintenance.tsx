import pkg from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const {
	IconEdit,
	IconTrash,
	IconTools,
	IconDownload,
	IconFilter,
	IconSearch,
	IconPlus,
	IconCalendar,
} = pkg;

const maintenanceRequests = [
	{
		id: 1,
		ticketNumber: "MNT-001",
		title: "Leaking Faucet in Kitchen",
		requestedBy: "John Smith",
		apartment: "101",
		category: "Plumbing",
		priority: "Medium",
		status: "In Progress",
		assignedTo: "Mike Johnson",
		description: "Kitchen faucet has been leaking for the past 3 days",
		createdDate: "2025-09-10",
		dueDate: "2025-09-12",
		estimatedCost: "$150",
	},
	{
		id: 2,
		ticketNumber: "MNT-002",
		title: "Air Conditioning Not Working",
		requestedBy: "Sarah Wilson",
		apartment: "205",
		category: "HVAC",
		priority: "High",
		status: "Pending",
		assignedTo: "--",
		description: "AC stopped working completely, no cooling",
		createdDate: "2025-09-11",
		dueDate: "2025-09-11",
		estimatedCost: "$300",
	},
	{
		id: 3,
		ticketNumber: "MNT-003",
		title: "Elevator Button Replacement",
		requestedBy: "Building Manager",
		apartment: "Common Area",
		category: "Electrical",
		priority: "Low",
		status: "Completed",
		assignedTo: "David Lee",
		description: "Replace faulty buttons on 3rd floor elevator",
		createdDate: "2025-09-08",
		dueDate: "2025-09-10",
		estimatedCost: "$80",
	},
	{
		id: 4,
		ticketNumber: "MNT-004",
		title: "Bathroom Tile Repair",
		requestedBy: "Mike Johnson",
		apartment: "302",
		category: "Plumbing",
		priority: "Medium",
		status: "Scheduled",
		assignedTo: "Sarah Brown",
		description: "Several bathroom tiles are loose and need replacement",
		createdDate: "2025-09-11",
		dueDate: "2025-09-14",
		estimatedCost: "$200",
	},
];

const categories = [
	"Plumbing",
	"Electrical",
	"HVAC",
	"Carpentry",
	"Painting",
	"General Repair",
	"Appliance",
	"Common Area",
];

const priorities = ["Low", "Medium", "High", "Critical"];
const statuses = [
	"Pending",
	"Scheduled",
	"In Progress",
	"Completed",
	"Cancelled",
];

export default function MaintenancePage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");

	const [form, setForm] = useState({
		title: "",
		category: "",
		priority: "",
		description: "",
		apartment: "",
		estimatedCost: "",
	});

	const handleAdd = () => {
		console.log("Adding maintenance request:", form);
		setIsDialogOpen(false);
		setForm({
			title: "",
			category: "",
			priority: "",
			description: "",
			apartment: "",
			estimatedCost: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting maintenance data...");
	};

	const filteredRequests = maintenanceRequests.filter((request) => {
		const matchesSearch =
			request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			categoryFilter === "all" ||
			request.category.toLowerCase() === categoryFilter;
		const matchesStatus =
			statusFilter === "all" || request.status.toLowerCase() === statusFilter;
		const matchesPriority =
			priorityFilter === "all" ||
			request.priority.toLowerCase() === priorityFilter;
		return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
	});

	const getPriorityColor = (priority: string) => {
		switch (priority.toLowerCase()) {
			case "critical":
				return "bg-[#ffb400]/30 text-[#ffb400]";
			case "high":
				return "bg-[#ffb400]/10 text-[#ffb400]";
			case "medium":
				return "bg-[#1a5fd8]/10 text-[#1a5fd8]";
			case "low":
				return "bg-[#1a5fd8]/20 text-[#1a5fd8]";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "completed":
				return "bg-[#1a5fd8]/20 text-[#1a5fd8]";
			case "in progress":
				return "bg-[#1a5fd8]/10 text-[#1a5fd8]";
			case "scheduled":
				return "bg-[#1a5fd8]/20 text-[#1a5fd8]";
			case "pending":
				return "bg-[#ffb400]/10 text-[#ffb400]";
			case "cancelled":
				return "bg-[#ffb400]/20 text-[#ffb400]";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="space-y-6">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">Maintenance Requests</h1>
					<p className="text-muted-foreground">
						Manage and track maintenance requests
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-[#ffb400] hover:bg-[#ffb400]/80">
							<IconPlus className="mr-2 h-4 w-4" />
							Create Request
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-lg">
						<DialogHeader>
							<DialogTitle>Create Maintenance Request</DialogTitle>
							<DialogDescription>
								Submit a new maintenance request for your apartment or common
								area.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									placeholder="Brief description of the issue"
									value={form.title}
									onChange={(e) =>
										setForm((f) => ({ ...f, title: e.target.value }))
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="category">Category *</Label>
									<Select
										onValueChange={(value) =>
											setForm((f) => ({ ...f, category: value }))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category}
													value={category.toLowerCase()}
												>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="priority">Priority *</Label>
									<Select
										onValueChange={(value) =>
											setForm((f) => ({ ...f, priority: value }))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Priority" />
										</SelectTrigger>
										<SelectContent>
											{priorities.map((priority) => (
												<SelectItem
													key={priority}
													value={priority.toLowerCase()}
												>
													{priority}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="apartment">Apartment Number *</Label>
									<Input
										id="apartment"
										placeholder="e.g., 101 or Common Area"
										value={form.apartment}
										onChange={(e) =>
											setForm((f) => ({ ...f, apartment: e.target.value }))
										}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="estimatedCost">Estimated Cost</Label>
									<Input
										id="estimatedCost"
										placeholder="e.g., $150"
										value={form.estimatedCost}
										onChange={(e) =>
											setForm((f) => ({ ...f, estimatedCost: e.target.value }))
										}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description *</Label>
								<Textarea
									id="description"
									placeholder="Detailed description of the maintenance issue"
									className="min-h-[80px]"
									value={form.description}
									onChange={(e) =>
										setForm((f) => ({ ...f, description: e.target.value }))
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button
								onClick={handleAdd}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80"
							>
								Submit Request
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Search and Actions Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search by title, ticket number, or requestor"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category} value={category.toLowerCase()}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						{statuses.map((status) => (
							<SelectItem key={status} value={status.toLowerCase()}>
								{status}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={priorityFilter} onValueChange={setPriorityFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Priorities</SelectItem>
						{priorities.map((priority) => (
							<SelectItem key={priority} value={priority.toLowerCase()}>
								{priority}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button variant="outline" size="sm">
					<IconFilter className="mr-2 h-4 w-4" />
					FILTERS
				</Button>
				<Button variant="outline" size="sm" onClick={handleExport}>
					<IconDownload className="mr-2 h-4 w-4" />
					Export
				</Button>
			</div>

			{/* Statistics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Total Requests</p>
								<p className="text-2xl font-bold">
									{maintenanceRequests.length}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/10 flex items-center justify-center">
								<IconTools className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Pending</p>
								<p className="text-2xl font-bold text-[#ffb400]">
									{
										maintenanceRequests.filter(
											(req) => req.status === "Pending",
										).length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#ffb400]/10 flex items-center justify-center">
								<IconTools className="h-4 w-4 text-[#ffb400]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">In Progress</p>
								<p className="text-2xl font-bold text-[#1a5fd8]">
									{
										maintenanceRequests.filter(
											(req) => req.status === "In Progress",
										).length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/10 flex items-center justify-center">
								<IconTools className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Completed</p>
								<p className="text-2xl font-bold text-[#1a5fd8]">
									{
										maintenanceRequests.filter(
											(req) => req.status === "Completed",
										).length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/20 flex items-center justify-center">
								<IconTools className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Maintenance Requests Table */}
			<Card className="bg-background border rounded-lg shadow">
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[1000px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>TICKET</TableHead>
									<TableHead>TITLE</TableHead>
									<TableHead>REQUESTOR</TableHead>
									<TableHead>APARTMENT</TableHead>
									<TableHead>CATEGORY</TableHead>
									<TableHead>PRIORITY</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>ASSIGNED TO</TableHead>
									<TableHead>DUE DATE</TableHead>
									<TableHead>COST</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredRequests.map((request) => (
									<TableRow key={request.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded bg-[#1a5fd8]/10">
													<IconTools className="h-4 w-4 text-[#1a5fd8]" />
												</div>
												<span className="font-medium">
													{request.ticketNumber}
												</span>
											</div>
										</TableCell>
										<TableCell className="max-w-xs">
											<div>
												<p className="font-medium">{request.title}</p>
												<p className="text-sm text-muted-foreground truncate">
													{request.description}
												</p>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<AvatarImage
														src={`https://api.dicebear.com/6/initials/svg?seed=${request.requestedBy}`}
													/>
													<AvatarFallback className="text-xs">
														{request.requestedBy
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<span className="text-sm">{request.requestedBy}</span>
											</div>
										</TableCell>
										<TableCell>{request.apartment}</TableCell>
										<TableCell>
											<Badge variant="outline" className="font-medium">
												{request.category}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge className={getPriorityColor(request.priority)}>
												{request.priority}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge className={getStatusColor(request.status)}>
												{request.status}
											</Badge>
										</TableCell>
										<TableCell>
											{request.assignedTo === "--" ? (
												<span className="text-muted-foreground">--</span>
											) : (
												<div className="flex items-center gap-2">
													<Avatar className="h-6 w-6">
														<AvatarImage
															src={`https://api.dicebear.com/6/initials/svg?seed=${request.assignedTo}`}
														/>
														<AvatarFallback className="text-xs">
															{request.assignedTo
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span className="text-sm">{request.assignedTo}</span>
												</div>
											)}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1 text-sm">
												<IconCalendar className="h-3 w-3" />
												{request.dueDate}
											</div>
										</TableCell>
										<TableCell className="font-semibold">
											{request.estimatedCost}
										</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Button variant="outline" size="sm">
													<IconEdit className="mr-2 h-4 w-4" />
													UPDATE
												</Button>
												<Button
													variant="outline"
													size="sm"
													className="text-red-600 border-red-600 hover:bg-red-50"
												>
													<IconTrash className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing 1 to {filteredRequests.length} of {filteredRequests.length}{" "}
					results
				</p>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" disabled>
						&lt;
					</Button>
					<Button variant="default" size="sm" className="bg-blue-600">
						1
					</Button>
					<Button variant="outline" size="sm">
						&gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
