// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// export interface Column<T> {
//   key: keyof T | "actions";
//   label: string;
//   render?: (row: T) => React.ReactNode;
// }

// interface DataTableProps<T> {
//   columns: Column<T>[];
//   data: T[];
//   searchable?: boolean;
//   addButtonLabel?: string;
//   onAddClick?: () => void;
//   page: number;
//   pageSize: number;
//   total: number;
//   onPageChange?: (page: number) => void;
// }

// export function DataTable<T>({
//   columns,
//   data,
//   searchable,
//   addButtonLabel,
//   onAddClick,
//   page,
//   pageSize,
//   total,
//   onPageChange,
// }: DataTableProps<T>) {
//   return (
//     <div className="flex flex-col gap-4">
//       {/* Optional search + add button */}
//       <div className="flex items-center justify-between">
//         {searchable && <input placeholder="Search..." className="border p-2" />}
//         {addButtonLabel && onAddClick && (
//           <button
//             onClick={onAddClick}
//             className="px-3 py-1 rounded bg-blue-500 text-white"
//           >
//             {addButtonLabel}
//           </button>
//         )}
//       </div>

//       {/* Table */}
//       <table className="w-full border">
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={String(col.key)} className="border p-2 text-left">
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIdx) => (
//             <tr key={(row as any).id ?? rowIdx}>
//               {columns.map((col) => (
//                 <td key={String(col.key)} className="border p-2">
//                   {col.render ? col.render(row) : String((row as any)[col.key])}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       {/* <div className="flex justify-between items-center mt-2">
//         <p className="text-sm text-gray-500">
//           Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}{" "}
//           of {total}
//         </p>
//         <div className="flex gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => onPageChange(page - 1)}
//             className="px-2 py-1 border rounded disabled:opacity-50"
//           >
//             {"<"}
//           </button>
//           <span>{page}</span>
//           <button
//             disabled={page * pageSize >= total}
//             onClick={() => onPageChange(page + 1)}
//             className="px-2 py-1 border rounded disabled:opacity-50"
//           >
//             {">"}
//           </button>
//         </div>
//       </div> */}
//       <div className="flex justify-between items-center mt-2">
//         {/* Record info */}
//         <p className="text-sm text-gray-500">
//           {total > 0 ? (
//             <>
//               Showing {(page - 1) * pageSize + 1}–
//               {Math.min(page * pageSize, total)} of {total} records
//             </>
//           ) : (
//             "No records found"
//           )}
//         </p>

//         {/* Pagination controls */}
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={page === 1}
//             onClick={() => onPageChange?.(page - 1)}
//             className="flex items-center gap-1"
//           >
//             <ChevronLeft className="w-4 h-4" /> Prev
//           </Button>

//           <span className="text-sm font-medium">{page}</span>

//           <Button
//             variant="outline"
//             size="sm"
//             disabled={page * pageSize >= total}
//             onClick={() => onPageChange?.(page + 1)}
//             className="flex items-center gap-1"
//           >
//             Next <ChevronRight className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { IconDownload, IconPlus, IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
export type Column<T> = {
	key: keyof T | "actions";
	label: string;
	render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
	columns: Column<T>[];
	data: T[];
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
	onAddClick?: () => void;
	addButtonLabel?: string;
	onExportClick?: () => void;
	topBarExtras?: React.ReactNode; // 👈 to inject custom filters/buttons
	searchable?: boolean;
	onPageSizeChange?: (size: number) => void;
	className?: string;
};

export function DataTable<T extends { id?: string | number }>({
	columns,
	data,
	page,
	pageSize,
	total,
	onPageChange,
	onAddClick,
	addButtonLabel,
	onExportClick,
	topBarExtras,
	searchable,
	onPageSizeChange,
	className,
}: DataTableProps<T>) {
	const safePageSize = pageSize;
	const start = total > 0 ? (page - 1) * safePageSize + 1 : 0;
	const end = Math.min(page * safePageSize, total);
	return (
		<div className={cn("flex flex-1 flex-col gap-4 p-4 pt-0", className)}>
			<div className="flex items-center gap-4">
				{searchable && (
					<div className="w-[80%]">
						<div className="relative flex-1 w-1/2">
							<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search a user by name,email or phone number "
								className="pl-10"
							/>
						</div>
					</div>
				)}

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
						Export
					</Button>
				)}

				{onAddClick && addButtonLabel && (
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

			{/* 📋 Table */}
			<Card className="p-0">
				<CardContent className="p-0">
					<div className="overflow-x-auto w-full">
						<Table className="min-w-[700px]">
							<TableHeader>
								<TableRow>
									{columns.map((col) => (
										<TableHead key={String(col.key)} className="px-4">
											{col.label}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="text-center py-6"
										>
											No records found
										</TableCell>
									</TableRow>
								) : (
									data.map((row, idx) => (
										<TableRow key={(row.id as string) ?? idx}>
											{columns.map((col) => (
												<TableCell key={String(col.key)} className="px-4">
													{col.render
														? col.render(row)
														: (row[col.key as keyof T] as any)}
												</TableCell>
											))}
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* 📌 Pagination */}
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
						{page}
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={page * safePageSize >= total}
						onClick={() => onPageChange(page + 1)}
						style={{
							cursor: page * safePageSize >= total ? "not-allowed" : "pointer",
						}}
					>
						&gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
