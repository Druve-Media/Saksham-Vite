import {
	IconCalendar,
	IconDownload,
	IconEdit,
	IconFilter,
	IconMapPin,
	IconPlus,
	IconSearch,
	IconSwimming,
	IconTrash,
	IconUsers,
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

const amenities = [
	{
		id: 1,
		name: "Swimming Pool",
		type: "Recreation",
		location: "Rooftop",
		capacity: "25 people",
		operatingHours: "6:00 AM - 10:00 PM",
		status: "Available",
		bookingFee: "$20/hour",
		description: "Olympic-size swimming pool with lounge chairs",
		lastMaintenance: "2025-09-05",
		nextMaintenance: "2025-09-20",
	},
	{
		id: 2,
		name: "Gym & Fitness Center",
		type: "Fitness",
		location: "Ground Floor",
		capacity: "15 people",
		operatingHours: "5:00 AM - 11:00 PM",
		status: "Available",
		bookingFee: "$15/hour",
		description: "Fully equipped gym with cardio and weight training equipment",
		lastMaintenance: "2025-09-08",
		nextMaintenance: "2025-09-22",
	},
	{
		id: 3,
		name: "Community Hall",
		type: "Event Space",
		location: "2nd Floor",
		capacity: "100 people",
		operatingHours: "24 hours",
		status: "Booked",
		bookingFee: "$50/hour",
		description: "Large hall for events, parties, and community gatherings",
		lastMaintenance: "2025-09-01",
		nextMaintenance: "2025-09-15",
	},
	{
		id: 4,
		name: "Children's Play Area",
		type: "Recreation",
		location: "Garden Area",
		capacity: "20 children",
		operatingHours: "6:00 AM - 8:00 PM",
		status: "Under Maintenance",
		bookingFee: "Free",
		description:
			"Safe outdoor play area with swings, slides, and climbing equipment",
		lastMaintenance: "2025-09-10",
		nextMaintenance: "2025-09-12",
	},
	{
		id: 5,
		name: "Tennis Court",
		type: "Sports",
		location: "Ground Level",
		capacity: "4 players",
		operatingHours: "6:00 AM - 9:00 PM",
		status: "Available",
		bookingFee: "$25/hour",
		description: "Professional tennis court with night lighting",
		lastMaintenance: "2025-09-06",
		nextMaintenance: "2025-09-26",
	},
	{
		id: 6,
		name: "Barbecue Area",
		type: "Recreation",
		location: "Terrace",
		capacity: "12 people",
		operatingHours: "10:00 AM - 10:00 PM",
		status: "Available",
		bookingFee: "$30/session",
		description: "Outdoor BBQ area with grills and seating",
		lastMaintenance: "2025-09-07",
		nextMaintenance: "2025-09-21",
	},
];

const amenityTypes = [
	"Recreation",
	"Fitness",
	"Event Space",
	"Sports",
	"Wellness",
];
const statuses = ["Available", "Booked", "Under Maintenance", "Out of Service"];

export default function AmenitiesPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const [form, setForm] = useState({
		name: "",
		type: "",
		location: "",
		capacity: "",
		operatingHours: "",
		bookingFee: "",
		description: "",
	});

	const handleAdd = () => {
		console.log("Adding amenity:", form);
		setIsDialogOpen(false);
		setForm({
			name: "",
			type: "",
			location: "",
			capacity: "",
			operatingHours: "",
			bookingFee: "",
			description: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting amenities data...");
	};

	const filteredAmenities = amenities.filter((amenity) => {
		const matchesSearch =
			amenity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			amenity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
			amenity.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType =
			typeFilter === "all" || amenity.type.toLowerCase() === typeFilter;
		const matchesStatus =
			statusFilter === "all" ||
			amenity.status.toLowerCase().includes(statusFilter.toLowerCase());
		return matchesSearch && matchesType && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "available":
				return "bg-[#1a5fd8]/20 text-[#1a5fd8]";
			case "booked":
				return "bg-[#1a5fd8]/10 text-[#1a5fd8]";
			case "under maintenance":
				return "bg-[#ffb400]/20 text-[#ffb400]";
			case "out of service":
				return "bg-[#ffb400]/30 text-[#ffb400]";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeIcon = (type: string) => {
		switch (type.toLowerCase()) {
			case "recreation":
				return <IconSwimming className="h-4 w-4 text-[#1a5fd8]" />;
			case "fitness":
				return <IconUsers className="h-4 w-4 text-[#1a5fd8]" />;
			case "sports":
				return <IconUsers className="h-4 w-4 text-[#ffb400]" />;
			case "event space":
				return <IconCalendar className="h-4 w-4 text-[#1a5fd8]" />;
			default:
				return <IconMapPin className="h-4 w-4 text-gray-600" />;
		}
	};

	return (
		<div className="space-y-6">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">Amenities Management</h1>
					<p className="text-muted-foreground">
						Manage community amenities and facilities
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-[#ffb400] hover:bg-[#ffb400]/80">
							<IconPlus className="mr-2 h-4 w-4" />
							Add Amenity
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-lg">
						<DialogHeader>
							<DialogTitle>Add New Amenity</DialogTitle>
							<DialogDescription>
								Add a new amenity or facility to the community.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Amenity Name *</Label>
								<Input
									id="name"
									placeholder="e.g., Swimming Pool"
									value={form.name}
									onChange={(e) =>
										setForm((f) => ({ ...f, name: e.target.value }))
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="type">Type *</Label>
									<Select
										onValueChange={(value) =>
											setForm((f) => ({ ...f, type: value }))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select Type" />
										</SelectTrigger>
										<SelectContent>
											{amenityTypes.map((type) => (
												<SelectItem key={type} value={type.toLowerCase()}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="location">Location *</Label>
									<Input
										id="location"
										placeholder="e.g., Rooftop"
										value={form.location}
										onChange={(e) =>
											setForm((f) => ({ ...f, location: e.target.value }))
										}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="capacity">Capacity *</Label>
									<Input
										id="capacity"
										placeholder="e.g., 25 people"
										value={form.capacity}
										onChange={(e) =>
											setForm((f) => ({ ...f, capacity: e.target.value }))
										}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="bookingFee">Booking Fee *</Label>
									<Input
										id="bookingFee"
										placeholder="e.g., $20/hour"
										value={form.bookingFee}
										onChange={(e) =>
											setForm((f) => ({ ...f, bookingFee: e.target.value }))
										}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="operatingHours">Operating Hours *</Label>
								<Input
									id="operatingHours"
									placeholder="e.g., 6:00 AM - 10:00 PM"
									value={form.operatingHours}
									onChange={(e) =>
										setForm((f) => ({ ...f, operatingHours: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Brief description of the amenity"
									className="min-h-[60px]"
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
								Add Amenity
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
						placeholder="Search amenities by name, location, or description"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={typeFilter} onValueChange={setTypeFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						{amenityTypes.map((type) => (
							<SelectItem key={type} value={type.toLowerCase()}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Status" />
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
								<p className="text-sm text-muted-foreground">Total Amenities</p>
								<p className="text-2xl font-bold">{amenities.length}</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/10 flex items-center justify-center">
								<IconSwimming className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Available</p>
								<p className="text-2xl font-bold text-[#1a5fd8]">
									{
										amenities.filter(
											(amenity) => amenity.status === "Available",
										).length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/20 flex items-center justify-center">
								<IconSwimming className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Booked</p>
								<p className="text-2xl font-bold text-[#1a5fd8]">
									{
										amenities.filter((amenity) => amenity.status === "Booked")
											.length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#1a5fd8]/10 flex items-center justify-center">
								<IconCalendar className="h-4 w-4 text-[#1a5fd8]" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-background border rounded-lg shadow">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Maintenance</p>
								<p className="text-2xl font-bold text-[#ffb400]">
									{
										amenities.filter(
											(amenity) => amenity.status === "Under Maintenance",
										).length
									}
								</p>
							</div>
							<div className="h-8 w-8 rounded bg-[#ffb400]/20 flex items-center justify-center">
								<IconSwimming className="h-4 w-4 text-[#ffb400]" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Amenities Table */}
			<Card className="bg-background border rounded-lg shadow">
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[1000px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>AMENITY</TableHead>
									<TableHead>TYPE</TableHead>
									<TableHead>LOCATION</TableHead>
									<TableHead>CAPACITY</TableHead>
									<TableHead>OPERATING HOURS</TableHead>
									<TableHead>BOOKING FEE</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>NEXT MAINTENANCE</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredAmenities.map((amenity) => (
									<TableRow key={amenity.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100">
													{getTypeIcon(amenity.type)}
												</div>
												<div>
													<p className="font-medium">{amenity.name}</p>
													<p className="text-sm text-muted-foreground truncate max-w-xs">
														{amenity.description}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant="outline" className="font-medium">
												{amenity.type}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1">
												<IconMapPin className="h-3 w-3 text-muted-foreground" />
												{amenity.location}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1">
												<IconUsers className="h-3 w-3 text-muted-foreground" />
												{amenity.capacity}
											</div>
										</TableCell>
										<TableCell className="text-sm">
											{amenity.operatingHours}
										</TableCell>
										<TableCell className="font-semibold">
											{amenity.bookingFee}
										</TableCell>
										<TableCell>
											<Badge className={getStatusColor(amenity.status)}>
												{amenity.status}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1 text-sm">
												<IconCalendar className="h-3 w-3" />
												{amenity.nextMaintenance}
											</div>
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
					Showing 1 to {filteredAmenities.length} of {filteredAmenities.length}{" "}
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
