import { IconDownload, IconFilter, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const initialBills = [
	{
		type: "Water Bill",
		date: "24 August 2025",
		amount: "₹189.98",
		status: "Unpaid",
		paymentDate: "--",
	},
	{
		type: "Water Bill",
		date: "12 September 2025",
		amount: "₹245.58",
		status: "Unpaid",
		paymentDate: "--",
	},
	{
		type: "Water Bill",
		date: "28 August 2025",
		amount: "₹245.80",
		status: "Unpaid",
		paymentDate: "--",
	},
	{
		type: "Water Bill",
		date: "10 September 2025",
		amount: "₹500.85",
		status: "Unpaid",
		paymentDate: "--",
	},
	{
		type: "Water Bill",
		date: "14 September 2025",
		amount: "₹110.30",
		status: "Unpaid",
		paymentDate: "--",
	},
];

const billTypeOptions = ["Water Bill", "Electricity Bill", "Gas Bill"];
const statusOptions = ["Unpaid", "Paid"];

export default function BillsPage() {
	const [search, setSearch] = useState("");
	const [bills, setBills] = useState(initialBills);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [form, setForm] = useState({
		type: "",
		amount: "",
		date: "",
		dueDate: "",
		status: "Unpaid",
	});
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [calendarDueOpen, setCalendarDueOpen] = useState(false);

	const handleAddBill = () => {
		setBills([
			...bills,
			{
				type: form.type,
				date: form.date,
				amount: `₹₹{form.amount}`,
				status: form.status,
				paymentDate: "--",
			},
		]);
		setIsDialogOpen(false);
		setForm({ type: "", amount: "", date: "", dueDate: "", status: "Unpaid" });
	};

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Bills</h1>
			<div className="flex items-center gap-4 mt-6">
				<Input
					placeholder="Search Bills by bill type"
					className="w-[320px]"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
				>
					<IconFilter className="mr-2 h-4 w-4" /> FILTERS
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
				>
					<IconDownload className="mr-2 h-4 w-4" /> Export
				</Button>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							size="sm"
							className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black cursor-pointer"
						>
							<IconPlus className="mr-2 h-4 w-4" /> Add
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[400px]">
						<DialogHeader>
							<DialogTitle>Add Bill</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<label htmlFor="type" className="text-sm font-medium">
									Bill Type *
								</label>
								<Select
									value={form.type}
									onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
								>
									<SelectTrigger id="type">
										<SelectValue placeholder="Select Bill Type" />
									</SelectTrigger>
									<SelectContent>
										{billTypeOptions.map((opt) => (
											<SelectItem key={opt} value={opt}>
												{opt}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<label htmlFor="amount" className="text-sm font-medium">
									Bill Amount *
								</label>
								<Input
									id="amount"
									type="number"
									min={0}
									value={form.amount}
									onChange={(e) =>
										setForm((f) => ({ ...f, amount: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="date" className="text-sm font-medium">
									Bill Date *
								</label>
								<div className="relative">
									<Input
										id="date"
										value={form.date}
										readOnly
										onClick={() => setCalendarOpen(true)}
									/>
									{calendarOpen && (
										<div className="absolute z-10 mt-2">
											<Calendar
												mode="single"
												selected={form.date ? new Date(form.date) : undefined}
												onSelect={(date) => {
													setForm((f) => ({
														...f,
														date: date
															? date.toLocaleDateString("en-GB", {
																	day: "2-digit",
																	month: "long",
																	year: "numeric",
																})
															: f.date,
													}));
													setCalendarOpen(false);
												}}
												initialFocus
											/>
										</div>
									)}
								</div>
							</div>
							<div className="grid gap-2">
								<label htmlFor="dueDate" className="text-sm font-medium">
									Bill Due Date *
								</label>
								<div className="relative">
									<Input
										id="dueDate"
										value={form.dueDate}
										readOnly
										onClick={() => setCalendarDueOpen(true)}
									/>
									{calendarDueOpen && (
										<div className="absolute z-10 mt-2">
											<Calendar
												mode="single"
												selected={
													form.dueDate ? new Date(form.dueDate) : undefined
												}
												onSelect={(date) => {
													setForm((f) => ({
														...f,
														dueDate: date
															? date.toLocaleDateString("en-GB", {
																	day: "2-digit",
																	month: "long",
																	year: "numeric",
																})
															: f.dueDate,
													}));
													setCalendarDueOpen(false);
												}}
												initialFocus
											/>
										</div>
									)}
								</div>
							</div>
							<div className="grid gap-2">
								<Button
									variant="outline"
									className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
								>
									UPLOAD BILL (OPTIONAL)
								</Button>
							</div>
							<div className="grid gap-2">
								<label htmlFor="status" className="text-sm font-medium">
									Status
								</label>
								<Select
									value={form.status}
									onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
								>
									<SelectTrigger id="status">
										<SelectValue placeholder="Unpaid" />
									</SelectTrigger>
									<SelectContent>
										{statusOptions.map((opt) => (
											<SelectItem key={opt} value={opt}>
												{opt}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<DialogFooter>
							<Button
								onClick={handleAddBill}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer text-white"
							>
								Save
							</Button>
							<Button
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
								className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
							>
								Cancel
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<div className="mt-6">
				<table className="w-full text-sm border rounded-lg overflow-hidden">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-2 py-2">
								<input type="checkbox" />
							</th>
							<th className="px-2 py-2">BILL TYPE</th>
							<th className="px-2 py-2">BILL DATE</th>
							<th className="px-2 py-2">BILL AMOUNT</th>
							<th className="px-2 py-2">STATUS</th>
							<th className="px-2 py-2">BILL PAYMENT DATE</th>
							<th className="px-2 py-2">ACTION</th>
						</tr>
					</thead>
					<tbody>
						{bills.map((b, idx) => (
							<tr key={idx} className="border-b">
								<td className="px-2 py-2">
									<input type="checkbox" />
								</td>
								<td className="px-2 py-2 font-semibold">{b.type}</td>
								<td className="px-2 py-2">{b.date}</td>
								<td className="px-2 py-2">{b.amount}</td>
								<td className="px-2 py-2">
									<Badge className="bg-red-100 text-red-600 px-2 py-1 text-xs font-semibold">
										{b.status}
									</Badge>
								</td>
								<td className="px-2 py-2">{b.paymentDate}</td>
								<td className="px-2 py-2">
									<Select>
										<SelectTrigger className="w-24">
											<SelectValue placeholder="ACTION" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="edit">Edit</SelectItem>
											<SelectItem value="delete">Delete</SelectItem>
										</SelectContent>
									</Select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
