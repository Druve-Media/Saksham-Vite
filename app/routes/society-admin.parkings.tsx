import {
	IconCar,
	IconDownload,
	IconEdit,
	IconFilter,
	IconMotorbike,
	IconPlus,
	IconSearch,
	IconTrash,
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

const parkingSpots = [
	{
		id: 1,
		spotNumber: "A-001",
		level: "Ground Level",
		type: "Car",
		status: "Occupied",
		assignedTo: "John Smith",
		apartmentNumber: "101",
		vehicleNumber: "MH-12-AB-1234",
		monthlyFee: "$50",
	},
	{
		id: 2,
		spotNumber: "A-002",
		level: "Ground Level",
		type: "Car",
		status: "Available",
		assignedTo: "--",
		apartmentNumber: "--",
		vehicleNumber: "--",
		monthlyFee: "$50",
	},
	{
		id: 3,
		spotNumber: "B-001",
		level: "Basement 1",
		type: "Bike",
		status: "Occupied",
		assignedTo: "Jane Doe",
		apartmentNumber: "102",
		vehicleNumber: "MH-12-CD-5678",
		monthlyFee: "$20",
	},
	{
		id: 4,
		spotNumber: "B-002",
		level: "Basement 1",
		type: "Car",
		status: "Reserved",
		assignedTo: "Mike Johnson",
		apartmentNumber: "201",
		vehicleNumber: "MH-12-EF-9012",
		monthlyFee: "$60",
	},
	{
		id: 5,
		spotNumber: "C-001",
		level: "Basement 2",
		type: "Car",
		status: "Available",
		assignedTo: "--",
		apartmentNumber: "--",
		vehicleNumber: "--",
		monthlyFee: "$55",
	},
	{
		id: 6,
		spotNumber: "D-001",
		level: "Ground Level",
		type: "Bike",
		status: "Occupied",
		assignedTo: "Sarah Brown",
		apartmentNumber: "301",
		vehicleNumber: "MH-12-GH-3456",
		monthlyFee: "$25",
	},
];

export default function ParkingsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [levelFilter, setLevelFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const [form, setForm] = useState({
		spotNumber: "",
		level: "",
		type: "",
		monthlyFee: "",
		description: "",
	});

	const handleAdd = () => {
		console.log("Adding parking spot:", form);
		setIsDialogOpen(false);
		setForm({
			spotNumber: "",
			level: "",
			type: "",
			monthlyFee: "",
			description: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting parking data...");
	};

	const filteredParkingSpots = parkingSpots.filter((spot) => {
		const matchesSearch =
			spot.spotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			spot.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
			spot.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesLevel =
			levelFilter === "all" || spot.level.toLowerCase().includes(levelFilter);
		const matchesType =
			typeFilter === "all" || spot.type.toLowerCase() === typeFilter;
		const matchesStatus =
			statusFilter === "all" || spot.status.toLowerCase() === statusFilter;
		return matchesSearch && matchesLevel && matchesType && matchesStatus;
	});

	return (
		<div className="space-y-6">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Parking Management</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-red-600 hover:bg-red-700">
							<IconPlus className="mr-2 h-4 w-4" />
							Add Parking Spot
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Add Parking Spot</DialogTitle>
							<DialogDescription>
								Enter details for the new parking spot.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="spotNumber">Spot Number *</Label>
								<Input
									id="spotNumber"
									placeholder="e.g., A-001"
									value={form.spotNumber}
									onChange={(e) =>
										setForm((f) => ({ ...f, spotNumber: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="level">Level *</Label>
								<Select
									onValueChange={(value) =>
										setForm((f) => ({ ...f, level: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Level" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ground">Ground Level</SelectItem>
										<SelectItem value="basement1">Basement 1</SelectItem>
										<SelectItem value="basement2">Basement 2</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="type">Vehicle Type *</Label>
								<Select
									onValueChange={(value) =>
										setForm((f) => ({ ...f, type: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="car">Car</SelectItem>
										<SelectItem value="bike">Bike</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="monthlyFee">Monthly Fee *</Label>
								<Input
									id="monthlyFee"
									placeholder="e.g., $50"
									value={form.monthlyFee}
									onChange={(e) =>
										setForm((f) => ({ ...f, monthlyFee: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Input
									id="description"
									placeholder="Additional notes"
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
								className="bg-red-600 hover:bg-red-700"
							>
								Add
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
						placeholder="Search by spot number, assignee, or vehicle number"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={levelFilter} onValueChange={setLevelFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Level" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Levels</SelectItem>
						<SelectItem value="ground">Ground Level</SelectItem>
						<SelectItem value="basement 1">Basement 1</SelectItem>
						<SelectItem value="basement 2">Basement 2</SelectItem>
					</SelectContent>
				</Select>
				<Select value={typeFilter} onValueChange={setTypeFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="car">Car</SelectItem>
						<SelectItem value="bike">Bike</SelectItem>
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="occupied">Occupied</SelectItem>
						<SelectItem value="available">Available</SelectItem>
						<SelectItem value="reserved">Reserved</SelectItem>
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
								<p className="text-sm text-muted-foreground">Total Spots</p>
								<p className="text-2xl font-bold">{parkingSpots.length}</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/10 flex items-center justify-center">
								<IconCar className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Occupied</p>
								<p className="text-2xl font-bold text-green-600">
									{
										parkingSpots.filter((spot) => spot.status === "Occupied")
											.length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
								<IconCar className="h-4 w-4 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Available</p>
								<p className="text-2xl font-bold text-orange-600">
									{
										parkingSpots.filter((spot) => spot.status === "Available")
											.length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#ffb400]/20 flex items-center justify-center">
								<IconCar className="h-4 w-4 text-orange-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Reserved</p>
								<p className="text-2xl font-bold text-blue-600">
									{
										parkingSpots.filter((spot) => spot.status === "Reserved")
											.length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
								<IconCar className="h-4 w-4 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Parking Spots Table */}
			<Card className="bg-background border rounded-lg shadow">
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[900px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>SPOT NUMBER</TableHead>
									<TableHead>LEVEL</TableHead>
									<TableHead>TYPE</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>ASSIGNED TO</TableHead>
									<TableHead>APARTMENT</TableHead>
									<TableHead>VEHICLE NUMBER</TableHead>
									<TableHead>MONTHLY FEE</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredParkingSpots.map((spot) => (
									<TableRow key={spot.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded bg-purple-100">
													{spot.type === "Car" ? (
														<IconCar className="h-4 w-4 text-purple-600" />
													) : (
														<IconMotorbike className="h-4 w-4 text-purple-600" />
													)}
												</div>
												<span className="font-medium">{spot.spotNumber}</span>
											</div>
										</TableCell>
										<TableCell>{spot.level}</TableCell>
										<TableCell>
											<Badge variant="outline" className="font-medium">
												{spot.type}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className={
													spot.status === "Occupied"
														? "bg-green-100 text-green-800"
														: spot.status === "Available"
															? "bg-[#ffb400]/20 text-[#ffb400]"
															: "bg-[#1a5fd8]/10 text-[#1a5fd8]"
												}
											>
												{spot.status}
											</Badge>
										</TableCell>
										<TableCell>
											{spot.assignedTo === "--" ? (
												<span className="text-muted-foreground">--</span>
											) : (
												spot.assignedTo
											)}
										</TableCell>
										<TableCell>
											{spot.apartmentNumber === "--" ? (
												<span className="text-muted-foreground">--</span>
											) : (
												spot.apartmentNumber
											)}
										</TableCell>
										<TableCell>
											{spot.vehicleNumber === "--" ? (
												<span className="text-muted-foreground">--</span>
											) : (
												<span className="font-mono text-sm">
													{spot.vehicleNumber}
												</span>
											)}
										</TableCell>
										<TableCell className="font-semibold">
											{spot.monthlyFee}
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
					Showing 1 to {filteredParkingSpots.length} of{" "}
					{filteredParkingSpots.length} results
				</p>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" disabled>
						&lt;
					</Button>
					<Button variant="default" size="sm" className="bg-[#1a5fd8]">
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
