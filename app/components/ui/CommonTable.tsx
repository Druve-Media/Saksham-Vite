"use client";

import { ChevronLeft, ChevronRight } from "lucide-react"; // ✅ better arrows
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// ✅ Strongly typed column accessor
type Column<T> = {
	header: string;
	accessor: Extract<keyof T, string>; // only string keys of T
	render?: (row: T) => React.ReactNode;
};

export type CommonTableProps<T> = {
	columns: Column<T>[];
	data: T[];

	// 🔍 Search
	enableSearch?: boolean;
	searchTerm?: string;
	onSearchChange?: (val: string) => void;

	// ⬇️ Filters
	dropdownOptions?: { label: string; value: string }[];
	dropdownValue?: string;
	onDropdownChange?: (val: string) => void;

	// ➕ Extra Actions
	actions?: React.ReactNode;

	// 📄 Pagination
	pagination?: {
		page: number;
		total: number;
		pageSize: number;
		onPageChange: (page: number) => void;
	};

	// ✅ Selection
	enableSelection?: boolean;
	selectedRows?: (string | number)[];
	onSelectRow?: (id: string | number, checked: boolean) => void;
	onSelectAll?: (checked: boolean) => void;

	// 🧭 Table Styling
	stickyHeader?: boolean;
};

// ✅ Ensure row has id
export function CommonTable<T extends { id?: string | number }>({
	columns,
	data,
	enableSearch = true,
	searchTerm,
	onSearchChange,
	dropdownOptions,
	dropdownValue,
	onDropdownChange,
	actions,
	pagination,
	enableSelection = false,
	selectedRows = [],
	onSelectRow,
	onSelectAll,
	stickyHeader = false,
}: CommonTableProps<T>) {
	const totalPages = useMemo(() => {
		if (!pagination) return 1;
		return Math.ceil(pagination.total / pagination.pageSize);
	}, [pagination]);

	const allSelected =
		enableSelection && data.length > 0 && selectedRows.length === data.length;

	return (
		<div className="flex flex-col gap-4">
			{/* 🔍 Search + Dropdown + Actions */}
			<div className="flex justify-between items-center">
				<div className="flex gap-3 items-center">
					{enableSearch && onSearchChange && (
						<Input
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
							className="w-96"
						/>
					)}

					{dropdownOptions && onDropdownChange && (
						<select
							value={dropdownValue}
							onChange={(e) => onDropdownChange(e.target.value)}
							className="border rounded p-2 text-sm"
						>
							{dropdownOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					)}
				</div>

				{/* ➕ Extra Actions */}
				<div className="flex gap-2">{actions}</div>
			</div>

			{/* 📝 Table */}
			<div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded-lg shadow-sm p-4">
				<Table className="min-w-[700px] border-collapse">
					<TableHeader
						className={`${
							stickyHeader ? "sticky top-0 bg-background z-10 shadow-sm" : ""
						}`}
					>
						<TableRow>
							{enableSelection && (
								<TableHead>
									<input
										type="checkbox"
										checked={allSelected}
										onChange={(e) => onSelectAll?.(e.target.checked)}
									/>
								</TableHead>
							)}
							{columns.map((col) => (
								<TableHead key={col.accessor}>{col.header}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length + (enableSelection ? 1 : 0)}
									className="text-center"
								>
									No data found
								</TableCell>
							</TableRow>
						) : (
							data.map((row, rowIndex) => (
								<TableRow
									key={row.id ?? rowIndex}
									className="hover:bg-muted transition-colors"
								>
									{enableSelection && (
										<TableCell>
											<input
												type="checkbox"
												checked={selectedRows.includes(row.id ?? rowIndex)}
												onChange={(e) =>
													onSelectRow?.(row.id ?? rowIndex, e.target.checked)
												}
											/>
										</TableCell>
									)}
									{columns.map((col) => (
										<TableCell key={col.accessor}>
											{col.render
												? col.render(row)
												: (row[col.accessor] as React.ReactNode)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* 📄 Pagination */}
			{pagination && (
				<div className="flex items-center justify-between mt-2">
					<p className="text-sm text-muted-foreground">
						Showing page {pagination.page} of {totalPages}
					</p>
					<div className="flex gap-2">
						<Button
							size="icon"
							variant="outline"
							disabled={pagination.page === 1}
							onClick={() => pagination.onPageChange(pagination.page - 1)}
							type="button"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="px-3 py-1 bg-blue-600 text-white rounded">
							{pagination.page}
						</span>
						<Button
							size="icon"
							variant="outline"
							disabled={pagination.page === totalPages}
							onClick={() => pagination.onPageChange(pagination.page + 1)}
							type="button"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
