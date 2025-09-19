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

const owners = [
	{
		id: 1,
		fullName: "Owner",
		email: "owner@example.com",
		phone: "(555) 123-4567",
		status: "Active",
		apartmentNumber: "101",
		avatar: "/avatars/owner.jpg",
	},
	{
		id: 2,
		fullName: "Owner",
		email: "owner1@example.com",
		phone: "(555) 123-4567",
		status: "Active",
		apartmentNumber: "102",
		avatar: "/avatars/owner1.jpg",
	},
	{
		id: 3,
		fullName: "John Doe",
		email: "john.doe1@example.com",
		phone: "(555) 123-4567",
		status: "Active",
		apartmentNumber: "104",
		avatar: "/avatars/john-doe.jpg",
	},
	{
		id: 4,
		fullName: "Mary Johnson",
		email: "mary.johnson.1@example.com",
		phone: "(555) 234-5678",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/mary.jpg",
	},
	{
		id: 5,
		fullName: "Robert Williams",
		email: "robert.williams.1@example.com",
		phone: "(555) 345-6789",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/robert.jpg",
	},
	{
		id: 6,
		fullName: "Patricia Brown",
		email: "patricia.brown.1@example.com",
		phone: "(555) 456-7890",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/patricia.jpg",
	},
	{
		id: 7,
		fullName: "Michael Davis",
		email: "michael.davis.1@example.com",
		phone: "(555) 567-8901",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/michael.jpg",
	},
	{
		id: 8,
		fullName: "Jennifer Garcia",
		email: "jennifer.garcia.1@example.com",
		phone: "(555) 678-9012",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/jennifer.jpg",
	},
	{
		id: 9,
		fullName: "James Miller",
		email: "james.miller.1@example.com",
		phone: "(555) 789-0123",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/james.jpg",
	},
	{
		id: 10,
		fullName: "Linda Martinez",
		email: "linda.martinez.1@example.com",
		phone: "(555) 890-1234",
		status: "Active",
		apartmentNumber: "--",
		avatar: "/avatars/linda.jpg",
	},
];

export default function OwnersPage() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [apartmentFilter, setApartmentFilter] = useState("all");

	const [newOwner, setNewOwner] = useState({
		fullName: "",
		email: "",
		phone: "",
		wing: "",
		floor: "",
		apartment: "",
	});

	const handleAddOwner = () => {
		console.log("Adding owner:", newOwner);
		setIsAddDialogOpen(false);
		setNewOwner({
			fullName: "",
			email: "",
			phone: "",
			wing: "",
			floor: "",
			apartment: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting owners data...");
	};

	const filteredOwners = owners.filter((owner) => {
		const matchesSearch =
			owner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			owner.phone.includes(searchTerm);
		const matchesStatus =
			statusFilter === "all" || owner.status.toLowerCase() === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			{/* Search and Actions Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search user by name, email or phone number"
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
							style={{
								backgroundColor: "#ffb400",
								color: "#1a5fd8",
								border: "none",
								cursor: "pointer",
							}}
						>
							<IconPlus className="mr-2 h-4 w-4" />
							Add
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>Add New Owner</DialogTitle>
							<DialogDescription>
								Enter the details for the new owner below.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="fullName">Full Name *</Label>
								<Input
									id="fullName"
									value={newOwner.fullName}
									onChange={(e) =>
										setNewOwner({ ...newOwner, fullName: e.target.value })
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email Address *</Label>
								<Input
									id="email"
									type="email"
									value={newOwner.email}
									onChange={(e) =>
										setNewOwner({ ...newOwner, email: e.target.value })
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
										value={newOwner.phone}
										onChange={(e) =>
											setNewOwner({ ...newOwner, phone: e.target.value })
										}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="wing">Select Wing *</Label>
									<Select
										onValueChange={(value) =>
											setNewOwner({ ...newOwner, wing: value })
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
											setNewOwner({ ...newOwner, floor: value })
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
										setNewOwner({ ...newOwner, apartment: value })
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
								onClick={handleAddOwner}
								style={{
									backgroundColor: "#ffb400",
									color: "#1a5fd8",
									border: "none",
									cursor: "pointer",
								}}
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
						style={{
							backgroundColor: "#ffb400",
							color: "#1a5fd8",
							border: "none",
							cursor: "pointer",
						}}
					>
						<IconX className="mr-2 h-4 w-4" />
						CLEAR
					</Button>
				)}
				<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
					HIDE
				</Button>
			</div>

			{/* Owners Table */}
			<Card>
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>FULL NAME</TableHead>
									<TableHead>EMAIL ADDRESS</TableHead>
									<TableHead>PHONE NUMBER</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>APARTMENT NUMBER</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredOwners.map((owner) => (
									<TableRow key={owner.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage
														src={owner.avatar}
														alt={owner.fullName}
													/>
													<AvatarFallback>
														{owner.fullName
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												{owner.fullName}
											</div>
										</TableCell>
										<TableCell>{owner.email}</TableCell>
										<TableCell>{owner.phone}</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className="bg-[#1a5fd8]/20 text-[#1a5fd8]"
											>
												{owner.status}
											</Badge>
										</TableCell>
										<TableCell>{owner.apartmentNumber}</TableCell>
										<TableCell>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													style={{
														backgroundColor: "#1a5fd8",
														color: "#fff",
														border: "none",
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
														backgroundColor: "#ffb400",
														color: "#1a5fd8",
														border: "none",
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
					Showing 1 to 10 of 12 results
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
							color: "#fff",
							cursor: "pointer",
						}}
					>
						1
					</Button>
					<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
						2
					</Button>
					<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
						&gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
