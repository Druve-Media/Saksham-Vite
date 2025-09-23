// import {
// 	IconBuilding,
// 	IconDownload,
// 	IconEdit,
// 	IconFilter,
// 	IconPlus,
// 	IconSearch,
// 	IconTrash,
// 	IconX,
// } from "@tabler/icons-react";
// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";

// const wings = [
// 	{
// 		id: 1,
// 		wingName: "Wing A",
// 		totalFloors: 25,
// 		totalApartments: 100,
// 		occupiedApartments: 85,
// 		vacantApartments: 15,
// 		status: "Active",
// 		constructionYear: "2020",
// 		description: "Modern residential wing with luxury amenities",
// 	},
// 	{
// 		id: 2,
// 		wingName: "Wing B",
// 		totalFloors: 30,
// 		totalApartments: 120,
// 		occupiedApartments: 95,
// 		vacantApartments: 25,
// 		status: "Active",
// 		constructionYear: "2021",
// 		description: "Premium wing with panoramic city views",
// 	},
// 	{
// 		id: 3,
// 		wingName: "Wing C",
// 		totalFloors: 20,
// 		totalApartments: 80,
// 		occupiedApartments: 60,
// 		vacantApartments: 20,
// 		status: "Under Construction",
// 		constructionYear: "2024",
// 		description: "New wing with smart home features",
// 	},
// ];

// export default function WingsPage() {
// 	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [statusFilter, setStatusFilter] = useState("all");

// 	const [newWing, setNewWing] = useState({
// 		wingName: "",
// 		totalFloors: "",
// 		totalApartments: "",
// 		constructionYear: "",
// 		description: "",
// 	});

// 	const handleAddWing = () => {
// 		console.log("Adding wing:", newWing);
// 		setIsAddDialogOpen(false);
// 		setNewWing({
// 			wingName: "",
// 			totalFloors: "",
// 			totalApartments: "",
// 			constructionYear: "",
// 			description: "",
// 		});
// 	};

// 	const handleExport = () => {
// 		console.log("Exporting wings data...");
// 	};

// 	const filteredWings = wings.filter((wing) => {
// 		const matchesSearch =
// 			wing.wingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			wing.description.toLowerCase().includes(searchTerm.toLowerCase());
// 		const matchesStatus =
// 			statusFilter === "all" ||
// 			wing.status.toLowerCase().replace(" ", "-") === statusFilter;
// 		return matchesSearch && matchesStatus;
// 	});

// 	return (
// 		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
// 			{/* Search and Actions Bar */}
// 			<div className="flex items-center gap-4">
// 				<div className="relative flex-1">
// 					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// 					<Input
// 						placeholder="Search wing by name or description"
// 						className="pl-10"
// 						value={searchTerm}
// 						onChange={(e) => setSearchTerm(e.target.value)}
// 					/>
// 				</div>
// 				<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
// 					<IconFilter className="mr-2 h-4 w-4" style={{ color: "#1a5fd8" }} />
// 					FILTERS
// 				</Button>
// 				<Button
// 					variant="outline"
// 					size="sm"
// 					onClick={handleExport}
// 					style={{ cursor: "pointer" }}
// 				>
// 					<IconDownload className="mr-2 h-4 w-4" style={{ color: "#1a5fd8" }} />
// 					Export
// 				</Button>
// 				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
// 					<DialogTrigger asChild>
// 						<Button
// 							size="sm"
// 							style={{
// 								backgroundColor: "#ffb400",
// 								color: "#1a5fd8",
// 								border: "none",
// 								cursor: "pointer",
// 							}}
// 						>
// 							<IconPlus className="mr-2 h-4 w-4" />
// 							Add
// 						</Button>
// 					</DialogTrigger>
// 					<DialogContent className="sm:max-w-[500px]">
// 						<DialogHeader>
// 							<DialogTitle>Add New Wing</DialogTitle>
// 							<DialogDescription>
// 								Enter the details for the new wing below.
// 							</DialogDescription>
// 						</DialogHeader>
// 						<div className="grid gap-4 py-4">
// 							<div className="grid gap-2">
// 								<Label htmlFor="wingName">Wing Name *</Label>
// 								<Input
// 									id="wingName"
// 									placeholder="e.g., Wing A"
// 									value={newWing.wingName}
// 									onChange={(e) =>
// 										setNewWing({ ...newWing, wingName: e.target.value })
// 									}
// 								/>
// 							</div>
// 							<div className="grid grid-cols-2 gap-4">
// 								<div className="grid gap-2">
// 									<Label htmlFor="totalFloors">Total Floors *</Label>
// 									<Input
// 										id="totalFloors"
// 										type="number"
// 										placeholder="25"
// 										value={newWing.totalFloors}
// 										onChange={(e) =>
// 											setNewWing({
// 												...newWing,
// 												totalFloors: e.target.value,
// 											})
// 										}
// 									/>
// 								</div>
// 								<div className="grid gap-2">
// 									<Label htmlFor="totalApartments">Total Apartments *</Label>
// 									<Input
// 										id="totalApartments"
// 										type="number"
// 										placeholder="100"
// 										value={newWing.totalApartments}
// 										onChange={(e) =>
// 											setNewWing({
// 												...newWing,
// 												totalApartments: e.target.value,
// 											})
// 										}
// 									/>
// 								</div>
// 							</div>
// 							<div className="grid gap-2">
// 								<Label htmlFor="constructionYear">Construction Year *</Label>
// 								<Input
// 									id="constructionYear"
// 									placeholder="2024"
// 									value={newWing.constructionYear}
// 									onChange={(e) =>
// 										setNewWing({
// 											...newWing,
// 											constructionYear: e.target.value,
// 										})
// 									}
// 								/>
// 							</div>
// 							<div className="grid gap-2">
// 								<Label htmlFor="description">Description</Label>
// 								<Input
// 									id="description"
// 									placeholder="Brief description of the wing"
// 									value={newWing.description}
// 									onChange={(e) =>
// 										setNewWing({
// 											...newWing,
// 											description: e.target.value,
// 										})
// 									}
// 								/>
// 							</div>
// 						</div>
// 						<DialogFooter>
// 							<Button
// 								variant="outline"
// 								onClick={() => setIsAddDialogOpen(false)}
// 								style={{ cursor: "pointer" }}
// 							>
// 								Cancel
// 							</Button>
// 							<Button
// 								onClick={handleAddWing}
// 								style={{
// 									backgroundColor: "#ffb400",
// 									color: "#1a5fd8",
// 									border: "none",
// 									cursor: "pointer",
// 								}}
// 							>
// 								Save
// 							</Button>
// 						</DialogFooter>
// 					</DialogContent>
// 				</Dialog>
// 			</div>

// 			{/* Filters Bar */}
// 			<div className="flex items-center gap-4">
// 				<Select value={statusFilter} onValueChange={setStatusFilter}>
// 					<SelectTrigger className="w-40">
// 						<SelectValue placeholder="Filter by Status" />
// 					</SelectTrigger>
// 					<SelectContent>
// 						<SelectItem value="all">Filter by Status</SelectItem>
// 						<SelectItem value="active">Active</SelectItem>
// 						<SelectItem value="under-construction">
// 							Under Construction
// 						</SelectItem>
// 					</SelectContent>
// 				</Select>
// 				{statusFilter !== "all" && (
// 					<Button
// 						variant="outline"
// 						size="sm"
// 						onClick={() => setStatusFilter("all")}
// 						style={{
// 							backgroundColor: "#ffb400",
// 							color: "#1a5fd8",
// 							border: "none",
// 							cursor: "pointer",
// 						}}
// 					>
// 						<IconX className="mr-2 h-4 w-4" />
// 						CLEAR
// 					</Button>
// 				)}
// 				<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
// 					HIDE
// 				</Button>
// 			</div>

// 			{/* Wings Table */}
// 			<Card>
// 				<CardContent className="p-0">
// 					{/* Only the table is horizontally scrollable for responsiveness */}
// 					<div className="overflow-x-auto w-full">
// 						<Table className="min-w-[700px]">
// 							<TableHeader>
// 								<TableRow>
// 									<TableHead className="w-12">
// 										<input type="checkbox" className="rounded" />
// 									</TableHead>
// 									<TableHead>TOWER NAME</TableHead>
// 									<TableHead>FLOORS</TableHead>
// 									<TableHead>APARTMENTS</TableHead>
// 									<TableHead>OCCUPANCY</TableHead>
// 									<TableHead>STATUS</TableHead>
// 									<TableHead>BUILT YEAR</TableHead>
// 									<TableHead>ACTION</TableHead>
// 								</TableRow>
// 							</TableHeader>
// 							<TableBody>
// 								{filteredWings.map((wing) => (
// 									<TableRow key={wing.id}>
// 										<TableCell>
// 											<input type="checkbox" className="rounded" />
// 										</TableCell>
// 										<TableCell>
// 											<div className="flex items-center gap-3">
// 												<div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
// 													<IconBuilding
// 														className="h-5 w-5"
// 														style={{ color: "#1a5fd8" }}
// 													/>
// 												</div>
// 												<div>
// 													<div className="font-medium">{wing.wingName}</div>
// 													<div className="text-sm text-muted-foreground">
// 														{wing.description}
// 													</div>
// 												</div>
// 											</div>
// 										</TableCell>
// 										<TableCell>{wing.totalFloors}</TableCell>
// 										<TableCell>{wing.totalApartments}</TableCell>
// 										<TableCell>
// 											<div className="text-sm">
// 												<div
// 													style={{ color: "#1a5fd8" }}
// 													className="font-medium"
// 												>
// 													{wing.occupiedApartments} Occupied
// 												</div>
// 												<div style={{ color: "#ffb400" }}>
// 													{wing.vacantApartments} Vacant
// 												</div>
// 											</div>
// 										</TableCell>
// 										<TableCell>
// 											<Badge
// 												style={{
// 													backgroundColor:
// 														wing.status === "Active" ? "#1a5fd8" : "#ffb400",
// 													color: wing.status === "Active" ? "#fff" : "#1a5fd8",
// 												}}
// 											>
// 												{wing.status}
// 											</Badge>
// 										</TableCell>
// 										<TableCell>{wing.constructionYear}</TableCell>
// 										<TableCell>
// 											<div className="flex gap-2">
// 												<Button
// 													variant="outline"
// 													size="sm"
// 													style={{
// 														backgroundColor: "#1a5fd8",
// 														color: "#fff",
// 														border: "none",
// 														cursor: "pointer",
// 													}}
// 												>
// 													<IconEdit className="mr-2 h-4 w-4" />
// 													UPDATE
// 												</Button>
// 												<Button
// 													variant="outline"
// 													size="sm"
// 													style={{
// 														backgroundColor: "#ffb400",
// 														color: "#1a5fd8",
// 														border: "none",
// 														cursor: "pointer",
// 													}}
// 												>
// 													<IconTrash className="h-4 w-4" />
// 												</Button>
// 											</div>
// 										</TableCell>
// 									</TableRow>
// 								))}
// 							</TableBody>
// 						</Table>
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Pagination */}
// 			<div className="flex items-center justify-between">
// 				<p className="text-sm text-muted-foreground">
// 					Showing 1 to 3 of 3 results
// 				</p>
// 				<div className="flex items-center gap-2">
// 					<Button
// 						variant="outline"
// 						size="sm"
// 						disabled
// 						style={{ cursor: "not-allowed" }}
// 					>
// 						&lt;
// 					</Button>
// 					<Button
// 						variant="default"
// 						size="sm"
// 						style={{
// 							backgroundColor: "#1a5fd8",
// 							color: "#fff",
// 							cursor: "pointer",
// 						}}
// 					>
// 						1
// 					</Button>
// 					<Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
// 						&gt;
// 					</Button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import { useState } from "react";
import { type Column, DataTable } from "@/components/DataTable";
import { RowActionsMenu } from "@/components/Wings/ActionMenu";
import { PageSize } from "@/enums/pagination/pagination";
import { useGetWings, type Wing } from "@/hooks/wings/useGetWings";

export default function WingsPage() {
	const [page, setPage] = useState(1);
	const perPage = PageSize.TEN;
	const { data } = useGetWings(page, perPage);
	const tableData =
		data?.items.map((wing) => ({
			...wing,
			id: wing.wing_id,
		})) || [];

	const columns: Column<Wing>[] = [
		{ key: "wing_name", label: "Wing" },
		{ key: "total_apartments", label: "Apartments" },
		{
			key: "actions",
			label: "Actions",
			render: (row) => (
				<RowActionsMenu
					actions={[
						{
							label: "Edit",
							onClick: () => console.log("Edit wing:", row.wing_id),
						},
						{
							label: "Delete",
							variant: "danger",
							onClick: () => console.log("Delete wing:", row.wing_id),
						},
					]}
				/>
			),
		},
	];

	return (
		<DataTable
			columns={columns}
			data={tableData}
			searchable
			addButtonLabel="Add Wing"
			onAddClick={() => console.log("Open Add Wing Dialog")}
			page={page}
			pageSize={perPage}
			total={data?.total || 0}
			onPageChange={setPage}
		/>
	);
}
