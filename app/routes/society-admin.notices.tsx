import { IconTools } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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

const initialNotices = [
	{
		id: 1,
		title: "Annual General Meeting Notice",
		roles: ["Tenant", "Guard", "Owner", "Manager"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 2,
		title: "Building Maintenance Schedule",
		roles: ["Tenant", "Owner", "Guard", "Admin", "Manager"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 3,
		title: "New Security Measures Implementation",
		roles: ["Guard", "Tenant"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 4,
		title: "Festival Celebration Guidelines",
		roles: ["Tenant", "Manager", "Admin"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 5,
		title: "Green Initiative Program",
		roles: ["Tenant", "Owner"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 6,
		title: "Swimming Pool Maintenance Notice",
		roles: ["Owner", "Tenant", "Admin", "Manager", "Guard"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 7,
		title: "Parking Policy Update",
		roles: ["Owner", "Tenant"],
		date: "15 Sep 2025, 07:31 PM",
	},
	{
		id: 8,
		title: "Community Health Camp",
		roles: ["Guard", "Tenant", "Manager", "Admin"],
		date: "15 Sep 2025, 07:31 PM",
	},
];

const ALL_ROLES = ["Admin", "Manager", "Owner", "Tenant", "Guard"] as const;
type Role = (typeof ALL_ROLES)[number];

export default function NoticesPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [form, setForm] = useState<{
		title: string;
		description: string;
		roles: Role[];
	}>({ title: "", description: "", roles: [] });
	const [notices, setNotices] = useState(initialNotices);
	const [search, setSearch] = useState("");

	const handleRoleChange = (role: Role) => {
		setForm((f) =>
			f.roles.includes(role)
				? { ...f, roles: f.roles.filter((r) => r !== role) }
				: { ...f, roles: [...f.roles, role] },
		);
	};

	const handleAdd = () => {
		if (!form.title || form.roles.length === 0) return;
		setNotices((prev) => [
			{
				id: prev.length + 1,
				title: form.title,
				roles: form.roles,
				date: new Date().toLocaleString(),
			},
			...prev,
		]);
		setIsDialogOpen(false);
		setForm({ title: "", description: "", roles: [] });
	};

	const filteredNotices = notices.filter((n) =>
		n.title.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<h1 className="text-2xl font-semibold">Notice Board</h1>
				<div className="flex flex-1 gap-2 md:justify-end">
					<Input
						placeholder="Search notice by title"
						className="max-w-xs"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						variant="outline"
						style={{
							borderColor: "#1a5fd8",
							color: "#1a5fd8",
							cursor: "pointer",
						}}
					>
						Filters
					</Button>
					<Button
						variant="outline"
						style={{
							borderColor: "#1a5fd8",
							color: "#1a5fd8",
							cursor: "pointer",
						}}
					>
						Export
					</Button>
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
								Add
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Add Notice</DialogTitle>
								<DialogDescription>
									Enter details for the new notice.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<Input
									placeholder="e.g. New year celebrations at office."
									value={form.title}
									onChange={(e) =>
										setForm((f) => ({ ...f, title: e.target.value }))
									}
								/>
								<Textarea
									placeholder="Enter the notice description here..."
									value={form.description}
									onChange={(e) =>
										setForm((f) => ({ ...f, description: e.target.value }))
									}
								/>
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
							</div>
							<DialogFooter>
								<Button
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
									onClick={handleAdd}
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
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<Card className="bg-background border rounded-lg shadow">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="bg-muted">
								<th className="px-4 py-3 text-left font-semibold">TITLE</th>
								<th className="px-4 py-3 text-left font-semibold">ROLES</th>
								<th className="px-4 py-3 text-left font-semibold">
									DATE & TIME
								</th>
								<th className="px-4 py-3 text-left font-semibold">ACTION</th>
							</tr>
						</thead>
						<tbody>
							{filteredNotices.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="px-4 py-8 text-center text-muted-foreground"
									>
										No notices found.
									</td>
								</tr>
							) : (
								filteredNotices.map((notice) => (
									<tr key={notice.id} className="border-b last:border-b-0">
										<td className="px-4 py-3 font-medium">{notice.title}</td>
										<td className="px-4 py-3 space-x-2">
											{notice.roles.map((role) => (
												<Badge
													key={role}
													variant="secondary"
													className="bg-[#1a5fd8]/20 text-[#1a5fd8]"
												>
													{role}
												</Badge>
											))}
										</td>
										<td className="px-4 py-3">{notice.date}</td>
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
												<IconTools size={16} className="mr-1" />
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
