import {
	IconAlertCircle,
	IconCircleCheck,
	IconClock,
	IconDownload,
	IconEdit,
	IconFilter,
	IconPlus,
	IconSearch,
	IconTool,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
import { useState } from "react";
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

const ticketsRequests = [
	{
		id: 1,
		title: "Leaky Faucet in Kitchen",
		apartmentNumber: "101",
		wing: "Wing A",
		requester: "John Smith",
		category: "Plumbing",
		priority: "Medium",
		status: "Open",
		dateCreated: "2024-01-15",
		description: "Kitchen faucet is leaking continuously",
		estimatedCost: "₹50",
	},
	{
		id: 2,
		title: "Air Conditioner Not Working",
		apartmentNumber: "202",
		wing: "Wing A",
		requester: "Jane Doe",
		category: "HVAC",
		priority: "High",
		status: "In Progress",
		dateCreated: "2024-01-14",
		description: "AC unit not cooling properly",
		estimatedCost: "₹200",
	},
	{
		id: 3,
		title: "Light Bulb Replacement",
		apartmentNumber: "301",
		wing: "Wing B",
		requester: "Mike Johnson",
		category: "Electrical",
		priority: "Low",
		status: "Completed",
		dateCreated: "2024-01-13",
		description: "Replace LED bulbs in living room",
		estimatedCost: "₹25",
	},
	{
		id: 4,
		title: "Elevator Not Working",
		apartmentNumber: "--",
		wing: "Wing A",
		requester: "Building Manager",
		category: "Mechanical",
		priority: "High",
		status: "Open",
		dateCreated: "2024-01-12",
		description: "Elevator stuck on 5th floor",
		estimatedCost: "₹500",
	},
	{
		id: 5,
		title: "Door Lock Issue",
		apartmentNumber: "401",
		wing: "Wing B",
		requester: "Sarah Wilson",
		category: "Security",
		priority: "Medium",
		status: "Open",
		dateCreated: "2024-01-11",
		description: "Main door lock not functioning properly",
		estimatedCost: "₹75",
	},
];

const getStatusIcon = (status: string) => {
	switch (status.toLowerCase()) {
		case "completed":
			return <IconCircleCheck className="h-4 w-4" />;
		case "in progress":
			return <IconClock className="h-4 w-4" />;
		default:
			return <IconAlertCircle className="h-4 w-4" />;
	}
};

export default function TicketsPage() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [categoryFilter, setCategoryFilter] = useState("all");

	const [newRequest, setNewRequest] = useState({
		title: "",
		apartmentNumber: "",
		wing: "",
		category: "",
		priority: "",
		description: "",
		estimatedCost: "",
	});

	const handleAddRequest = () => {
		console.log("Adding tickets request:", newRequest);
		setIsAddDialogOpen(false);
		setNewRequest({
			title: "",
			apartmentNumber: "",
			wing: "",
			category: "",
			priority: "",
			description: "",
			estimatedCost: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting tickets requests data...");
	};

	const filteredRequests = ticketsRequests.filter((request) => {
		const matchesSearch =
			request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.apartmentNumber
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			request.requester.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" ||
			request.status.toLowerCase().replace(" ", "-") === statusFilter;
		const matchesPriority =
			priorityFilter === "all" ||
			request.priority.toLowerCase() === priorityFilter;
		const matchesCategory =
			categoryFilter === "all" ||
			request.category.toLowerCase() === categoryFilter;
		return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
	});

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			{/* Search and Actions Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search by title, apartment, or requester"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400]/10 cursor-pointer"
				>
					<IconFilter className="mr-2 h-4 w-4" />
					FILTERS
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={handleExport}
					className="border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400]/10 cursor-pointer"
				>
					<IconDownload className="mr-2 h-4 w-4" />
					Export
				</Button>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button
							size="sm"
							className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black cursor-pointer"
						>
							<IconPlus className="mr-2 h-4 w-4" />
							Add
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>Create Tickets Request</DialogTitle>
							<DialogDescription>
								Enter the details for the new tickets request below.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="title">Request Title *</Label>
								<Input
									id="title"
									placeholder="Brief description of the issue"
									value={newRequest.title}
									onChange={(e) =>
										setNewRequest({ ...newRequest, title: e.target.value })
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="apartmentNumber">Apartment Number</Label>
									<Input
										id="apartmentNumber"
										placeholder="101 (if applicable)"
										value={newRequest.apartmentNumber}
										onChange={(e) =>
											setNewRequest({
												...newRequest,
												apartmentNumber: e.target.value,
											})
										}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="wing">Wing *</Label>
									<Select
										onValueChange={(value) =>
											setNewRequest({ ...newRequest, wing: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Wing" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="wing-a">Wing A</SelectItem>
											<SelectItem value="wing-b">Wing B</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="category">Category *</Label>
									<Select
										onValueChange={(value) =>
											setNewRequest({ ...newRequest, category: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="plumbing">Plumbing</SelectItem>
											<SelectItem value="electrical">Electrical</SelectItem>
											<SelectItem value="hvac">HVAC</SelectItem>
											<SelectItem value="mechanical">Mechanical</SelectItem>
											<SelectItem value="security">Security</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="priority">Priority *</Label>
									<Select
										onValueChange={(value) =>
											setNewRequest({ ...newRequest, priority: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Priority" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="low">Low</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="high">High</SelectItem>
											<SelectItem value="urgent">Urgent</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="estimatedCost">Estimated Cost</Label>
								<Input
									id="estimatedCost"
									placeholder="$100"
									value={newRequest.estimatedCost}
									onChange={(e) =>
										setNewRequest({
											...newRequest,
											estimatedCost: e.target.value,
										})
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description *</Label>
								<Textarea
									id="description"
									placeholder="Detailed description of the tickets request"
									value={newRequest.description}
									onChange={(e) =>
										setNewRequest({
											...newRequest,
											description: e.target.value,
										})
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsAddDialogOpen(false)}
								className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
							>
								Cancel
							</Button>
							<Button
								onClick={handleAddRequest}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer"
							>
								Create Request
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Filters Bar */}
			<div className="flex items-center gap-4">
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Filter by Status</SelectItem>
						<SelectItem value="open">Open</SelectItem>
						<SelectItem value="in-progress">In Progress</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
					</SelectContent>
				</Select>
				<Select value={priorityFilter} onValueChange={setPriorityFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Priority" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Filter by Priority</SelectItem>
						<SelectItem value="low">Low</SelectItem>
						<SelectItem value="medium">Medium</SelectItem>
						<SelectItem value="high">High</SelectItem>
						<SelectItem value="urgent">Urgent</SelectItem>
					</SelectContent>
				</Select>
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Filter by Category</SelectItem>
						<SelectItem value="plumbing">Plumbing</SelectItem>
						<SelectItem value="electrical">Electrical</SelectItem>
						<SelectItem value="hvac">HVAC</SelectItem>
						<SelectItem value="mechanical">Mechanical</SelectItem>
						<SelectItem value="security">Security</SelectItem>
					</SelectContent>
				</Select>
				{(statusFilter !== "all" ||
					priorityFilter !== "all" ||
					categoryFilter !== "all") && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setStatusFilter("all");
							setPriorityFilter("all");
							setCategoryFilter("all");
						}}
						className="bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
					>
						<IconX className="mr-2 h-4 w-4" />
						CLEAR
					</Button>
				)}
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400]/10 cursor-pointer"
				>
					HIDE
				</Button>
			</div>

			{/* Tickets Requests Table */}
			<Card>
				<CardContent className="p-0">
					{/* Only the table is horizontally scrollable for responsiveness */}
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[900px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>REQUEST</TableHead>
									<TableHead>APARTMENT</TableHead>
									<TableHead>REQUESTER</TableHead>
									<TableHead>CATEGORY</TableHead>
									<TableHead>PRIORITY</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>DATE</TableHead>
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
													<IconTool className="h-4 w-4 text-[#1a5fd8]" />
												</div>
												<div>
													<div className="font-medium">{request.title}</div>
													<div className="text-sm text-muted-foreground truncate max-w-[200px]">
														{request.description}
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="text-sm">
												<div>
													{request.apartmentNumber === "--"
														? "Common Area"
														: request.apartmentNumber}
												</div>
												<div className="text-muted-foreground">
													{request.wing}
												</div>
											</div>
										</TableCell>
										<TableCell>{request.requester}</TableCell>
										<TableCell>
											<Badge variant="outline">{request.category}</Badge>
										</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className={
													request.priority === "High" ||
													request.priority === "Urgent"
														? "bg-[#ffb400]/30 text-[#ffb400]"
														: request.priority === "Medium"
															? "bg-[#ffb400]/20 text-[#ffb400]"
															: "bg-[#1a5fd8]/20 text-[#1a5fd8]"
												}
											>
												{request.priority}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												{getStatusIcon(request.status)}
												<Badge
													variant="secondary"
													className={
														request.status === "Completed"
															? "bg-[#1a5fd8]/20 text-[#1a5fd8]"
															: request.status === "In Progress"
																? "bg-[#1a5fd8]/10 text-[#1a5fd8]"
																: "bg-gray-100 text-gray-800"
													}
												>
													{request.status}
												</Badge>
											</div>
										</TableCell>
										<TableCell className="text-sm">
											{request.dateCreated}
										</TableCell>
										<TableCell className="font-semibold">
											{request.estimatedCost}
										</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													className="border-[#1a5fd8] text-[#1a5fd8] hover:bg-[#1a5fd8]/10 cursor-pointer"
												>
													<IconEdit className="mr-2 h-4 w-4" />
													UPDATE
												</Button>
												<Button
													variant="outline"
													size="sm"
													className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
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
					Showing 1 to 5 of 5 results
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled
						className="cursor-not-allowed"
					>
						&lt;
					</Button>
					<Button
						variant="default"
						size="sm"
						className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer"
					>
						1
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400]/10 cursor-pointer"
					>
						&gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
