import {
	IconCalendar,
	IconDownload,
	IconEdit,
	IconFilter,
	IconPlus,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
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

export default function BookAmenityPage() {
	const initialBookings = [
		{
			id: 1,
			amenity: "Swimming Pool",
			user: "John Doe",
			date: "18 September 2025",
			time: "10:00 AM",
			slot: "40 min",
			persons: 2,
		},
		{
			id: 2,
			amenity: "Gym",
			user: "Owner",
			date: "18 September 2025",
			time: "08:00 AM",
			slot: "20 min",
			persons: 1,
		},
		{
			id: 3,
			amenity: "Tennis Court",
			user: "Owner",
			date: "18 September 2025",
			time: "11:00 AM",
			slot: "15 min",
			persons: 2,
		},
	];

	const amenityOptions = ["Swimming Pool", "Gym", "Tennis Court"];
	const timeSlots = [
		"08:00 AM",
		"08:20 AM",
		"09:20 AM",
		"10:00 AM",
		"10:40 AM",
		"11:20 AM",
		"12:00 PM",
		"12:40 PM",
		"01:20 PM",
		"02:00 PM",
		"02:40 PM",
		"03:20 PM",
		"04:00 PM",
		"04:40 PM",
		"05:20 PM",
		"06:00 PM",
		"06:40 PM",
		"07:20 PM",
	];
	const [search, setSearch] = useState("");
	const [bookings, setBookings] = useState(initialBookings);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [form, setForm] = useState({
		amenity: "",
		date: "18 September 2025",
		time: "",
		persons: 1,
	});
	const [calendarOpen, setCalendarOpen] = useState(false);

	const handleAddBooking = () => {
		setBookings([
			...bookings,
			{
				id: bookings.length + 1,
				amenity: form.amenity,
				user: "Owner",
				date: form.date,
				time: form.time,
				slot: "15 min",
				persons: Number(form.persons),
			},
		]);
		setIsDialogOpen(false);
		setForm({
			amenity: amenityOptions[0],
			date: "18 September 2025",
			time: "",
			persons: 1,
		});
	};

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Book Amenity</h1>
			<div className="flex items-center gap-4 mt-6">
				<Input
					placeholder="Search Amenity by amenity name and user name"
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
				<div className="flex items-center gap-2">
					<div className="flex items-center border rounded px-2 py-1">
						<IconCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>09/18/2025</span>
					</div>
					<span className="mx-2">To</span>
					<div className="flex items-center border rounded px-2 py-1">
						<IconCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>09/18/2025</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						className="border-[#1a5fd8] text-[#1a5fd8] hover:bg-[#1a5fd8]/10 cursor-pointer"
					>
						<IconX className="mr-2 h-4 w-4" /> RESET
					</Button>
				</div>
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
							className="bg-[#ffb400] hover:bg-[#ffb400]/80 cursor-pointer"
						>
							<IconPlus className="mr-2 h-4 w-4" /> Add
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[400px]">
						<DialogHeader>
							<DialogTitle>Add Book Amenity</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<label htmlFor="amenity" className="text-sm font-medium">
									Choose Amenity *
								</label>
								<Select
									value={form.amenity}
									onValueChange={(v) => setForm((f) => ({ ...f, amenity: v }))}
								>
									<SelectTrigger id="amenity">
										<SelectValue placeholder="Select Amenity" />
									</SelectTrigger>
									<SelectContent>
										{amenityOptions.map((opt) => (
											<SelectItem key={opt} value={opt}>
												{opt}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<label htmlFor="date" className="text-sm font-medium">
									Booking Date *
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
												selected={new Date(form.date)}
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
								<span className="text-sm font-medium">Booking Time *</span>
								<div className="grid grid-cols-4 gap-2">
									{timeSlots.map((slot) => (
										<Button
											key={slot}
											size="sm"
											variant="outline"
											className={`text-sm ${form.time === slot ? "bg-[#ffb400] text-white" : "bg-gray-50 text-gray-700"} ${form.time === slot ? "border-[#ffb400]" : "border-gray-300"} cursor-pointer`}
											onClick={() => setForm((f) => ({ ...f, time: slot }))}
										>
											{slot}
										</Button>
									))}
								</div>
							</div>
							<div className="grid gap-2">
								<div className="text-sm text-muted-foreground">
									Total persons allowed for this time slot : 2
								</div>
							</div>
							<div className="grid gap-2">
								<label htmlFor="persons" className="text-sm font-medium">
									Number of Persons *
								</label>
								<Input
									id="persons"
									type="number"
									min={1}
									value={form.persons}
									onChange={(e) =>
										setForm((f) => ({ ...f, persons: Number(e.target.value) }))
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								onClick={handleAddBooking}
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
							<th className="px-2 py-2">BOOKING ID</th>
							<th className="px-2 py-2">AMENITY NAME</th>
							<th className="px-2 py-2">BOOKED BY</th>
							<th className="px-2 py-2">BOOKING DATE</th>
							<th className="px-2 py-2">BOOKING TIME</th>
							<th className="px-2 py-2">SLOT TIME</th>
							<th className="px-2 py-2">NUMBER OF PERSONS</th>
							<th className="px-2 py-2">ACTION</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((b) => (
							<tr key={b.id} className="border-b">
								<td className="px-2 py-2">
									<input type="checkbox" />
								</td>
								<td className="px-2 py-2">{b.id}</td>
								<td className="px-2 py-2 font-semibold">{b.amenity}</td>
								<td className="px-2 py-2 font-semibold">{b.user}</td>
								<td className="px-2 py-2">{b.date}</td>
								<td className="px-2 py-2">
									<Badge className="bg-[#1a5fd8]/10 text-[#1a5fd8] px-2 py-1 text-xs font-semibold">
										{b.time}
									</Badge>
								</td>
								<td className="px-2 py-2">{b.slot}</td>
								<td className="px-2 py-2">{b.persons}</td>
								<td className="px-2 py-2">
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											className="border-[#1a5fd8] bg-[#1a5fd8] text-white hover:bg-[#1a5fd8]/80 cursor-pointer"
										>
											<IconEdit className="mr-2 h-4 w-4" /> UPDATE
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
										>
											<IconTrash className="h-4 w-4" />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
