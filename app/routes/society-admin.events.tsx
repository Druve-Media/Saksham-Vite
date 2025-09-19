import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ALL_ROLES = ["Admin", "Manager", "Owner", "Tenant", "Guard"] as const;
type Role = (typeof ALL_ROLES)[number];
const STATUS_OPTIONS = ["Status", "Completed", "Pending", "Cancelled"];

type EventEntry = {
	id: number;
	title: string;
	where: string;
	description: string;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
	status: string;
	roles: Role[];
};

const initialEvents: EventEntry[] = [
	{
		id: 1,
		title: "Ex iure maxime.",
		where: "506 Hauck Course West...",
		description: "Lorem ipsum dolor sit amet.",
		startDate: "2025-10-08",
		startTime: "14:28",
		endDate: "2025-10-08",
		endTime: "16:28",
		status: "Completed",
		roles: ["Admin", "Manager"],
	},
	{
		id: 2,
		title: "Ut magni voluptas.",
		where: "341 Rippin Knolls Le...",
		description: "Ut enim ad minim veniam.",
		startDate: "2025-09-25",
		startTime: "02:16",
		endDate: "2025-09-25",
		endTime: "04:16",
		status: "Pending",
		roles: ["Owner", "Tenant"],
	},
	{
		id: 3,
		title: "Debitis rerum quis qui.",
		where: "349 Mann Orchard Apt...",
		description: "Quis autem vel eum iure.",
		startDate: "2025-10-09",
		startTime: "14:33",
		endDate: "2025-10-09",
		endTime: "16:33",
		status: "Completed",
		roles: ["Guard"],
	},
	{
		id: 4,
		title: "Id rerum non error.",
		where: "5004 Beulah Lodge Ap...",
		description: "Sed ut perspiciatis unde.",
		startDate: "2025-10-07",
		startTime: "15:31",
		endDate: "2025-10-07",
		endTime: "17:31",
		status: "Completed",
		roles: ["Admin", "Owner"],
	},
	{
		id: 5,
		title: "Sit non aut.",
		where: "730 Jasmin Village E...",
		description: "Nemo enim ipsam voluptatem.",
		startDate: "2025-10-08",
		startTime: "21:26",
		endDate: "2025-10-08",
		endTime: "23:26",
		status: "Completed",
		roles: ["Tenant", "Manager"],
	},
];

export default function EventsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [form, setForm] = useState<{
		title: string;
		where: string;
		description: string;
		startDate: string;
		startTime: string;
		endDate: string;
		endTime: string;
		status: string;
		roleType: "Role" | "User";
		roles: Role[];
	}>({
		title: "",
		where: "",
		description: "",
		startDate: "",
		startTime: "",
		endDate: "",
		endTime: "",
		status: "Status",
		roleType: "Role",
		roles: [],
	});
	const [events, _setEvents] = useState(initialEvents);

	const handleRoleChange = (role: Role) => {
		setForm((f) =>
			f.roles.includes(role)
				? { ...f, roles: f.roles.filter((r) => r !== role) }
				: { ...f, roles: [...f.roles, role] },
		);
	};

	const handleAdd = () => {
		// Placeholder for add logic
		setIsDialogOpen(false);
		setForm({
			title: "",
			where: "",
			description: "",
			startDate: "",
			startTime: "",
			endDate: "",
			endTime: "",
			status: "Status",
			roleType: "Role",
			roles: [],
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Events</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							style={{
								backgroundColor: "#ffb400",
								color: "#1a5fd8",
								border: "none",
								cursor: "pointer",
							}}
						>
							Add Event
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-2xl">
						<DialogHeader>
							<DialogTitle>Add Event</DialogTitle>
							<DialogDescription>
								Enter details for the new event.
							</DialogDescription>
						</DialogHeader>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleAdd();
							}}
							className="space-y-4"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="event-title"
										className="block font-medium mb-1"
									>
										Event Name <span className="text-red-500">*</span>
									</label>
									<Input
										id="event-title"
										placeholder=""
										value={form.title}
										onChange={(e) =>
											setForm((f) => ({ ...f, title: e.target.value }))
										}
										required
									/>
								</div>
								<div>
									<label
										htmlFor="event-where"
										className="block font-medium mb-1"
									>
										Where <span className="text-red-500">*</span>
									</label>
									<Input
										id="event-where"
										placeholder=""
										value={form.where}
										onChange={(e) =>
											setForm((f) => ({ ...f, where: e.target.value }))
										}
										required
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="event-description"
									className="block font-medium mb-1"
								>
									Description <span className="text-red-500">*</span>
								</label>
								<Textarea
									id="event-description"
									placeholder="Enter the event description here..."
									value={form.description}
									onChange={(e) =>
										setForm((f) => ({ ...f, description: e.target.value }))
									}
									required
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="event-start-date"
											className="block font-medium mb-1"
										>
											Starts On Date <span className="text-red-500">*</span>
										</label>
										<Input
											id="event-start-date"
											type="date"
											value={form.startDate}
											onChange={(e) =>
												setForm((f) => ({ ...f, startDate: e.target.value }))
											}
											required
										/>
									</div>
									<div>
										<label
											htmlFor="event-start-time"
											className="block font-medium mb-1"
										>
											Starts On Time <span className="text-red-500">*</span>
										</label>
										<Input
											id="event-start-time"
											type="time"
											value={form.startTime}
											onChange={(e) =>
												setForm((f) => ({ ...f, startTime: e.target.value }))
											}
											required
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="event-end-date"
											className="block font-medium mb-1"
										>
											Ends On Date
										</label>
										<Input
											id="event-end-date"
											type="date"
											value={form.endDate}
											onChange={(e) =>
												setForm((f) => ({ ...f, endDate: e.target.value }))
											}
										/>
									</div>
									<div>
										<label
											htmlFor="event-end-time"
											className="block font-medium mb-1"
										>
											Ends On Time
										</label>
										<Input
											id="event-end-time"
											type="time"
											value={form.endTime}
											onChange={(e) =>
												setForm((f) => ({ ...f, endTime: e.target.value }))
											}
										/>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="event-status"
										className="block font-medium mb-1"
									>
										Status <span className="text-red-500">*</span>
									</label>
									<select
										id="event-status"
										className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a5fd8]"
										value={form.status}
										onChange={(e) =>
											setForm((f) => ({ ...f, status: e.target.value }))
										}
										required
									>
										{STATUS_OPTIONS.map((opt) => (
											<option key={opt} value={opt} disabled={opt === "Status"}>
												{opt}
											</option>
										))}
									</select>
								</div>
								<div>
									<div className="flex gap-4 mt-6">
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												checked={form.roleType === "Role"}
												onChange={() =>
													setForm((f) => ({ ...f, roleType: "Role" }))
												}
												className="accent-[#ffb400]"
											/>
											<span className="font-medium">Role</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												checked={form.roleType === "User"}
												onChange={() =>
													setForm((f) => ({ ...f, roleType: "User" }))
												}
												className="accent-[#ffb400]"
											/>
											<span className="font-medium">User</span>
										</label>
									</div>
								</div>
							</div>
							{form.roleType === "Role" && (
								<div>
									<div className="mb-1 font-medium">
										Role <span className="text-red-500">*</span>
									</div>
									<div className="grid grid-cols-2 gap-2">
										{ALL_ROLES.map((role) => (
											<label
												key={role}
												className="flex items-center gap-2 cursor-pointer select-none"
											>
												<input
													type="checkbox"
													checked={form.roles.includes(role)}
													onChange={() => handleRoleChange(role)}
													className="accent-[#1a5fd8] w-4 h-4"
												/>
												<span>{role}</span>
											</label>
										))}
									</div>
								</div>
							)}
							<DialogFooter className="mt-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
									style={{
										borderColor: "#1a5fd8",
										color: "#1a5fd8",
										cursor: "pointer",
									}}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									style={{
										backgroundColor: "#ffb400",
										color: "#1a5fd8",
										border: "none",
										cursor: "pointer",
									}}
								>
									Save
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<Card className="bg-background border rounded-lg shadow">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="bg-muted">
								<th className="px-4 py-3 text-left font-semibold">
									EVENT NAME
								</th>
								<th className="px-4 py-3 text-left font-semibold">WHERE</th>
								<th className="px-4 py-3 text-left font-semibold">
									START DATE & TIME
								</th>
								<th className="px-4 py-3 text-left font-semibold">
									END DATE & TIME
								</th>
								<th className="px-4 py-3 text-left font-semibold">STATUS</th>
								<th className="px-4 py-3 text-left font-semibold">ACTION</th>
							</tr>
						</thead>
						<tbody>
							{events.length === 0 ? (
								<tr>
									<td
										colSpan={6}
										className="px-4 py-8 text-center text-muted-foreground"
									>
										No events yet. Add a new event to get started.
									</td>
								</tr>
							) : (
								events.map((event) => (
									<tr key={event.id} className="border-b last:border-b-0">
										<td className="px-4 py-3 font-medium">{event.title}</td>
										<td className="px-4 py-3">{event.where}</td>
										<td className="px-4 py-3">
											{event.startDate
												? `${event.startDate}, ${event.startTime}`
												: ""}
										</td>
										<td className="px-4 py-3">
											{event.endDate
												? `${event.endDate}, ${event.endTime}`
												: ""}
										</td>
										<td className="px-4 py-3">
											<span
												className={
													event.status === "Completed"
														? "bg-[#1a5fd8]/20 text-[#1a5fd8] px-2 py-1 rounded text-xs font-semibold"
														: event.status === "Pending"
															? "bg-[#ffb400]/20 text-[#ffb400] px-2 py-1 rounded text-xs font-semibold"
															: "bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold"
												}
											>
												{event.status}
											</span>
										</td>
										<td className="px-4 py-3 flex gap-2">
											<Button
												size="sm"
												variant="outline"
												style={{
													backgroundColor: "#1a5fd8",
													color: "#fff",
													border: "none",
													cursor: "pointer",
												}}
											>
												Update
											</Button>
											<Button
												size="sm"
												style={{
													backgroundColor: "#ffb400",
													color: "#1a5fd8",
													border: "none",
													cursor: "pointer",
												}}
											>
												🗑
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
}
