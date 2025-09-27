import {
	IconBuilding,
	IconEdit,
	IconEye,
	IconTrash,
} from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { CommonTable } from "@/components/CommonTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddWingDialog } from "@/components/Wings/AddWingDialog";
import { useGetWings, type Wing } from "@/hooks/wings/useGetWings";

export default function WingsPage() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
	const [selectedWing, setSelectedWing] = useState<Wing | null>(null);
	const [page, setPage] = useState(1);
	const perPage = 10;
	const { data: wingsResponse = { items: [], total: 0 } } = useGetWings(
		page,
		perPage,
	);
	const data: Wing[] = wingsResponse?.items || [];
	const totalCount = wingsResponse?.total || 0;

	const handleAddClick = () => {
		setDialogMode("add");
		setSelectedWing(null);
		setIsAddDialogOpen(true);
	};

	const handleEditClick = (wing: Wing) => {
		setDialogMode("edit");
		setSelectedWing(wing);
		setIsAddDialogOpen(true);
	};

	const handleViewClick = (wing: Wing) => {
		console.log("View wing", wing.wing_id);
	};

	const handleDeleteClick = (wing: Wing) => {
		console.log("Delete wing", wing.wing_id);
	};

	const handleExport = () => {
		console.log("Exporting wings data...");
	};

	const columns: ColumnDef<Wing>[] = [
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
			accessorKey: "wing_name",
			header: "WING NAME",
			cell: ({ row }) => {
				const wingName = row.getValue("wing_name") as string;
				return (
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
							<IconBuilding className="h-5 w-5" style={{ color: "#1a5fd8" }} />
						</div>
						<div>
							<div className="font-medium">{wingName}</div>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: "floors",
			header: "FLOORS",
		},
		{
			accessorKey: "number_of_apartments",
			header: "APARTMENTS",
		},
		{
			accessorKey: "apartment_count",
			header: "TOTAL APARTMENTS",
		},
		{
			id: "actions",
			header: "ACTION",
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => handleViewClick(row.original)}>
							<IconEye className="mr-2 h-4 w-4" />
							View
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleEditClick(row.original)}>
							<IconEdit className="mr-2 h-4 w-4" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleDeleteClick(row.original)}
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

	return (
		<>
			<CommonTable<Wing, unknown>
				columns={columns}
				data={data}
				page={page}
				pageSize={perPage}
				total={totalCount}
				onPageChange={setPage}
				searchable={true}
				addButtonLabel="Add"
				onAddClick={handleAddClick}
				exportButtonLabel="Export"
				onExportClick={handleExport}
				searchPlaceholder="Search wing by name"
				checkbox={true}
			/>
			<AddWingDialog
				open={isAddDialogOpen}
				onOpenChange={setIsAddDialogOpen}
				mode={dialogMode}
				initialData={selectedWing || undefined}
			/>
		</>
	);
}
