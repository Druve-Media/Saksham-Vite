import {
	IconDownload,
	IconEdit,
	IconFilter,
	IconHome,
	IconPlus,
	IconSearch,
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

const apartments = [
	{
		id: 1,
		apartmentNumber: "101",
		wing: "Wing A",
		floor: "1st Floor",
		type: "2 BHK",
		area: "1,200 sq ft",
		rent: "₹1,200",
		status: "Occupied",
		owner: "John Smith",
		tenant: "Alice Johnson",
	},
	{
		id: 2,
		apartmentNumber: "102",
		wing: "Wing A",
		floor: "1st Floor",
		type: "3 BHK",
		area: "1,500 sq ft",
		rent: "₹1,500",
		status: "Occupied",
		owner: "Jane Doe",
		tenant: "Bob Wilson",
	},
	{
		id: 3,
		apartmentNumber: "201",
		wing: "Wing A",
		floor: "2nd Floor",
		type: "2 BHK",
		area: "1,200 sq ft",
		rent: "₹1,200",
		status: "Vacant",
		owner: "Mike Johnson",
		tenant: "--",
	},
	{
		id: 4,
		apartmentNumber: "301",
		wing: "Wing B",
		floor: "3rd Floor",
		type: "3 BHK",
		area: "1,600 sq ft",
		rent: "₹1,600",
		status: "Occupied",
		owner: "Sarah Brown",
		tenant: "David Lee",
	},
	{
		id: 5,
		apartmentNumber: "401",
		wing: "Wing B",
		floor: "4th Floor",
		type: "1 BHK",
		area: "800 sq ft",
		rent: "₹900",
		status: "Vacant",
		owner: "Emma Davis",
		tenant: "--",
	},
];

export default function ApartmentsPage() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [wingFilter, setWingFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");

	const [newApartment, setNewApartment] = useState({
		apartmentNumber: "",
		wing: "",
		floor: "",
		type: "",
		area: "",
		rent: "",
		description: "",
	});

	const handleAddApartment = () => {
		console.log("Adding apartment:", newApartment);
		setIsAddDialogOpen(false);
		setNewApartment({
			apartmentNumber: "",
			wing: "",
			floor: "",
			type: "",
			area: "",
			rent: "",
			description: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting apartments data...");
	};

	const filteredApartments = apartments.filter((apartment) => {
		const matchesSearch =
			apartment.apartmentNumber
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			apartment.wing.toLowerCase().includes(searchTerm.toLowerCase()) ||
			apartment.owner.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || apartment.status.toLowerCase() === statusFilter;
		const matchesWing =
			wingFilter === "all" ||
			apartment.wing.toLowerCase().replace(" ", "-") === wingFilter;
		const matchesType =
			typeFilter === "all" ||
			apartment.type.toLowerCase().replace(" ", "-") === typeFilter;
		return matchesSearch && matchesStatus && matchesWing && matchesType;
	});

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			{/* Search and Actions Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search apartment by number, wing, or owner"
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
							<DialogTitle>Add New Apartment</DialogTitle>
							<DialogDescription>
								Enter the details for the new apartment below.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="apartmentNumber">Apartment Number *</Label>
									<Input
										id="apartmentNumber"
										placeholder="101"
										value={newApartment.apartmentNumber}
										onChange={(e) =>
											setNewApartment({
												...newApartment,
												apartmentNumber: e.target.value,
											})
										}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="wing">Wing *</Label>
									<Select
										onValueChange={(value) =>
											setNewApartment({ ...newApartment, wing: value })
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
									<Label htmlFor="floor">Floor *</Label>
									<Select
										onValueChange={(value) =>
											setNewApartment({ ...newApartment, floor: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Floor" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">1st Floor</SelectItem>
											<SelectItem value="2">2nd Floor</SelectItem>
											<SelectItem value="3">3rd Floor</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="type">Apartment Type *</Label>
									<Select
										onValueChange={(value) =>
											setNewApartment({ ...newApartment, type: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1bhk">1 BHK</SelectItem>
											<SelectItem value="2bhk">2 BHK</SelectItem>
											<SelectItem value="3bhk">3 BHK</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="area">Area (sq ft) *</Label>
									<Input
										id="area"
										placeholder="1,200"
										value={newApartment.area}
										onChange={(e) =>
											setNewApartment({
												...newApartment,
												area: e.target.value,
											})
										}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="rent">Expected Rent *</Label>
									<Input
										id="rent"
										placeholder="₹1,200"
										value={newApartment.rent}
										onChange={(e) =>
											setNewApartment({
												...newApartment,
												rent: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Input
									id="description"
									placeholder="Brief description of the apartment"
									value={newApartment.description}
									onChange={(e) =>
										setNewApartment({
											...newApartment,
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
								style={{ cursor: "pointer" }}
							>
								Cancel
							</Button>
							<Button
								onClick={handleAddApartment}
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
						<SelectItem value="occupied">Occupied</SelectItem>
						<SelectItem value="vacant">Vacant</SelectItem>
					</SelectContent>
				</Select>
				<Select value={wingFilter} onValueChange={setWingFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Wing" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Filter by Wing</SelectItem>
						<SelectItem value="wing-a">Wing A</SelectItem>
						<SelectItem value="wing-b">Wing B</SelectItem>
					</SelectContent>
				</Select>
				<Select value={typeFilter} onValueChange={setTypeFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Filter by Type</SelectItem>
						<SelectItem value="1-bhk">1 BHK</SelectItem>
						<SelectItem value="2-bhk">2 BHK</SelectItem>
						<SelectItem value="3-bhk">3 BHK</SelectItem>
					</SelectContent>
				</Select>
				{(statusFilter !== "all" ||
					wingFilter !== "all" ||
					typeFilter !== "all") && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setStatusFilter("all");
							setWingFilter("all");
							setTypeFilter("all");
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

			{/* Apartments Table */}
			<Card>
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>APARTMENT</TableHead>
									<TableHead>TOWER</TableHead>
									<TableHead>FLOOR</TableHead>
									<TableHead>TYPE</TableHead>
									<TableHead>AREA</TableHead>
									<TableHead>RENT</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>OWNER</TableHead>
									<TableHead>TENANT</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredApartments.map((apartment) => (
									<TableRow key={apartment.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded bg-[#1a5fd8]/10">
													<IconHome className="h-4 w-4 text-[#1a5fd8]" />
												</div>
												<span className="font-medium">
													{apartment.apartmentNumber}
												</span>
											</div>
										</TableCell>
										<TableCell>{apartment.wing}</TableCell>
										<TableCell>{apartment.floor}</TableCell>
										<TableCell>{apartment.type}</TableCell>
										<TableCell>{apartment.area}</TableCell>
										<TableCell className="font-semibold">
											{apartment.rent}
										</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className={
													apartment.status === "Occupied"
														? "bg-[#1a5fd8]/20 text-[#1a5fd8]"
														: "bg-[#ffb400]/20 text-[#ffb400]"
												}
											>
												{apartment.status}
											</Badge>
										</TableCell>
										<TableCell>{apartment.owner}</TableCell>
										<TableCell>
											{apartment.tenant === "--" ? (
												<span className="text-muted-foreground">--</span>
											) : (
												apartment.tenant
											)}
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
