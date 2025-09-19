import { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";

export default function VisitorsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// helpers for default date/time
	const getToday = () => {
		const d = new Date();
		return d.toISOString().slice(0, 10); // yyyy-mm-dd for input[type=date]
	};

	const getCurrentTime = () => {
		const d = new Date();
		const pad = (n: number) => n.toString().padStart(2, "0");
		return `${pad(d.getHours())}:${pad(d.getMinutes())}`; // HH:MM for input[type=time]
	};
	type FormState = {
		tower: string;
		floor: string;
		apartment: string;
		name: string;
		mobilePrefix: string;
		mobile: string;
		visitorType: string;
		purpose: string;
		address: string;
		dateOfVisit: string;
		inTime: string;
		dateOfExit: string;
		outTime: string;
	};
	const [form, setForm] = useState<FormState>({
		tower: "",
		floor: "",
		apartment: "",
		name: "",
		mobilePrefix: "+1",
		mobile: "",
		visitorType: "",
		purpose: "",
		address: "",
		dateOfVisit: getToday(),
		inTime: getCurrentTime(),
		dateOfExit: "",
		outTime: "",
	});
	const [rows] = useState([
		{
			name: "Alaina Morar",
			mobile: "+14327309752",
			apartment: "101",
			date: "18 September 2025",
			inTime: "02:53 AM",
			outTime: "04:53 AM",
			status: "pending",
		},
		{
			name: "Mr. Michel Klein",
			mobile: "414.642.9449",
			apartment: "102",
			date: "18 September 2025",
			inTime: "09:53 PM",
			outTime: "11:53 PM",
			status: "pending",
		},
		{
			name: "Derick Jakubowski",
			mobile: "+1.323.775.9031",
			apartment: "103",
			date: "18 September 2025",
			inTime: "07:55 PM",
			outTime: "08:55 PM",
			status: "pending",
		},
		{
			name: "Bethany Auer",
			mobile: "364-770-7682",
			apartment: "104",
			date: "18 September 2025",
			inTime: "06:25 AM",
			outTime: "07:25 AM",
			status: "pending",
		},
		{
			name: "Orpha Dibbert",
			mobile: "+18089037478",
			apartment: "103",
			date: "17 September 2025",
			inTime: "08:42 AM",
			outTime: "09:42 AM",
			status: "pending",
		},
	]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4 text-primary">Visitors</h1>
			<div className="flex gap-2 mb-4 items-center">
				<Input
					placeholder="Search visitor by name, apartment number"
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
					<DialogContent className="w-full mx-4 sm:mx-6 max-w-5xl max-h-[90vh] overflow-y-auto bg-background text-foreground rounded-lg">
						<form className="p-4 min-h-0">
							<h2 className="text-lg font-semibold mb-4">Add Visitor</h2>

							{/* Row: Tower + Floor + Apartment */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
								<div>
									<label
										htmlFor="tower"
										className="block text-sm font-medium mb-1"
									>
										Select Tower <span className="text-red-500">*</span>
									</label>
									<Select
										value={form.tower}
										onValueChange={(v: string) =>
											setForm((f: FormState) => ({ ...f, tower: v }))
										}
									>
										<SelectTrigger
											id="tower"
											className="w-full border-input rounded-lg bg-transparent px-3 py-2"
										>
											<SelectValue placeholder="Tower Name" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="A">Tower A</SelectItem>
											<SelectItem value="B">Tower B</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<label
										htmlFor="floor"
										className="block text-sm font-medium mb-1"
									>
										Select Floor <span className="text-red-500">*</span>
									</label>
									<Select
										value={form.floor}
										onValueChange={(v: string) =>
											setForm((f: FormState) => ({ ...f, floor: v }))
										}
									>
										<SelectTrigger
											id="floor"
											className="w-full border-input rounded-lg bg-transparent px-3 py-2"
										>
											<SelectValue placeholder="Select Floor" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">1</SelectItem>
											<SelectItem value="2">2</SelectItem>
											<SelectItem value="3">3</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<label
										htmlFor="apartment"
										className="block text-sm font-medium mb-1"
									>
										Apartment No. <span className="text-red-500">*</span>
									</label>
									<Select
										value={form.apartment}
										onValueChange={(v: string) =>
											setForm((f: FormState) => ({ ...f, apartment: v }))
										}
									>
										<SelectTrigger
											id="apartment"
											className="w-full border-input rounded-lg bg-transparent px-3 py-2"
										>
											<SelectValue placeholder="Select Apartment Number" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="101">101</SelectItem>
											<SelectItem value="102">102</SelectItem>
											<SelectItem value="103">103</SelectItem>
											<SelectItem value="104">104</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Visitor Name */}
							<div className="mt-4">
								<label
									htmlFor="visitorName"
									className="block text-sm font-medium mb-1"
								>
									Visitor Name <span className="text-red-500">*</span>
								</label>
								<Input
									id="visitorName"
									placeholder="Visitor Name"
									value={form.name}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setForm((f: FormState) => ({ ...f, name: e.target.value }))
									}
									className="w-full border-input rounded-lg bg-transparent px-3 py-2"
								/>
							</div>

							{/* Mobile + Visitor Type + Purpose row */}
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
								<div className="md:col-span-2">
									<label
										htmlFor="mobile"
										className="block text-sm font-medium mb-1"
									>
										Mobile Number
									</label>
									<div className="flex items-center gap-3">
										<Select
											value={form.mobilePrefix}
											onValueChange={(v: string) =>
												setForm((f: FormState) => ({ ...f, mobilePrefix: v }))
											}
										>
											<SelectTrigger
												id="mobilePrefix"
												className="w-20 border-input rounded-lg bg-transparent px-3 py-2"
											>
												<SelectValue placeholder="+1" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="+1">+1</SelectItem>
												<SelectItem value="+91">+91</SelectItem>
											</SelectContent>
										</Select>
										<Input
											id="mobile"
											placeholder="Mobile Number"
											value={form.mobile}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												setForm((f: FormState) => ({
													...f,
													mobile: e.target.value,
												}))
											}
											className="flex-1 border-input rounded-lg bg-transparent px-3 py-2"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="visitorType"
										className="block text-sm font-medium mb-1"
									>
										Visitor Type <span className="text-red-500">*</span>
									</label>
									<Select
										value={form.visitorType}
										onValueChange={(v: string) =>
											setForm((f: FormState) => ({ ...f, visitorType: v }))
										}
									>
										<SelectTrigger
											id="visitorType"
											className="w-full border-input rounded-lg bg-transparent px-3 py-2"
										>
											<SelectValue placeholder="Select Visitor Type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Guest">Guest</SelectItem>
											<SelectItem value="Delivery">Delivery</SelectItem>
											<SelectItem value="Staff">Staff</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Purpose full width row */}
							<div className="mt-3">
								<label
									htmlFor="purpose"
									className="block text-sm font-medium mb-1"
								>
									Purpose Of Visit
								</label>
								<Input
									id="purpose"
									placeholder="Purpose Of Visit"
									value={form.purpose}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setForm((f: FormState) => ({
											...f,
											purpose: e.target.value,
										}))
									}
									className="w-full border-input rounded-lg bg-transparent px-3 py-2"
								/>
							</div>

							{/* Address */}
							<div className="mt-4">
								<label
									htmlFor="address"
									className="block text-sm font-medium mb-1"
								>
									Visitor Address <span className="text-red-500">*</span>
								</label>
								<Textarea
									id="address"
									placeholder="Visitor Address"
									value={form.address}
									onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
										setForm((f: FormState) => ({
											...f,
											address: e.target.value,
										}))
									}
									className="w-full border-input rounded-lg bg-transparent px-3 py-2 min-h-[80px]"
								/>
							</div>

							{/* Date/time rows */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
								<div>
									<label
										htmlFor="dateOfVisit"
										className="block text-sm font-medium mb-1"
									>
										Date Of Visit <span className="text-red-500">*</span>
									</label>
									<Input
										id="dateOfVisit"
										type="date"
										value={form.dateOfVisit}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setForm((f: FormState) => ({
												...f,
												dateOfVisit: e.target.value,
											}))
										}
										className="w-full border-input rounded-lg bg-transparent px-3 py-2"
									/>
								</div>
								<div>
									<label
										htmlFor="inTime"
										className="block text-sm font-medium mb-1"
									>
										In Time <span className="text-red-500">*</span>
									</label>
									<Input
										id="inTime"
										type="time"
										value={form.inTime}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setForm((f: FormState) => ({
												...f,
												inTime: e.target.value,
											}))
										}
										className="w-full border-input rounded-lg bg-transparent px-3 py-2"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
								<div>
									<label
										htmlFor="dateOfExit"
										className="block text-sm font-medium mb-1"
									>
										Date Of Exit
									</label>
									<Input
										id="dateOfExit"
										type="date"
										value={form.dateOfExit}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setForm((f: FormState) => ({
												...f,
												dateOfExit: e.target.value,
											}))
										}
										className="w-full border-input rounded-lg bg-transparent px-3 py-2"
									/>
								</div>
								<div>
									<label
										htmlFor="outTime"
										className="block text-sm font-medium mb-1"
									>
										Out Time
									</label>
									<Input
										id="outTime"
										type="time"
										value={form.outTime}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setForm((f: FormState) => ({
												...f,
												outTime: e.target.value,
											}))
										}
										className="w-full border-input rounded-lg bg-transparent px-3 py-2"
									/>
								</div>
							</div>

							{/* Upload + actions */}
							<div className="mt-4">
								<Button
									variant="outline"
									className="px-3 py-2 border-input rounded-lg"
								>
									UPLOAD PHOTO
								</Button>
							</div>
							<div className="flex gap-2 mt-4 justify-end">
								<Button className="bg-yellow-500 text-black font-semibold hover:bg-yellow-600 rounded-lg px-6 py-2">
									Save
								</Button>
								<Button
									variant="outline"
									className="px-6 py-2 border border-input rounded-lg"
								>
									Cancel
								</Button>
							</div>
						</form>
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
							<TableHead className="text-primary">VISITOR NAME</TableHead>
							<TableHead className="text-primary">MOBILE NUMBER</TableHead>
							<TableHead className="text-primary">APARTMENT NUMBER</TableHead>
							<TableHead className="text-primary">DATE OF VISIT</TableHead>
							<TableHead className="text-primary">IN TIME</TableHead>
							<TableHead className="text-primary">OUT TIME</TableHead>
							<TableHead className="text-primary">STATUS</TableHead>
							<TableHead className="text-primary">ACTION</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row, idx) => (
							<TableRow key={idx}>
								<TableCell>
									<input type="checkbox" className="rounded" />
								</TableCell>
								<TableCell className="font-semibold text-foreground">
									{row.name}
								</TableCell>
								<TableCell className="text-foreground">{row.mobile}</TableCell>
								<TableCell className="text-foreground">
									{row.apartment}
								</TableCell>
								<TableCell className="text-foreground">{row.date}</TableCell>
								<TableCell className="text-foreground">{row.inTime}</TableCell>
								<TableCell className="text-foreground">{row.outTime}</TableCell>
								<TableCell>
									<Select value={row.status}>
										<SelectTrigger className="w-28 border-primary text-primary">
											<SelectValue placeholder="pending" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="pending" className="text-primary">
												pending
											</SelectItem>
											<SelectItem value="approved" className="text-primary">
												approved
											</SelectItem>
											<SelectItem value="rejected" className="text-primary">
												rejected
											</SelectItem>
										</SelectContent>
									</Select>
								</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											className="border-primary text-primary font-semibold"
										>
											UPDATE
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="border-[#e51b3e] text-[#e51b3e] font-semibold"
										>
											&#128465;
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
