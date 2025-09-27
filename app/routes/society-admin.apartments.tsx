import {
	IconEdit,
	IconEye,
	IconHome,
	IconSearch,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ApartmentDialog } from "@/components/apartment/ApartmentDialog";
import { CommonTable } from "@/components/CommonTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PageSize } from "@/enums/pagination/pagination";
import { useGetApartments } from "@/hooks/apartments/useGetApartments";
import { useGetWings } from "@/hooks/wings/useGetWings";

interface Apartment {
	flat_id: string;
	flat_no: string;
	floor: number;
	type: string;
	area_sqft: number;
	status: string;
	wing_name: string;
	society_name: string;
}

export default function ApartmentsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
	const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
		null,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [wingFilter, setWingFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	const { data: apartmentsQuery, isLoading } = useGetApartments();
	const allApartments: Apartment[] = apartmentsQuery?.items || [];
	const pageSize = PageSize.TEN;
	const { data: wingsQuery } = useGetWings(currentPage, pageSize);
	const wings = wingsQuery?.items || [];

	const uniqueTypes = [...new Set(allApartments.map((a) => a.type))].sort();

	if (isLoading) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				Loading apartments...
			</div>
		);
	}

	const filteredApartments = allApartments.filter((apartment) => {
		const matchesSearch =
			apartment.flat_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
			apartment.wing_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			apartment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
			apartment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
			apartment.floor
				.toString()
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || apartment.status === statusFilter;
		const matchesWing =
			wingFilter === "all" || apartment.wing_name === wingFilter;
		const matchesType = typeFilter === "all" || apartment.type === typeFilter;
		return matchesSearch && matchesStatus && matchesWing && matchesType;
	});

	const totalFiltered = filteredApartments.length;
	const currentData = filteredApartments.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize,
	);

	const columns: ColumnDef<Apartment>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={() => row.toggleSelected()}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "flat_no",
			header: "APARTMENT",
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded bg-[#1a5fd8]/10">
						<IconHome className="h-4 w-4 text-[#1a5fd8]" />
					</div>
					<span className="font-medium">{row.getValue("flat_no")}</span>
				</div>
			),
		},
		{
			accessorKey: "wing_name",
			header: "WING",
		},
		{
			accessorKey: "floor",
			header: "FLOOR",
		},
		{
			accessorKey: "type",
			header: "TYPE",
		},
		{
			accessorKey: "area_sqft",
			header: "AREA",
		},
		{
			accessorKey: "status",
			header: "STATUS",
			cell: ({ row }) => {
				const status = row.getValue("status") as string;
				return (
					<Badge
						variant="secondary"
						className={
							status === "Occupied"
								? "bg-[#1a5fd8]/20 text-[#1a5fd8]"
								: "bg-[#ffb400]/20 text-[#ffb400]"
						}
					>
						{status}
					</Badge>
				);
			},
		},
		{
			id: "actions",
			header: "ACTION",
			enableSorting: false,
			enableHiding: false,
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								console.log("View apartment:", row.original.flat_id)
							}
						>
							<IconEye className="mr-2 h-4 w-4" />
							View
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setDialogMode("edit");
								setSelectedApartment(row.original);
								setIsDialogOpen(true);
							}}
						>
							<IconEdit className="mr-2 h-4 w-4" />
							Edit
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() =>
								console.log("Delete apartment:", row.original.flat_id)
							}
							className="text-destructive focus:text-destructive"
						>
							<IconTrash className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	const handleAddClick = () => {
		setDialogMode("add");
		setSelectedApartment(null);
		setIsDialogOpen(true);
	};

	const handleExport = () => {
		console.log("Exporting apartments data...");
	};

	const filtersJSX = (
		<div className="flex w-full items-center gap-4">
			<div className="relative flex-1">
				<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search apartment by flat no, wing, or type"
					className="pl-10"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setCurrentPage(1);
					}}
				/>
			</div>
			<div className="flex items-center gap-4">
				<Select
					value={statusFilter}
					onValueChange={(value) => {
						setStatusFilter(value);
						setCurrentPage(1);
					}}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="Occupied">Occupied</SelectItem>
						<SelectItem value="Unsold">Unsold</SelectItem>
					</SelectContent>
				</Select>
				<Select
					value={wingFilter}
					onValueChange={(value) => {
						setWingFilter(value);
						setCurrentPage(1);
					}}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Wing" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{wings.map((wing) => (
							<SelectItem key={wing.wing_id} value={wing.wing_name}>
								{wing.wing_name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					value={typeFilter}
					onValueChange={(value) => {
						setTypeFilter(value);
						setCurrentPage(1);
					}}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{uniqueTypes.map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{(statusFilter !== "all" ||
					wingFilter !== "all" ||
					typeFilter !== "all" ||
					searchTerm !== "") && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setStatusFilter("all");
							setWingFilter("all");
							setTypeFilter("all");
							setSearchTerm("");
							setCurrentPage(1);
						}}
						className="bg-[#ffb400] text-white hover:bg-[#ffb400]/80"
						style={{ cursor: "pointer" }}
					>
						<IconX className="mr-2 h-4 w-4" />
						CLEAR
					</Button>
				)}
				<Button
					variant="outline"
					size="sm"
					style={{ cursor: "pointer" }}
					onClick={() => console.log("Hide filters")}
				>
					HIDE
				</Button>
			</div>
		</div>
	);

	return (
		<>
			<CommonTable
				columns={columns}
				data={currentData}
				page={currentPage}
				pageSize={pageSize}
				total={totalFiltered}
				onPageChange={setCurrentPage}
				searchable={false}
				addButtonLabel="Add"
				onAddClick={handleAddClick}
				exportButtonLabel="Export"
				onExportClick={handleExport}
				filters={filtersJSX}
				checkbox={true}
			/>
			<ApartmentDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				mode={dialogMode}
				initialData={selectedApartment}
			/>
		</>
	);
}
