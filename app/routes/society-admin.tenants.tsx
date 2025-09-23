import {
	IconDownload,
	IconEdit,
	IconFilter,
	IconPlus,
	IconSearch,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
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

const tenants = [
	{
		id: 1,
		fullName: "John Doe",
		email: "john.doe@example.com",
		phone: "(555) 123-4567",
		status: "Active",
		apartmentNumber: "101",
		leaseStart: "2024-01-15",
		leaseEnd: "2024-12-15",
		rent: "₹1,200",
		avatar: "/avatars/john-doe.jpg",
	},
	{
		id: 2,
		fullName: "Jane Smith",
		email: "jane.smith@example.com",
		phone: "(555) 234-5678",
		status: "Active",
		apartmentNumber: "102",
		leaseStart: "2024-02-01",
		leaseEnd: "2025-01-31",
		rent: "₹1,350",
		avatar: "/avatars/jane-smith.jpg",
	},
	{
		id: 3,
		fullName: "Michael Johnson",
		email: "michael.j@example.com",
		phone: "(555) 345-6789",
		status: "Active",
		apartmentNumber: "201",
		leaseStart: "2023-11-01",
		leaseEnd: "2024-10-31",
		rent: "₹1,450",
		avatar: "/avatars/michael.jpg",
	},
	{
		id: 4,
		fullName: "Sarah Wilson",
		email: "sarah.wilson@example.com",
		phone: "(555) 456-7890",
		status: "Active",
		apartmentNumber: "202",
		leaseStart: "2024-03-15",
		leaseEnd: "2025-03-14",
		rent: "₹1,300",
		avatar: "/avatars/sarah.jpg",
	},
	{
		id: 5,
		fullName: "David Brown",
		email: "david.brown@example.com",
		phone: "(555) 567-8901",
		status: "Inactive",
		apartmentNumber: "301",
		leaseStart: "2023-09-01",
		leaseEnd: "2024-08-31",
		rent: "₹1,500",
		avatar: "/avatars/david.jpg",
	},
];

export default function TenantsPage() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [apartmentFilter, setApartmentFilter] = useState("all");

	const [newTenant, setNewTenant] = useState({
		fullName: "",
		email: "",
		phone: "",
		wing: "",
		floor: "",
		apartment: "",
		leaseStart: "",
		leaseEnd: "",
		rent: "",
	});

	const handleAddTenant = () => {
		console.log("Adding tenant:", newTenant);
		setIsAddDialogOpen(false);
		setNewTenant({
			fullName: "",
			email: "",
			phone: "",
			wing: "",
			floor: "",
			apartment: "",
			leaseStart: "",
			leaseEnd: "",
			rent: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting tenants data...");
	};

	const filteredTenants = tenants.filter((tenant) => {
		const matchesSearch =
			tenant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			tenant.phone.includes(searchTerm);
		const matchesStatus =
			statusFilter === "all" || tenant.status.toLowerCase() === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			{/* Search and Actions Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search tenant by name, email or phone number"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
					<IconFilter className="mr-2 h-4 w-4" style={{ color: "#1a5fd8" }} />
					FILTERS
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={handleExport}
					style={{ cursor: "pointer" }}
				>
					<IconDownload className="mr-2 h-4 w-4" style={{ color: "#1a5fd8" }} />
					Export
				</Button>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button
							size="sm"
							className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black"
							style={{ cursor: "pointer" }}
						>
							<IconPlus className="mr-2 h-4 w-4" />
							Add
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>Add New Tenant</DialogTitle>
							<DialogDescription>
								Enter the details for the new tenant below.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="fullName">Full Name *</Label>
								<Input
									id="fullName"
									value={newTenant.fullName}
									onChange={(e) =>
										setNewTenant({ ...newTenant, fullName: e.target.value })
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email Address *</Label>
								<Input
									id="email"
									type="email"
									value={newTenant.email}
									onChange={(e) =>
										setNewTenant({ ...newTenant, email: e.target.value })
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="phone">Phone Number</Label>
								<div className="flex gap-2">
									<Select defaultValue="+1">
										<SelectTrigger className="w-20">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="+1">+1</SelectItem>
											<SelectItem value="+91">+91</SelectItem>
										</SelectContent>
									</Select>
									<Input
										placeholder="Phone"
										value={newTenant.phone}
										onChange={(e) =>
											setNewTenant({ ...newTenant, phone: e.target.value })
										}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="wing">Select Wing *</Label>
									<Select
										onValueChange={(value) =>
											setNewTenant({ ...newTenant, wing: value })
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
								<div className="grid gap-2">
									<Label htmlFor="floor">Select Floor *</Label>
									<Select
										onValueChange={(value) =>
											setNewTenant({ ...newTenant, floor: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Floor" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">Floor 1</SelectItem>
											<SelectItem value="2">Floor 2</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="apartment">Select Apartment *</Label>
								<Select
									onValueChange={(value) =>
										setNewTenant({ ...newTenant, apartment: value })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Apartment" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="101">Apartment 101</SelectItem>
										<SelectItem value="102">Apartment 102</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="leaseStart">Lease Start Date *</Label>
									<Input
										id="leaseStart"
										type="date"
										value={newTenant.leaseStart}
										onChange={(e) =>
											setNewTenant({
												...newTenant,
												leaseStart: e.target.value,
											})
										}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="leaseEnd">Lease End Date *</Label>
									<Input
										id="leaseEnd"
										type="date"
										value={newTenant.leaseEnd}
										onChange={(e) =>
											setNewTenant({
												...newTenant,
												leaseEnd: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="rent">Monthly Rent *</Label>
								<Input
									id="rent"
									placeholder="$1,200"
									value={newTenant.rent}
									onChange={(e) =>
										setNewTenant({ ...newTenant, rent: e.target.value })
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsAddDialogOpen(false)}
								style={{ cursor: "pointer" }}
							>
								Cancel
							</Button>
							<Button
								onClick={handleAddTenant}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80"
								style={{ cursor: "pointer" }}
							>
								Save
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
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="inactive">Inactive</SelectItem>
					</SelectContent>
				</Select>
				<Select value={apartmentFilter} onValueChange={setApartmentFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Apartment" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Filter by Apartment</SelectItem>
						<SelectItem value="101">Apartment 101</SelectItem>
						<SelectItem value="102">Apartment 102</SelectItem>
					</SelectContent>
				</Select>
				{(statusFilter !== "all" || apartmentFilter !== "all") && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setStatusFilter("all");
							setApartmentFilter("all");
						}}
						className="bg-[#ffb400] text-white hover:bg-[#ffb400]/80"
						style={{ cursor: "pointer" }}
					>
						<IconX className="mr-2 h-4 w-4" />
						CLEAR
					</Button>
				)}
				<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
					HIDE
				</Button>
			</div>

			{/* Tenants Table */}
			<Card>
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[900px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>FULL NAME</TableHead>
									<TableHead>EMAIL ADDRESS</TableHead>
									<TableHead>PHONE NUMBER</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>APARTMENT</TableHead>
									<TableHead>LEASE PERIOD</TableHead>
									<TableHead>RENT</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredTenants.map((tenant) => (
									<TableRow key={tenant.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={tenant.avatar}
														alt={tenant.fullName}
													/>
													<AvatarFallback>
														{tenant.fullName
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												{tenant.fullName}
											</div>
										</TableCell>
										<TableCell>{tenant.email}</TableCell>
										<TableCell>{tenant.phone}</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className={
													tenant.status === "Active"
														? "bg-[#1a5fd8]/20 text-[#1a5fd8]"
														: "bg-[#ffb400]/20 text-[#ffb400]"
												}
											>
												{tenant.status}
											</Badge>
										</TableCell>
										<TableCell>{tenant.apartmentNumber}</TableCell>
										<TableCell>
											<div className="text-sm">
												<div>{tenant.leaseStart}</div>
												<div className="text-muted-foreground">
													to {tenant.leaseEnd}
												</div>
											</div>
										</TableCell>
										<TableCell className="font-semibold">
											{tenant.rent}
										</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													style={{
														backgroundColor: "#ffb400",
														color: "#1a5fd8",
														borderColor: "#ffb400",
														cursor: "pointer",
													}}
												>
													<IconEdit className="mr-2 h-4 w-4" />
													UPDATE
												</Button>
												<Button
													variant="outline"
													size="sm"
													style={{
														backgroundColor: "#1a5fd8",
														color: "white",
														borderColor: "#1a5fd8",
														cursor: "pointer",
													}}
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
						style={{ cursor: "not-allowed" }}
					>
						&lt;
					</Button>
					<Button
						variant="default"
						size="sm"
						style={{
							backgroundColor: "#1a5fd8",
							color: "white",
							cursor: "pointer",
						}}
					>
						1
					</Button>
					<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
						&gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
