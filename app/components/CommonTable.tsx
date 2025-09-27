"use client";

import { IconDownload, IconPlus, IconSearch } from "@tabler/icons-react";
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowUpDown,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface CommonTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
	searchable?: boolean;
	addButtonLabel?: string;
	onAddClick?: () => void;
	exportButtonLabel?: string;
	onExportClick?: () => void;
	filters?: React.ReactNode;
	topBarExtras?: React.ReactNode;
	checkbox?: boolean;
	className?: string;
	searchPlaceholder?: string;
}

export function CommonTable<TData, TValue>({
	columns,
	data,
	page,
	pageSize,
	total,
	onPageChange,
	searchable = true,
	addButtonLabel,
	onAddClick,
	exportButtonLabel = "Export",
	onExportClick,
	filters,
	topBarExtras,
	checkbox = true,
	className,
	searchPlaceholder = "Search...",
}: CommonTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [globalFilter, setGlobalFilter] = React.useState("");

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});

	const start = total > 0 ? (page - 1) * pageSize + 1 : 0;
	const end = Math.min(page * pageSize, total);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			{/* Top Bar: Search, Filters, Buttons */}
			<div className="flex items-center gap-4">
				{searchable && (
					<div className="relative flex-1">
						<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={searchPlaceholder}
							className="pl-10"
							value={globalFilter ?? ""}
							onChange={(event) => setGlobalFilter(event.target.value)}
						/>
					</div>
				)}
				{filters}
				{topBarExtras}
				{onExportClick && (
					<Button
						variant="outline"
						size="sm"
						onClick={onExportClick}
						style={{ cursor: "pointer" }}
					>
						<IconDownload
							className="mr-2 h-4 w-4"
							style={{ color: "#1a5fd8" }}
						/>
						{exportButtonLabel}
					</Button>
				)}
				{addButtonLabel && onAddClick && (
					<Button
						size="sm"
						onClick={onAddClick}
						style={{
							backgroundColor: "#ffb400",
							color: "#1a5fd8",
							border: "none",
							cursor: "pointer",
						}}
					>
						<IconPlus className="mr-2 h-4 w-4" />
						{addButtonLabel}
					</Button>
				)}
			</div>

			{/* Table */}
			<Card>
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[700px]">
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHead key={header.id} className="px-4">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id} className="px-4">
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="text-center py-6"
										>
											No records found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					{total > 0
						? `Showing ${start} to ${end} of ${total} records`
						: "No records to display"}
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled={page === 1}
						onClick={() => onPageChange(page - 1)}
						style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
					>
						<ChevronLeft className="h-4 w-4" />
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
						{page}
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={page * pageSize >= total}
						onClick={() => onPageChange(page + 1)}
						style={{
							cursor: page * pageSize >= total ? "not-allowed" : "pointer",
						}}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
