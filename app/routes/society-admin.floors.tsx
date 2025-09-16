import {
	IconDownload,
	IconEdit,
	IconFilter,
	IconHome,
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

const floors = [
	{
		id: 1,
		floorNumber: "Ground Floor",
		tower: "Tower A",
		totalApartments: 6,
		occupiedApartments: 4,
		vacantApartments: 2,
		status: "Active",
		description: "Ground floor with commercial spaces",
	},
	{
		id: 2,
		floorNumber: "1st Floor",
		tower: "Tower A",
		totalApartments: 8,
		occupiedApartments: 7,
		vacantApartments: 1,
		status: "Active",
		description: "Residential floor with 2BHK and 3BHK units",
	},
	{
		id: 3,
		floorNumber: "2nd Floor",
		tower: "Tower A",
		totalApartments: 8,
		occupiedApartments: 8,
		vacantApartments: 0,
		status: "Active",
		description: "Fully occupied residential floor",
	},
	{
		id: 4,
		floorNumber: "3rd Floor",
		tower: "Tower B",
		totalApartments: 6,
		occupiedApartments: 3,
		vacantApartments: 3,
		status: "Under Maintenance",
		description: "Floor under renovation",
	},
	{
		id: 5,
		floorNumber: "4th Floor",
		tower: "Tower B",
		totalApartments: 8,
		occupiedApartments: 6,
		vacantApartments: 2,
		status: "Active",
		description: "Premium floor with balcony view",
	},
];

export default function FloorsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [towerFilter, setTowerFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const [form, setForm] = useState({
		floorNumber: "",
		tower: "",
		totalApartments: "",
		description: "",
	});

	const handleAdd = () => {
		console.log("Adding floor:", form);
		setIsDialogOpen(false);
		setForm({
			floorNumber: "",
			tower: "",
			totalApartments: "",
			description: "",
		});
	};

	const handleExport = () => {
		console.log("Exporting floors data...");
	};

	const filteredFloors = floors.filter((floor) => {
		const matchesSearch =
			floor.floorNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			floor.tower.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesTowre =
			towerFilter === "all" || floor.tower.toLowerCase().includes(towerFilter);
		const matchesStatus =
			statusFilter === "all" ||
			floor.status.toLowerCase().includes(statusFilter);
		return matchesSearch && matchesTowre && matchesStatus;
	});

	return (
		<div className="space-y-6">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Floors</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-red-600 hover:bg-red-700">
							<IconPlus className="mr-2 h-4 w-4" />
							Add Floor
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Add Floor</DialogTitle>
							<DialogDescription>
								Enter details for the new floor.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="floorNumber">Floor Number *</Label>
								<Input
									id="floorNumber"
									placeholder="e.g., 5th Floor"
									value={form.floorNumber}
									onChange={(e) =>
										setForm((f) => ({ ...f, floorNumber: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="tower">Tower *</Label>
								<Select
									onValueChange={(value) =>
										setForm((f) => ({ ...f, tower: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Tower" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="tower-a">Tower A</SelectItem>
										<SelectItem value="tower-b">Tower B</SelectItem>
										<SelectItem value="tower-c">Tower C</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="totalApartments">Total Apartments *</Label>
								<Input
									id="totalApartments"
									placeholder="e.g., 8"
									value={form.totalApartments}
									onChange={(e) =>
										setForm((f) => ({ ...f, totalApartments: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="description">Description</Label>
								<Input
									id="description"
									placeholder="Floor description"
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
						placeholder="Search floor by number or tower"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={towerFilter} onValueChange={setTowerFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Tower" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Towers</SelectItem>
						<SelectItem value="tower a">Tower A</SelectItem>
						<SelectItem value="tower b">Tower B</SelectItem>
						<SelectItem value="tower c">Tower C</SelectItem>
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="under maintenance">Under Maintenance</SelectItem>
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

			{/* Floors Table */}
			<Card className="bg-background border rounded-lg shadow">
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<input type="checkbox" className="rounded" />
									</TableHead>
									<TableHead>FLOOR</TableHead>
									<TableHead>TOWER</TableHead>
									<TableHead>TOTAL APARTMENTS</TableHead>
									<TableHead>OCCUPIED</TableHead>
									<TableHead>VACANT</TableHead>
									<TableHead>STATUS</TableHead>
									<TableHead>DESCRIPTION</TableHead>
									<TableHead>ACTION</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredFloors.map((floor) => (
									<TableRow key={floor.id}>
										<TableCell>
											<input type="checkbox" className="rounded" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded bg-[#1a5fd8]/10">
													<IconHome className="h-4 w-4 text-blue-600" />
												</div>
												<span className="font-medium">{floor.floorNumber}</span>
											</div>
										</TableCell>
										<TableCell>{floor.tower}</TableCell>
										<TableCell className="font-semibold">
											{floor.totalApartments}
										</TableCell>
										<TableCell>
											<span className="text-green-600 font-medium">
												{floor.occupiedApartments}
											</span>
										</TableCell>
										<TableCell>
											<span className="text-orange-600 font-medium">
												{floor.vacantApartments}
											</span>
										</TableCell>
										<TableCell>
											<Badge
												variant="secondary"
												className={
													floor.status === "Active"
														? "bg-[#1a5fd8]/20 text-[#1a5fd8]"
														: "bg-[#ffb400]/20 text-[#ffb400]"
												}
											>
												{floor.status}
											</Badge>
										</TableCell>
										<TableCell className="max-w-xs truncate">
											{floor.description}
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
					Showing 1 to {filteredFloors.length} of {filteredFloors.length}{" "}
					results
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
