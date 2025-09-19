import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

const initialRows = [
	{ year: "2024", month: "November", cost: "$3,200.00", status: "Draft" },
	{ year: "2024", month: "September", cost: "$7,800.00", status: "Draft" },
	{ year: "2024", month: "December", cost: "$6,400.00", status: "Draft" },
	{ year: "2024", month: "April", cost: "$2,400.00", status: "Published" },
	{ year: "2024", month: "July", cost: "$2,800.00", status: "Published" },
];

export default function MaintenancePage() {
	const [search, setSearch] = useState("");
	const [rows, _setRows] = useState(initialRows);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [form, setForm] = useState({ month: "", year: "", dueDate: "" });

	const filteredRows = rows.filter((row) => {
		return (
			!search ||
			row.year.includes(search) ||
			row.month.toLowerCase().includes(search.toLowerCase()) ||
			row.status.toLowerCase().includes(search.toLowerCase())
		);
	});

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4 text-primary">Maintenance</h1>
			<div className="flex gap-2 mb-4 items-center">
				<Input
					placeholder="Search Maintenance by Year, Month and Status"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="max-w-sm border-primary focus:border-primary bg-background text-foreground"
				/>
				<Button
					variant="outline"
					className="flex items-center gap-2 border-primary text-primary font-semibold"
				>
					{/* Icon */}
					<span>FILTERS</span>
				</Button>
				<Button
					variant="outline"
					className="ml-auto border-yellow-500 text-yellow-500 font-semibold"
				>
					Export
				</Button>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-yellow-500 text-white hover:bg-yellow-600 font-semibold px-6">
							Add
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-md bg-background text-foreground">
						<div className="p-4">
							<h2 className="text-lg font-semibold mb-4">Add Maintenance</h2>
							<div className="space-y-4">
								<div>
									<label
										htmlFor="month"
										className="block text-sm font-medium text-foreground mb-1"
									>
										Month <span className="text-red-500">*</span>
									</label>
									<Select
										value={form.month}
										onValueChange={(v) => setForm((f) => ({ ...f, month: v }))}
									>
										<SelectTrigger id="month" className="w-full">
											<SelectValue placeholder="Select Month" />
										</SelectTrigger>
										<SelectContent>
											{[
												"January",
												"February",
												"March",
												"April",
												"May",
												"June",
												"July",
												"August",
												"September",
												"October",
												"November",
												"December",
											].map((m) => (
												<SelectItem key={m} value={m}>
													{m}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div>
									<label
										htmlFor="year"
										className="block text-sm font-medium text-foreground mb-1"
									>
										Year <span className="text-red-500">*</span>
									</label>
									<Select
										value={form.year}
										onValueChange={(v) => setForm((f) => ({ ...f, year: v }))}
									>
										<SelectTrigger id="year" className="w-full">
											<SelectValue placeholder="Select Year" />
										</SelectTrigger>
										<SelectContent>
											{["2022", "2023", "2024", "2025", "2026"].map((y) => (
												<SelectItem key={y} value={y}>
													{y}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div>
									<label
										htmlFor="dueDate"
										className="block text-sm font-medium text-foreground mb-1"
									>
										Payment Due Date <span className="text-red-500">*</span>
									</label>
									<Input
										id="dueDate"
										placeholder="Payment Due Date"
										value={form.dueDate}
										onChange={(e) =>
											setForm((f) => ({ ...f, dueDate: e.target.value }))
										}
										className="w-full"
									/>
								</div>
								<div>
									<Button variant="outline" className="w-full">
										ADD ADDITIONAL COST
									</Button>
								</div>
								<div className="flex gap-2 mt-4">
									<Button className="bg-[#e51b3e] text-white font-semibold hover:bg-[#c21836] w-full">
										Save As Draft
									</Button>
									<Button className="bg-[#e51b3e] text-white font-semibold hover:bg-[#c21836] w-full">
										Save As Publish
									</Button>
									<Button variant="outline" className="w-full">
										Cancel
									</Button>
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div className="bg-background rounded shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">
								<input type="checkbox" className="rounded" />
							</TableHead>
							<TableHead className="text-primary">YEAR</TableHead>
							<TableHead className="text-primary">MONTH</TableHead>
							<TableHead className="text-primary">
								TOTAL ADDITIONAL COST
							</TableHead>
							<TableHead className="text-primary">STATUS</TableHead>
							<TableHead className="text-primary">ACTION</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredRows.map((row, idx) => (
							<TableRow key={idx}>
								<TableCell>
									<input type="checkbox" className="rounded" />
								</TableCell>
								<TableCell className="font-semibold text-foreground">
									{row.year}
								</TableCell>
								<TableCell className="font-semibold text-foreground">
									{row.month}
								</TableCell>
								<TableCell className="font-semibold text-foreground">
									{row.cost}
								</TableCell>
								<TableCell>
									{row.status === "Published" ? (
										<span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold dark:bg-primary/20">
											Published
										</span>
									) : (
										<span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold dark:bg-yellow-900 dark:text-yellow-300">
											Draft
										</span>
									)}
								</TableCell>
								<TableCell>
									<Select>
										<SelectTrigger className="w-28 border-primary text-primary">
											<SelectValue placeholder="ACTION" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="edit" className="text-primary">
												Edit
											</SelectItem>
											<SelectItem value="delete" className="text-primary">
												Delete
											</SelectItem>
										</SelectContent>
									</Select>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
