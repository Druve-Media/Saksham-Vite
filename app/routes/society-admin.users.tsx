// import {
// 	IconDownload,
// 	IconEdit,
// 	IconFilter,
// 	IconPlus,
// 	IconSearch,
// 	IconX,
// } from "@tabler/icons-react";
// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";

// const users = [
// 	{
// 		id: 1,
// 		fullName: "John Doe",
// 		email: "admin@example.com",
// 		phone: "--",
// 		role: "You cannot change own role.",
// 		status: "Active",
// 		avatar: "/avatars/john-doe.jpg",
// 	},
// ];

// export default function UsersPage() {
// 	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [statusFilter, setStatusFilter] = useState("all");
// 	const [roleFilter, setRoleFilter] = useState("all");

// 	const [newUser, setNewUser] = useState({
// 		fullName: "",
// 		email: "",
// 		phone: "",
// 		wing: "",
// 		floor: "",
// 		apartment: "",
// 	});

// 	const handleAddUser = () => {
// 		console.log("Adding user:", newUser);
// 		setIsAddDialogOpen(false);
// 		setNewUser({
// 			fullName: "",
// 			email: "",
// 			phone: "",
// 			wing: "",
// 			floor: "",
// 			apartment: "",
// 		});
// 	};

// 	const handleExport = () => {
// 		console.log("Exporting users data...");
// 	};

// 	const filteredUsers = users.filter((user) => {
// 		const matchesSearch =
// 			user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			user.phone.includes(searchTerm);
// 		const matchesStatus =
// 			statusFilter === "all" || user.status.toLowerCase() === statusFilter;
// 		return matchesSearch && matchesStatus;
// 	});

// 	return (
// 		<div className="space-y-6">
// 			{/* Filters section */}
// 			<div className="bg-background border rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 items-center">
// 				<div className="flex-1 w-full">
// 					<div className="relative">
// 						<IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
// 						<Input
// 							placeholder="Search by name, email, or phone..."
// 							value={searchTerm}
// 							onChange={(e) => setSearchTerm(e.target.value)}
// 							className="pl-8"
// 						/>
// 					</div>
// 				</div>
// 				<div className="flex flex-wrap gap-2">
// 					<Select value={statusFilter} onValueChange={setStatusFilter}>
// 						<SelectTrigger className="w-32">
// 							<IconFilter className="h-4 w-4 mr-2" />
// 							<SelectValue placeholder="Status" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="all">All Status</SelectItem>
// 							<SelectItem value="active">Active</SelectItem>
// 							<SelectItem value="inactive">Inactive</SelectItem>
// 						</SelectContent>
// 					</Select>
// 					<Select value={roleFilter} onValueChange={setRoleFilter}>
// 						<SelectTrigger className="w-32">
// 							<IconFilter className="h-4 w-4 mr-2" />
// 							<SelectValue placeholder="Role" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="all">All Roles</SelectItem>
// 							<SelectItem value="admin">Admin</SelectItem>
// 							<SelectItem value="user">User</SelectItem>
// 							<SelectItem value="manager">Manager</SelectItem>
// 						</SelectContent>
// 					</Select>
// 					<Button
// 						onClick={handleExport}
// 						variant="outline"
// 						style={{ cursor: "pointer" }}
// 					>
// 						<IconDownload
// 							className="h-4 w-4 mr-2"
// 							style={{ color: "#1a5fd8" }}
// 						/>
// 						Export
// 					</Button>
// 					<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
// 						<DialogTrigger asChild>
// 							<Button
// 								style={{
// 									backgroundColor: "#ffb400",
// 									color: "#1a5fd8",
// 									border: "none",
// 									cursor: "pointer",
// 								}}
// 							>
// 								<IconPlus className="h-4 w-4 mr-2" />
// 								Add User
// 							</Button>
// 						</DialogTrigger>
// 						<DialogContent className="sm:max-w-md">
// 							<DialogHeader>
// 								<DialogTitle>Add New User</DialogTitle>
// 								<DialogDescription>
// 									Create a new user account for the society management system.
// 								</DialogDescription>
// 							</DialogHeader>
// 							<div className="grid gap-4 py-4">
// 								<div className="grid grid-cols-4 items-center gap-4">
// 									<Label htmlFor="fullName" className="text-right">
// 										Full Name
// 									</Label>
// 									<Input
// 										id="fullName"
// 										value={newUser.fullName}
// 										onChange={(e) =>
// 											setNewUser({ ...newUser, fullName: e.target.value })
// 										}
// 										className="col-span-3"
// 									/>
// 								</div>
// 								<div className="grid grid-cols-4 items-center gap-4">
// 									<Label htmlFor="email" className="text-right">
// 										Email
// 									</Label>
// 									<Input
// 										id="email"
// 										type="email"
// 										value={newUser.email}
// 										onChange={(e) =>
// 											setNewUser({ ...newUser, email: e.target.value })
// 										}
// 										className="col-span-3"
// 									/>
// 								</div>
// 								<div className="grid grid-cols-4 items-center gap-4">
// 									<Label htmlFor="phone" className="text-right">
// 										Phone
// 									</Label>
// 									<Input
// 										id="phone"
// 										value={newUser.phone}
// 										onChange={(e) =>
// 											setNewUser({ ...newUser, phone: e.target.value })
// 										}
// 										className="col-span-3"
// 									/>
// 								</div>
// 								<div className="grid grid-cols-4 items-center gap-4">
// 									<Label htmlFor="wing" className="text-right">
// 										Wing
// 									</Label>
// 									<Select
// 										onValueChange={(value) =>
// 											setNewUser({ ...newUser, wing: value })
// 										}
// 									>
// 										<SelectTrigger className="col-span-3">
// 											<SelectValue placeholder="Select wing" />
// 										</SelectTrigger>
// 										<SelectContent>
// 											<SelectItem value="a">Wing A</SelectItem>
// 											<SelectItem value="b">Wing B</SelectItem>
// 											<SelectItem value="c">Wing C</SelectItem>
// 										</SelectContent>
// 									</Select>
// 								</div>
// 								<div className="grid grid-cols-4 items-center gap-4">
// 									<Label htmlFor="floor" className="text-right">
// 										Floor
// 									</Label>
// 									<Input
// 										id="floor"
// 										value={newUser.floor}
// 										onChange={(e) =>
// 											setNewUser({ ...newUser, floor: e.target.value })
// 										}
// 										className="col-span-3"
// 									/>
// 								</div>
// 								<div className="grid grid-cols-4 items-center gap-4">
// 									<Label htmlFor="apartment" className="text-right">
// 										Apartment
// 									</Label>
// 									<Input
// 										id="apartment"
// 										value={newUser.apartment}
// 										onChange={(e) =>
// 											setNewUser({ ...newUser, apartment: e.target.value })
// 										}
// 										className="col-span-3"
// 									/>
// 								</div>
// 							</div>
// 							<DialogFooter>
// 								<Button
// 									type="button"
// 									variant="outline"
// 									onClick={() => setIsAddDialogOpen(false)}
// 									style={{ cursor: "pointer" }}
// 								>
// 									<IconX className="h-4 w-4 mr-2" />
// 									Cancel
// 								</Button>
// 								<Button
// 									type="submit"
// 									onClick={handleAddUser}
// 									style={{
// 										backgroundColor: "#ffb400",
// 										color: "#1a5fd8",
// 										border: "none",
// 										cursor: "pointer",
// 									}}
// 								>
// 									<IconPlus className="h-4 w-4 mr-2" />
// 									Add User
// 								</Button>
// 							</DialogFooter>
// 						</DialogContent>
// 					</Dialog>
// 				</div>
// 			</div>
// 			{/* Users table */}
// 			<Card className="bg-background border rounded-lg shadow">
// 				<CardContent className="p-0">
// 					<div className="overflow-x-auto">
// 						<Table>
// 							<TableHeader>
// 								<TableRow>
// 									<TableHead>Name</TableHead>
// 									<TableHead>Email</TableHead>
// 									<TableHead>Phone</TableHead>
// 									<TableHead>Role</TableHead>
// 									<TableHead>Status</TableHead>
// 									<TableHead>Actions</TableHead>
// 								</TableRow>
// 							</TableHeader>
// 							<TableBody>
// 								{filteredUsers.map((user) => (
// 									<TableRow key={user.id}>
// 										<TableCell>
// 											<div className="flex items-center gap-2">
// 												<Avatar className="h-8 w-8">
// 													<AvatarImage src={user.avatar} alt={user.fullName} />
// 													<AvatarFallback>
// 														{user.fullName
// 															.split(" ")
// 															.map((n) => n[0])
// 															.join("")}
// 													</AvatarFallback>
// 												</Avatar>
// 												<span className="font-medium text-foreground">
// 													{user.fullName}
// 												</span>
// 											</div>
// 										</TableCell>
// 										<TableCell>{user.email}</TableCell>
// 										<TableCell>{user.phone}</TableCell>
// 										<TableCell className="text-muted-foreground text-sm">
// 											{user.role}
// 										</TableCell>
// 										<TableCell>
// 											<Badge
// 												style={{
// 													backgroundColor:
// 														user.status === "Active" ? "#1a5fd8" : "#ffb400",
// 													color: user.status === "Active" ? "#fff" : "#1a5fd8",
// 												}}
// 											>
// 												{user.status}
// 											</Badge>
// 										</TableCell>
// 										<TableCell>
// 											<Button
// 												variant="outline"
// 												size="sm"
// 												style={{
// 													backgroundColor: "#1a5fd8",
// 													color: "#fff",
// 													border: "none",
// 													cursor: "pointer",
// 												}}
// 											>
// 												<IconEdit className="mr-2 h-4 w-4" />
// 												UPDATE
// 											</Button>
// 										</TableCell>
// 									</TableRow>
// 								))}
// 							</TableBody>
// 						</Table>
// 					</div>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	);
// }

import { useState } from "react";
import { type Column, DataTable } from "@/components/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserDialog } from "@/components/user/UserDialog";
import { RowActionsMenu } from "@/components/Wings/ActionMenu";
import { PageSize } from "@/enums/pagination/pagination";
import { useGetSocietyAdmins } from "@/hooks/society/useGetSocietyAdmins";

export default function UsersPage() {
	const [page, setPage] = useState(1);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
	const [selectedUser, setSelectedUser] = useState<
		UserFormValues | undefined
	>();

	const perPage = PageSize.TEN;

	const { data } = useGetSocietyAdmins();

	const tableData =
		data?.map((admin) => {
			const activeRole = admin.role.find((r) => r.is_active);
			return {
				id: admin.user.user_id,
				name: admin.user.name,
				email: admin.user.email,
				phone: admin.user.phone,
				role: activeRole?.role || "N/A",
				status: activeRole?.is_active ? "Active" : "Inactive",
			};
		}) || [];

	console.log(tableData, "tableeeee");
	const handleAddClick = () => {
		setDialogMode("add");
		setSelectedUser(undefined);
		setDialogOpen(true);
	};

	// Handle Edit
	const handleEditClick = (row: any) => {
		setDialogMode("edit");
		setSelectedUser(row);
		setDialogOpen(true);
	};

	// Handle Submit (for now just log or push into tableData)
	const handleSubmit = (user: UserFormValues) => {
		if (dialogMode === "add") {
			console.log("New User:", user);
		} else {
			console.log("Updated User:", user);
		}
	};

	const columns: Column<(typeof tableData)[0]>[] = [
		{
			key: "name",
			label: "Name",
			render: (row) => (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback>
							{row.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<span className="font-medium text-foreground">{row.name}</span>
				</div>
			),
		},
		{ key: "email", label: "Email" },
		{ key: "phone", label: "Phone" },
		{ key: "role", label: "Role" },
		{
			key: "status",
			label: "Status",
			render: (row) => (
				<Badge
					style={{
						backgroundColor: row.status === "Active" ? "#1a5fd8" : "#ffb400",
						color: row.status === "Active" ? "#fff" : "#1a5fd8",
					}}
				>
					{row.status}
				</Badge>
			),
		},
		{
			key: "actions",
			label: "Actions",
			render: (row) => (
				<RowActionsMenu
					actions={[
						{ label: "Edit", onClick: () => handleEditClick(row) },
						{
							label: "Delete",
							variant: "danger",
							onClick: () => console.log("Delete user:", row.id),
						},
					]}
				/>
			),
		},
	];

	return (
		<>
			<DataTable
				className="h-[600px]"
				columns={columns}
				data={tableData}
				page={page}
				pageSize={perPage}
				total={tableData.length}
				onPageChange={setPage}
				searchable
				addButtonLabel="Add User"
				onAddClick={handleAddClick}
				onExportClick={() => console.log("Export users")}
			/>
			<UserDialog
				open={dialogOpen}
				mode={dialogMode}
				initialData={selectedUser}
				onClose={() => setDialogOpen(false)}
				onSubmit={handleSubmit}
				apartments={[]}
			/>
		</>
	);
}
